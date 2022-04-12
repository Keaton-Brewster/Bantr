import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { GlobalStyles } from "./Theme/global";
import { lightTheme, darkTheme } from "./Theme/themes";

const themeContext = createContext();

export function useThemes() {
  return useContext(themeContext);
}

export default function ThemeProvider({ children }) {
  //STATE
  //================================================================================
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [themeName, setThemeName] = useState(theme);

  //VALUE
  //================================================================================
  const value = { theme, setThemeName };

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (themeName === "light") setTheme(lightTheme);
    else if (themeName === "dark") setTheme(darkTheme);

    return () => {
      setThemeName(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeName]);

  //COMPONENT
  //================================================================================
  return (
    <themeContext.Provider value={value}>
      <GlobalStyles theme={theme} />
      {children}
    </themeContext.Provider>
  );
}

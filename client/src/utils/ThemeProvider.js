import { createContext, useContext } from "react";
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

  //VALUE
  //================================================================================
  const value = { theme, setTheme };

  //COMPONENT
  //================================================================================
  return (
    <themeContext.Provider value={value}>
      <GlobalStyles theme={theme === "light" ? lightTheme : darkTheme} />
      {children}
    </themeContext.Provider>
  );
}

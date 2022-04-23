import { useEffect, createContext, useContext, useState } from "react";
import useLocalStorage from "../useLocalStorage";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "./global";

const themeContext = createContext();

export const useThemes = () => {
  return useContext(themeContext);
};

export default function _ThemeProvider({ children }) {
  //VARIABLES
  //================================================================================
  const lightTheme = {
    name: "light",
    body: "#fefffb",
    text: "#232425",
    topMenuBackground: "#6eaaff",
    gradient: "linear-gradient(#39598A, #79D7ED)",
    span: "#777 !important",
    LGActive: "#6eaaff",
    border: "#ddd",
    danger: "#b00400",
  };

  const darkTheme = {
    name: "dark",
    body: "#232425",
    text: "#fefffb",
    topMenuBackground: "#173e62",
    gradient: "linear-gradient(#091236, #1E215D)",
    span: "#b3b3b3 !important",
    LGActive: "#296eae",
    border: "#333",
    danger: "#b00400",
  };

  const [theme, setTheme] = useLocalStorage("theme", lightTheme);
  const [themeName, setThemeName] = useState(theme);

  //EFFECT
  //================================================================================
  useEffect(() => {
    if (themeName === "light") setTheme(lightTheme);
    if (themeName === "dark") setTheme(darkTheme);
    else return;
  }, [themeName, setTheme]);

  //COMPONENT
  //================================================================================
  return (
    <themeContext.Provider value={[theme, setThemeName]}>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  );
}

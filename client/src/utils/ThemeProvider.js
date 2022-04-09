import { createContext, useContext, useState, useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const themeContext = createContext();

export function useThemes() {
  return useContext(themeContext);
}

export default function ThemeProvider({ children }) {
  //STATE
  //================================================================================
  const [theme, setTheme] = useLocalStorage("theme", "light");

  //FUNCTIONS
  //================================================================================

  //EFFECTS
  //================================================================================
  useEffect(() => {
    const r = document.querySelector(":root");
    if (theme === "light") {
      r.style.setProperty("--main-background", "var(--light)");
      r.style.setProperty("--main-text-color", "var(--dark)");
    } else if (theme === "dark") {
      r.style.setProperty("--main-background", "var(--dark");
      r.style.setProperty("--main-text-color", "var(--light)");
    }
  }, [theme]);

  //VALUE
  //================================================================================
  const value = { theme, setTheme };

  //COMPONENT
  //================================================================================
  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
}

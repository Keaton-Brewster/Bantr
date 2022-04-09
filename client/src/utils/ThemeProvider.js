import { createContext, useContext } from "react";

const themeContext = createContext();

export function useThemeContext() {
  return useContext(themeContext);
}

export default function ThemeProvider({ children }) {
  //STATE
  //================================================================================

  //FUNCTIONS
  //================================================================================

  //VALUE
  //================================================================================
  const value = {};

  //COMPONENT
  //================================================================================
  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
}

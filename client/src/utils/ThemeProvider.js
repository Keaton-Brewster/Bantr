import { createContext, useContext } from "react";
import useLocalStorage from "./useLocalStorage";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "../utils/Theme/global";

const themeContext = createContext();

export const useThemes = () => {
  return useContext(themeContext);
};

export default function _ThemeProvider({ children }) {
  //STATE
  //================================================================================
  const [theme, setTheme] = useLocalStorage("theme", "light");

  //COMPONENT
  //================================================================================
  return (
    <themeContext.Provider value={[theme, setTheme]}>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} />
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  );
}

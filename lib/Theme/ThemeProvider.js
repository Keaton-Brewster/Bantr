import {
  useEffect,
  createContext,
  useContext,
  useState,
  useMemo,
  useRef,
} from "react";
import { Spinner } from "react-bootstrap";
import { ThemeProvider } from "styled-components";
import { useAppContext } from "../providers/AppProvider";

import GlobalStyles from "./global";

const themeContext = createContext();

export const useThemes = () => {
  return useContext(themeContext);
};

export default function _ThemeProvider({ children }) {
  const [loading, setLoading] = useState(true);
  //VARIABLES
  //================================================================================
  const lightTheme = useMemo(() => {
    return {
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
  }, []);

  const darkTheme = useMemo(() => {
    return {
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
  }, []);

  const { state, dispatch } = useAppContext();
  const theme_state = useRef();
  const [themeName, setThemeName] = useState(theme_state);

  //EFFECT
  //================================================================================
  useEffect(() => {
    if (themeName === "light")
      dispatch({ type: "set_theme_state", payload: lightTheme });
    if (themeName === "dark")
      dispatch({ type: "set_theme_state", payload: darkTheme });
    else return;
  }, [theme_state, dispatch, themeName, lightTheme, darkTheme]);

  // Need to wait for state to be called / loaded wihtin the AppProvider before trying to use its values
  useEffect(() => {
    if (!state) return;
    else {
      theme_state.current = state.theme_state;
      setLoading(false);
    }
  }, [state]);

  //COMPONENT
  //================================================================================
  return loading ? (
    <Spinner animation="border" />
  ) : (
    <themeContext.Provider value={[theme_state, setThemeName]}>
      <ThemeProvider theme={theme_state}>
        <GlobalStyles theme={theme_state} />
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  );
}

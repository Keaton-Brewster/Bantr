/* eslint-disable react-hooks/exhaustive-deps */
import {
  useReducer,
  createContext,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Reducer, initialState } from "../AppReducer";

const AppContext = createContext();

export default function AppProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const value = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    if (localStorage.getItem("state") !== undefined) {
      //checking if there already is a state in localstorage
      //if yes, update the current state with the stored one
      dispatch({
        type: "init_stored",
        payload: JSON.parse(localStorage.getItem("state")),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("state", JSON.stringify(state));
      //create and/or set a new localstorage variable called "state"
    }
  }, [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}

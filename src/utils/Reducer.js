import { useReducer } from "react";
import Menu from "../Comps/Menu";

export const initialState = () => {
  return {
    mainContent: <Menu />,
  };
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "INIT":
      return state;

    default:
      return state;
  }
};

export const useAppRendering = () => {
  return useReducer(reducer, initialState);
};

export default reducer;

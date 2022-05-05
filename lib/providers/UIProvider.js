/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, useContext, useRef } from "react";
import { isMobile } from "react-device-detect";
import { useViewport } from "./ViewportProvider";
import { useAppContext } from "./AppProvider";
import { initialState } from "../AppReducer";

import { Spinner } from "react-bootstrap";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export default function UIProvider({ children }) {
  //================================================================================
  //* STATE
  //================================================================================
  const { state, dispatch } = useAppContext();
  const { width, height } = useViewport();
  const content_state = useRef();
  const [loading, setLoading] = useState(true);

  // const setContentState = (value) => {
  //   return dispatch({ type: "set_content_state", payload: value });
  // };

  // I just had what I think might be the best way to handle contect state management.
  // USE LOCAL STORAGE YOU DUMMY. You need to be able to keep track of what is going on for the user, what converstaion theyre on,
  // what page theyre on, etc, and what better way to get around this than by using local storage.

  const [display, setDisplay] = useState(() => {
    if (isMobile) return { menu: true, mainContent: false };
    return { menu: true, mainContent: true };
  });

  const [activeContent, setActiveContent] = useState(
    content_state === initialState
      ? { conversations: true }
      : content_state.storedActiveContent
  );

  const [activeMenu, setActiveMenu] = useState(
    content_state === initialState
      ? { conversations: true }
      : content_state.storedActiveMenu
  );

  //================================================================================
  //* EFFECTS
  //================================================================================
  // This handles the changes between mobile layout and desktop layout
  useEffect(() => {
    const { menu, mainContent } = display;

    if (!isMobile && (!menu || !mainContent)) {
      return setDisplay({
        menu: true,
        mainContent: true,
      });
    }
    if (isMobile && menu && mainContent) {
      return setDisplay({
        menu: true,
        mainContent: false,
      });
    }
  }, [width, height]);

  // Need to wait for state to be called / loaded wihtin the AppProvider before trying to use its values
  useEffect(() => {
    if (!state) return;
    else {
      content_state.current = state.content_state;
      setLoading(false);
    }
  });

  // update the local storage with the current menu state and such
  useEffect(() => {
    dispatch({
      type: "set_content_state",
      payload: {
        storedActiveContent: activeContent,
        storedActiveMenu: activeMenu,
      },
    });
  }, [activeContent, activeMenu]);

  // if the user signs out, or is lost from local storage for any reason, reset
  // local storage value
  // useEffect(() => {
  //   if (user === 0) return setContentState("default");
  //   else return;
  // }, [user]);

  //================================================================================
  //* VALUE FOR PROVIDER
  //================================================================================
  const value = {
    activeContent,
    setActiveContent,
    activeMenu,
    setActiveMenu,
    display,
    setDisplay,
  };

  //================================================================================
  //* RENDER
  //================================================================================
  return loading ? (
    <Spinner animation="border" />
  ) : (
    <UIContext.Provider value={value}>{children}</UIContext.Provider>
  );
}

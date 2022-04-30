/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, useContext } from "react";
import { isMobile } from "react-device-detect";
import { useViewport } from "./ViewportProvider";
import useLocalStorage from "./useLocalStorage";
import { useConversations } from "./ConversationProvider";

const UIContext = createContext();

export function useUIContext() {
  return useContext(UIContext);
}

export default function UIProvider({ children }) {
  // STATE
  //================================================================================
  const { width, height } = useViewport();
  const [contentState, setContentState] = useLocalStorage(
    "content_state",
    "default"
  );

  // I just had what I think might be the best way to handle contect state management.
  // USE LOCAL STORAGE YOU DUMMY. You need to be able to keep track of what is going on for the user, what converstaion theyre on,
  // what page theyre on, etc, and what better way to get around this than by using local storage.

  const [display, setDisplay] = useState(() => {
    if (isMobile) return { menu: true, mainContent: false };
    return { menu: true, mainContent: true };
  });

  const [activeContent, setActiveContent] = useState(
    contentState === "default"
      ? { conversations: true }
      : contentState.storedActiveContent
  );

  const [activeMenu, setActiveMenu] = useState(
    contentState === "default"
      ? { conversations: true }
      : contentState.storedActiveMenu
  );

  // EFFECTS
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

  useEffect(() => {
    setContentState({
      storedActiveContent: activeContent,
      storedActiveMenu: activeMenu,
    });
  }, [activeContent, activeMenu]);

  // VALUE FOR PROVIDER
  //================================================================================
  const value = {
    activeContent,
    setActiveContent,
    activeMenu,
    setActiveMenu,
    display,
    setDisplay,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

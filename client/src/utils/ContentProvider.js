import { useEffect, useState, createContext, useContext } from "react";
import { isMobile } from "react-device-detect";
import { useViewport } from "./ViewportProvider";

const mainContentContext = createContext();

export function useContentContext() {
  return useContext(mainContentContext);
}

export default function ContentProvider({ children }) {
  const { width, height } = useViewport();
  const [display, setDisplay] = useState(() => {
    if (isMobile) return { menu: true, mainContent: false };
    return { menu: true, mainContent: true };
  });
  const [activeContent, setActiveContent] = useState({
    conversations: true,
  });
  const [activeMenu, setActiveMenu] = useState({
    conversations: true,
  });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const value = {
    activeContent,
    setActiveContent,
    activeMenu,
    setActiveMenu,
    display,
    setDisplay,
  };
  return (
    <mainContentContext.Provider value={value}>
      {children}
    </mainContentContext.Provider>
  );
}

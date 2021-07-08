import { useState, useEffect, createContext, useContext, useRef } from "react";

const viewportContext = createContext();

export function useViewport() {
  return useContext(viewportContext);
}

export default function ViewportProvider({ children }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [mobileDisplay, setMobileDisplay] = useState(() => {
    if (width < 680) return { menu: true, mainContent: false };
    return { menu: true, mainContent: true };
  });
  const isMobile = width < 680;
  const bottomOfMessages = useRef();

  // Setting up this function in the vieport provider
  // So that we can call it from other events
  function scrollToBottomMessages() {
    bottomOfMessages.current?.scrollIntoView();
  }

  // This is just the hook that sets width on window resize
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // This handles the changes between mobile layout and desktop layout
  useEffect(() => {
    const { menu, mainContent } = mobileDisplay;

    if (width >= 680 && (!menu || !mainContent)) {
      return setMobileDisplay({
        menu: true,
        mainContent: true,
      });
    }
    if (width < 680 && menu && mainContent) {
      return setMobileDisplay({
        menu: true,
        mainContent: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const value = {
    width,
    isMobile,
    mobileDisplay,
    setMobileDisplay,
    bottomOfMessages,
    scrollToBottomMessages,
  };

  return (
    <viewportContext.Provider value={value}>
      {children}
    </viewportContext.Provider>
  );
}

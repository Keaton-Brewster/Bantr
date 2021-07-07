import { useState, useEffect, createContext, useContext, useRef } from "react";

const viewportContext = createContext();

export function useViewport() {
  return useContext(viewportContext);
}

export default function ViewportProvider({ children }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(() => {
    if (width < 575) return { convos: true, mainContent: false };
    return { convos: true, mainContent: true };
  });
  const mobileScreen = width < 575;
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
    const { convos, mainContent } = show;

    if (width >= 575 && (!convos || !mainContent)) {
      return setShow({
        convos: true,
        mainContent: true,
      });
    }
    if (width < 575 && convos && mainContent) {
      return setShow({
        convos: true,
        mainContent: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  const value = {
    width,
    mobileScreen,
    show,
    setShow,
    bottomOfMessages,
    scrollToBottomMessages,
  };

  return (
    <viewportContext.Provider value={value}>
      {children}
    </viewportContext.Provider>
  );
}

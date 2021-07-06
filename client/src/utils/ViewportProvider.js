import { useState, useEffect, createContext, useContext, useRef } from "react";

const viewportContext = createContext();

export function useViewportContext() {
  return useContext(viewportContext);
}

export default function ViewportProvider({ children }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(() => {
    if (width < 575) return { convos: true, messages: false };
    return { convos: true, messages: true };
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
    const { convos, messages } = show;

    if (width >= 575 && (!convos || !messages)) {
      return setShow({
        convos: true,
        messages: true,
      });
    }
    if (width < 575 && convos && messages) {
      return setShow({
        convos: true,
        messages: false,
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

import { useState, useEffect, createContext, useContext, useRef } from "react";
import { isMobile } from "react-device-detect";

const viewportContext = createContext();

export function useViewport() {
  return useContext(viewportContext);
}

export default function ViewportProvider({ children }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const bottomOfMessages = useRef();

  // Setting up this function in the vieport provider
  // So that we can call it from other events
  function scrollToBottomMessages() {
    bottomOfMessages.current?.scrollIntoView();
  }

  // This is just the hook that sets width on window resize
  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const value = {
    width,
    height,
    isMobile,
    bottomOfMessages,
    scrollToBottomMessages,
  };

  return (
    <viewportContext.Provider value={value}>
      {children}
    </viewportContext.Provider>
  );
}

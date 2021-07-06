import { useState, useEffect, createContext, useContext } from "react";

const viewportContext = createContext();

export function useViewportContext() {
  return useContext(viewportContext);
}

export default function ViewportProvider({ children }) {
  const [width, setWidth] = useState(window.innerWidth);
  const [show, setShow] = useState({
    convos: true,
    messages: false,
  });
  const mobileScreen = width < 575;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if (width < 575) return;
    setShow({
      convos: true,
      messages: true,
    });
  }, [width]);

  const value = {
    width,
    mobileScreen,
    show,
    setShow,
  };

  return (
    <viewportContext.Provider value={value}>
      {children}
    </viewportContext.Provider>
  );
}

import { useState, useEffect } from "react";

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [mobile, setMobile] = useState(false);
  const [mobileView, setMobileView] = useState({
    conversations: true,
    messages: false,
  });

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  useEffect(() => {
    if (width <= 575 && !mobile) {
      setMobileView({ conversations: true, messages: false });
      setMobile(true);
      return;
    }
    setMobileView({ conversations: true, messages: true });
    setMobile(false);
  }, [width]);

  // Return the width so we can use it in our components
  return { mobile, mobileView, setMobileView };
};

export default useViewport;

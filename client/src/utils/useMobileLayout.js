import { useState, useEffect } from "react";
import useViewport from "./useViewport";

const useMobileLayout = () => {
  const width = useViewport();
  const [show, setShow] = useState({
    convos: true,
    messages: !(width < 575),
  });

  useEffect(() => {
    if (width < 575 && show.convos && show.messsages)
      setShow({
        convos: true,
        messages: false,
      });
  }, [width]);

  return [show, setShow];
};

export default useMobileLayout;

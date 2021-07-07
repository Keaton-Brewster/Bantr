import { useState, useRef } from "react";
import { useViewport } from "../../utils/ViewportProvider";
import Messaging from "./Messaging";
import ConversationInfoScreen from "./Messaging/ConversationInfoScreen";

export default function MainContent() {
  const [activeContent, setActiveContent] = useState("conversation");
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();

  const { show } = useViewport();

  function renderSwitch(activeContent) {
    switch (activeContent) {
      case "conversation info":
        return <ConversationInfoScreen containerRef={containerRef} />;
      case "messaging":
        return <Messaging containerRef={containerRef} />;
      default:
        return <Messaging containerRef={containerRef} />;
    }
  }

  return (
    <div className={show.mainContent ? "show" : "hide"} ref={containerRef}>
      {renderSwitch()}
    </div>
  );
}

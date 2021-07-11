import { useRef } from "react";
import { useContentContext } from "../../utils/ContentProvider";
import { useViewport } from "../../utils/ViewportProvider";
import Messaging from "./Messaging";
import ConversationInfoScreen from "./Messaging/ConversationInfoScreen";

export default function MainContent() {
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();
  const { mobileDisplay } = useViewport();
  const { activeContent } = useContentContext();

  function renderSwitch() {
    if (activeContent.messaging)
      return <Messaging containerRef={containerRef} />;
    if (activeContent.conversationInfo)
      return <ConversationInfoScreen containerRef={containerRef} />;
  }

  return (
    <div
      className={mobileDisplay.mainContent ? "show" : "hide"}
      ref={containerRef}
      style={{ overflow: "hidden !important" }}
    >
      {renderSwitch()}
    </div>
  );
}

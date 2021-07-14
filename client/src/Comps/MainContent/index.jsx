import { useRef } from "react";
import { useContentContext } from "../../utils/ContentProvider";
import Messaging from "./Messaging";
import ConversationInfoScreen from "./Messaging/ConversationInfoScreen";
import Contacts from "./Contacts";

export default function MainContent() {
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();
  const { display } = useContentContext();
  const { activeContent } = useContentContext();

  function renderSwitch() {
    if (activeContent.conversations)
      return <Messaging containerRef={containerRef} />;
    if (activeContent.conversationInfo)
      return <ConversationInfoScreen containerRef={containerRef} />;
    if (activeContent.contacts) return <Contacts />;
  }

  return (
    <div
      className={display.mainContent ? "show" : "hide"}
      ref={containerRef}
      style={{ overflow: "hidden !important" }}
    >
      {renderSwitch()}
    </div>
  );
}

import { useRef } from "react";
import { useUIContext } from "../../utils/UIProvider";
import Messaging from "./Messaging";
import ConversationInfoScreen from "./Messaging/ConversationInfoScreen";
import Contacts from "./Contacts";
import NoContent from "./NoContent";
import { useConversations } from "../../utils/ConversationProvider";

export default function MainContent() {
  const { selectedConversation } = useConversations();
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();
  const { display, activeContent } = useUIContext();


  function renderSwitch() {
    if (!selectedConversation) return <NoContent />;
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

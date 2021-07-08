import { useRef } from "react";
import { useViewport } from "../../utils/ViewportProvider";
import { useConversations } from "../../utils/ConversationProvider";
import { useMainContent } from "../../utils/MainContentProvider";
import MessagesTopMenu from "./Messaging/MessagesTopMenu";
import Messaging from "./Messaging";
import ConversationInfoScreen from "./Messaging/ConversationInfoScreen";

export default function MainContent() {
  const { activeContent } = useMainContent();
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();
  const { selectedConversation } = useConversations();
  const { mobileDisplay } = useViewport();

  function renderSwitch() {
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
    <div
      className={mobileDisplay.mainContent ? "show" : "hide"}
      ref={containerRef}
    >
      <MessagesTopMenu
        conversationName={selectedConversation.name}
        containerRef={containerRef}
      />
      {renderSwitch()}
    </div>
  );
}

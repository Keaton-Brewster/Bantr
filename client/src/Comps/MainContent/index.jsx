import { useState, useRef, createContext, useContext } from "react";
import { useViewport } from "../../utils/ViewportProvider";
import MessagesTopMenu from "./Messaging/MessagesTopMenu";
import Messaging from "./Messaging";
import ConversationInfoScreen from "./Messaging/ConversationInfoScreen";
import { useConversations } from "../../utils/ConversationProvider";

const mainContentContext = createContext();

export function useMainContent() {
  return useContext(mainContentContext);
}

export default function MainContent() {
  const [activeContent, setActiveContent] = useState("conversation");
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();
  const { selectedConversation } = useConversations();
  const { show } = useViewport();

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

  const value = { activeContent, setActiveContent };

  return (
    <mainContentContext.Provider value={value}>
      <MessagesTopMenu
        conversationName={selectedConversation.name}
        containerRef={containerRef}
      />
      <div className={show.mainContent ? "show" : "hide"} ref={containerRef}>
        {renderSwitch()}
      </div>
    </mainContentContext.Provider>
  );
}

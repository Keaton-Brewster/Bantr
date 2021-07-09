/* eslint-disable react/jsx-pascal-case */
import { useRef } from "react";
import { useViewport } from "../../utils/ViewportProvider";
import { useConversations } from "../../utils/ConversationProvider";
import { useContentContext } from "../../utils/ContentProvider";
import Animated from "react-mount-animation";
import MessagesTopMenu from "./Messaging/MessagesTopMenu";
import Messaging from "./Messaging";
import ConversationInfoScreen from "./Messaging/ConversationInfoScreen";

export default function MainContent() {
  const { activeContent } = useContentContext();
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();
  const { selectedConversation } = useConversations();
  const { mobileDisplay } = useViewport();

  const mountConvoInfo = ` 
  0% {opacity:0;}
  100% {opacity:1;}
  `;

  return (
    <div
      className={mobileDisplay.mainContent ? "show" : "hide"}
      ref={containerRef}
    >
      <MessagesTopMenu
        conversationName={selectedConversation.name}
        containerRef={containerRef}
      />

      <Messaging containerRef={containerRef} />
    </div>
  );
}

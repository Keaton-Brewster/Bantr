import { useRef } from "react";
import styled from "styled-components";
import { useUIContext } from "../../utils/UIProvider";
import { useConversations } from "../../utils/ConversationProvider";

import { Col } from "react-bootstrap";
import ConversationInfoScreen from "./Messaging/ConversationInfoScreen";
import NoContent from "./NoContent";
import Contacts from "./Contacts";
import Messaging from "./Messaging";

function MainContent({ className }) {
  // STATE
  //================================================================================
  const { selectedConversation } = useConversations();
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();
  const { display, activeContent } = useUIContext();

  // FUNCTIONS
  //================================================================================

  // RENDER
  //================================================================================
  return (
    <Col
      sm={8}
      className={`${display.mainContent ? "show" : "hide"} ${className}`}
      ref={containerRef}
      style={{ overflow: "hidden !important" }}
    >
      {!selectedConversation ? (
        <NoContent />
      ) : activeContent.conversations ? (
        <Messaging containerRef={containerRef} />
      ) : activeContent.conversationInfo ? (
        <ConversationInfoScreen containerRef={containerRef} />
      ) : activeContent.contacts ? (
        <Contacts containerRef={containerRef} />
      ) : (
        <NoContent />
      )}
    </Col>
  );
}

export default styled(MainContent)`
  border-left: 1px solid ${({ theme }) => theme.border};
  height: 100vh;
  padding: 0;
`;

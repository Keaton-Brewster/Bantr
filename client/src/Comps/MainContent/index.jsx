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
    if (activeContent.contacts) return <Contacts containerRef={containerRef} />;
  }

  return (
    <Col
      sm={8}
      className={`${display.mainContent ? "show" : "hide"} ${className}`}
      ref={containerRef}
      style={{ overflow: "hidden !important" }}
    >
      {renderSwitch()}
    </Col>
  );
}

export default styled(MainContent)`
  border-left: 1px solid ${({ theme }) => theme.border};
  height: 100vh;
  padding: 0;
`;

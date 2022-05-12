import React from "react";

import styled from "styled-components";

import { Nav } from "react-bootstrap";
import { useConversations } from "../../../../utils/providers/ConversationProvider";

function _ConversationName({ className, isMobile, activeContent }) {
  //STATE
  //================================================================================
  const { selectedConversation } = useConversations();

  //COMPONENT
  //================================================================================
  return (
    <Nav.Item
      className={className}
      id="conversationName"
      style={{
        paddingLeft: `${
          !isMobile && activeContent.conversations ? "30px" : ""
        }`,
      }}
    >
      {`${selectedConversation.members.length} people`}
    </Nav.Item>
  );
}

export default styled(_ConversationName)`
  background-color: ${({ theme }) => theme.topMenuBackground};
`;

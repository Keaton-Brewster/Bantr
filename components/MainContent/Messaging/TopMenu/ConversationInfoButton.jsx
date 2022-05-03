import React from "react";
import styled from "styled-components";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Nav } from "react-bootstrap";
// import "./conversationInfoButton.sass";

function _ConversationInfoButton({ className, onClick }) {
  return (
    <Nav.Item className={className} onClick={onClick}>
      <BsThreeDotsVertical id="conversationInfoButton" />
    </Nav.Item>
  );
}

export default styled(_ConversationInfoButton)`
  background-color: ${({ theme }) => theme.topMenuBackground};
`;

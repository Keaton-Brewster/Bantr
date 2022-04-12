import React from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import './backButton.sass'

function _BackButton({ className, onClick }) {
  return (
    <Nav.Item className={className} onClick={onClick}>
      <FaArrowLeft className="backButton" />
    </Nav.Item>
  );
}

const BackButton = styled(_BackButton)`
  background-color: ${({ theme }) => theme.topMenuBackground};
`;

export default BackButton;

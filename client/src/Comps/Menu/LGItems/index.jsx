import React from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

function _LGItem({ className, children, onClick }) {
  return (
    <ListGroup.Item className={className} onClick={onClick}>
      {children}
    </ListGroup.Item>
  );
}

const LGItem = styled(_LGItem)`
  transition: ${({ BGTransition }) =>
    BGTransition ? "background 0.5s ease" : "background 0s linear !important"};
`;

export default LGItem;

import React, { forwardRef } from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

const _LGItem = forwardRef(
  ({ className, children, onClick, contentEditable, onInput }, ref) => {
    return (
      <ListGroup.Item
        className={className}
        onClick={onClick}
      >
        {children}
      </ListGroup.Item>
    );
  }
);

export default styled(_LGItem)`
  transition: ${({ BGTransition }) =>
    BGTransition ? "background 0.5s ease" : "background 0s linear !important"};
  background-color: ${({ theme }) => theme.body};
`;

import React, { forwardRef } from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

const _LGItem = forwardRef(
  ({ className, children, onClick, contentEditable, onInput }, ref) => {
    return (
      <ListGroup.Item
        contentEditable={contentEditable}
        ref={ref}
        className={className}
        onClick={onClick}
        onInput={onInput}
      >
        {children}
      </ListGroup.Item>
    );
  }
);

const LGItem = styled(_LGItem)`
  transition: ${({ BGTransition }) =>
    BGTransition ? "background 0.5s ease" : "background 0s linear !important"};
  background-color: ${({ theme }) => theme.body};
`;

export default LGItem;

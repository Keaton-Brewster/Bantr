import React from "react";
import styled from "styled-components";

function LGItem({ className, children, onClick, style, index }) {
  return (
    <ul
      className={className}
      onClick={onClick}
      style={style ? style : {}}
      data-index={index}
    >
      {children}
    </ul>
  );
}

export default styled(LGItem)`
  transition: ${({ BGTransition }) =>
    BGTransition ? "background 0.5s ease" : "background 0s linear !important"};
  padding: 1rem;
  background-color: ${({ theme }) => theme.body};
  margin-bottom: 0px;
  :hover,
  :hover > #addButton {
    cursor: pointer;
  }
  > * {
    color: inherit;
    background: none;
  }
  > span {
    color: ${({ theme }) => theme.span};
  }
`;

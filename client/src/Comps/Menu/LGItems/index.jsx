import React from "react";
import styled from "styled-components";

function _LGItem({ className, children, onClick }) {
  return (
    <ul className={className} onClick={onClick}>
      {children}
    </ul>
  );
}

export default styled(_LGItem)`
  transition: ${({ BGTransition }) =>
    BGTransition ? "background 0.5s ease" : "background 0s linear !important"};
  padding: 1rem;
  :hover,
  :hover > #addButton {
    cursor: pointer;
  }
  > * {
    color: inherit;
    background-color: inherit;
    transition: inherit;
  }
  > span {
    color: ${({ theme }) => theme.span};
  }
  background-color: ${({ theme }) => theme.body};
  margin-bottom: 0px;
`;

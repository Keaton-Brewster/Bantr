import React from "react";
import styled from "styled-components";

const _SearchBox = React.forwardRef(({ className, handleInputChange }, ref) => {
  return (
    <div
      contentEditable
      onInput={handleInputChange}
      ref={ref}
      className={`${className} textarea`}
    />
  );
});

export default styled(_SearchBox)`   
  padding: 5px;
  padding-left: 20px;
  margin: 10px 0px;
  width: 100%;
  border-radius: 25px;
  border: 1px solid grey;
  overflow-wrap: break-word;
  resize: none;
  :focus {
      outline: none
      box-shadow: 0 0 4px 0px var(--light)
  };
  :empty::before {
  content: "Search";
  color: grey;
};
  :hover {
    cursor: auto
  }
`;

import React from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";

const SearchBox = React.forwardRef(({ className, handleInputChange }, ref) => {
  return (
    <Nav>
      <div
        contentEditable
        role="textbox"
        onInput={handleInputChange}
        ref={ref}
        className={`${className} textarea`}
      />
    </Nav>
  );
});

// This isn't really styled properly right now. I want the searchbox to hover
// Over the rest of the elements when you are searching, but its not right at all
export default styled(SearchBox)`   
  padding: 5px;
  padding-left: 20px;
  margin: 10px 0px;
  width: ${({ fixed }) => (fixed ? "32.3333%" : "100%")};
  border-radius: 25px;
  border: 1px solid ${({ theme }) => theme.border};
  overflow-wrap: break-word;
  resize: none;
  z-index: 20;
  position: ${({ fixed }) => (fixed ? "fixed" : "")};
  top: ${({ fixed }) => (fixed ? "top 0px" : "")}; 
  
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

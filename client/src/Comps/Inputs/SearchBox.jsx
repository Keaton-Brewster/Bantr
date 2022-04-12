import React from "react";
import styled from "styled-components";

const _SearchBox = React.forwardRef(({ className, onInput }, ref) => {
  return (
    <div
      contentEditable
      onInput={onInput}
      ref={ref}
      id="searchBox"
      className={`${className} textarea`}
    />
  );
});

export default styled(_SearchBox)``;

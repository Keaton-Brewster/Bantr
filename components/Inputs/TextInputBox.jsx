import React from 'react'
import styled from 'styled-components'

const _TextInputBox = React.forwardRef(
  ({ className, handleInputChange }, ref) => (
    <span
      className={`${className} textarea`}
      role="textbox"
      contentEditable
      onInput={handleInputChange}
      onBlur={handleInputChange}
      ref={ref}
    />
  )
)
_TextInputBox.displayName = 'TextInputBox'

export default styled(_TextInputBox)`
    padding: 5px;
    padding-left: 20px;
    margin-bottom: 10px;
    width: 100%;
    border-radius: 25px;
    border: 1px solid ${({ theme }) => theme.border};
    resize: none;
    &:focus {
        outline: none
        box-shadow: 0 0 4px 0px var(--light)
    };
    &:empty::before {
    content: "New Message";
    color: grey;
    };
    display: block;
    overflow: scroll;
    min-height: 40px;
    line-height: 20px;
    max-height: 40vh;
    `

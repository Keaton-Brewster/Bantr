import React from "react";
import styled from "styled-components";

import { AiFillPlusCircle } from "react-icons/ai";
import LGItem from "../LGItem";

function NewMessageBTN({ className, onClick }) {
  return (
    <LGItem className={`${className}`} onClick={onClick}>
      <AiFillPlusCircle id="addButton" />
      Start A New Message
    </LGItem>
  );
}

export default styled(NewMessageBTN)`
  border-bottom: solid 1px ${({ theme }) => theme.border};
  border-top: solid 1px ${({ theme }) => theme.border};
`;

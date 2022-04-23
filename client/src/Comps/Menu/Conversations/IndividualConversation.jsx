import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useUIContext } from "../../../utils/UIProvider";
import { useConversations } from "../../../utils/ConversationProvider";

import LGItem from "../LGItem";
import { useViewport } from "../../../utils/ViewportProvider";

function IndividualConversation({
  className,
  convo,
  index,
  targetIndex,
  offset,
}) {
  //STATE
  //================================================================================
  // providers
  const { setActiveContent, setDisplay } = useUIContext();
  const { isMobile } = useViewport();
  const { selectedConversation, selectConversationIndex } = useConversations();

  const [position, setPosition] = useState("0px");

  //FUNCTIONS
  //================================================================================
  function handleConversationSelection(event, index) {
    event.preventDefault();
    selectConversationIndex(index);
    if (isMobile) {
      setDisplay({
        menu: false,
        mainContent: true,
      });
    } else {
      setActiveContent({
        conversations: true,
      });
    }
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (targetIndex === index.toString()) setPosition(`${offset}px`);
    if (targetIndex !== index.toString()) setPosition("0px");
  }, [offset, targetIndex, index]);

  //RENDER
  //================================================================================
  return (
    <LGItem
      index={index}
      key={index}
      className={`${
        convo._id === selectedConversation._id && !isMobile ? "LGActive" : ""
      } ${className}`}
      onClick={(event) => handleConversationSelection(event, index)}
      style={{ right: position }}
    >
      {convo.name || "Untitled Conversation"}
      <br />
      {/* For some reason, I have to check for lenght here 
        Because when sending a new message, it takes a second for 
        the content to load, and if there is no content, the app 
        errors out and causes the message to not get sent */}
      <span>
        {convo.messages.length > 0
          ? convo.messages[convo.messages.length - 1].content.slice(0, 30) +
            "..."
          : ""}
      </span>
    </LGItem>

    // ! NOW I NEED TO FIGURE OUT HOW TO ADD A DELETE BUTTON BEHIND THIS THING
  );
}

export default styled(IndividualConversation)`
  position: relative;
  transition: all 0.5s ease !important;
`;

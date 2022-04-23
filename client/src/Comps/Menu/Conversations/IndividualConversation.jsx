import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useUIContext } from "../../../utils/UIProvider";
import { useConversations } from "../../../utils/ConversationProvider";

import LGItem from "../LGItem";
import { useViewport } from "../../../utils/ViewportProvider";
import DeleteConvoBtn from "./DeleteConvoBtn";

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

  function slideCloseOnclick(e) {
    const eTargetIndex = e.target.dataset.index;
    if (eTargetIndex !== index) setPosition("0px");
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (targetIndex === index) setPosition(`${offset}px`);
    if (targetIndex !== index) setPosition("0px");
  }, [offset, targetIndex, index]);

  // So that if you click elsewhere on the screen, the slide menu is closed
  useEffect(() => {
    document.body.addEventListener("click", slideCloseOnclick, false);

    return () => {
      document.body.removeEventListener("click", slideCloseOnclick, false);
    };
  });

  //RENDER
  //================================================================================
  return (
    <>
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
        <span data-index={index}>
          {convo.messages.length > 0
            ? convo.messages[convo.messages.length - 1].content.length > 28
              ? convo.messages[convo.messages.length - 1].content.slice(0, 30) +
                "..."
              : convo.messages[convo.messages.length - 1].content.slice(0, 30)
            : ""}
        </span>

        <DeleteConvoBtn />
      </LGItem>
    </>
  );
}

export default styled(IndividualConversation)`
  position: relative;
  transition: all 0.5s ease, color 0s linear, background 0s linear !important;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

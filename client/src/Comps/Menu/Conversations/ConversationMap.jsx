import React from "react";
import styled from "styled-components";
import { useUIContext } from "../../../utils/UIProvider";

import LGItem from "../LGItem";

function ConversationMap({
  className,
  conversations,
  selectedConversation,
  onClick,
}) {
  const { isMobile } = useUIContext();

  return (
    <div className={className}>
      {conversations.map((convo, index) => {
        return (
          <LGItem
            key={index}
            className={`${
              convo._id === selectedConversation._id && !isMobile
                ? "LGActive"
                : ""
            }`}
            onClick={(event) => onClick(event, index)}
          >
            {convo.name || "Untitled Conversation"}
            <br />
            <span>
              {convo.messages[convo.messages.length - 1].content.slice(0, 30) +
                "..." || ""}
            </span>
          </LGItem>
        );
      })}
    </div>
  );
}

export default styled(ConversationMap)``;

import React from "react";
import styled from "styled-components";
import { useConversations } from "../../../utils/providers/ConversationProvider";
import { useViewport } from "../../../utils/providers/ViewportProvider";

import LGItem from "../LGItem";

function SearchResultsMap({ className, results, onClick }) {
  const { selectedConversation } = useConversations();
  const { isMobile } = useViewport();

  return (
    <div className={className}>
      {results.length > 0 ? (
        results.map((result, index) => {
          return (
            <LGItem
              key={index}
              className={`${
                result.message._id === selectedConversation._id && !isMobile
                  ? "LGActive"
                  : ""
              }`}
              onClick={(event) => onClick(event, result.convoId)}
            >
              <>{result.message.content.slice(0, 30) + "..." || ""}</>
              <br />
              <span>{result.convoName || "Untitled Conversation"}</span>
            </LGItem>
          );
        })
      ) : (
        <LGItem>No Results</LGItem>
      )}
    </div>
  );
}

export default styled(SearchResultsMap)`
  margin-top: 4rem;
`;

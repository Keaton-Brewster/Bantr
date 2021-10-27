/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useCallback } from "react";
import { useConversations } from "../../../utils/ConversationProvider";
import { useViewport } from "../../../utils/ViewportProvider";
import ChatInput from "./ChatInput";
import SingleMessage from "./SingleMessage";
import MessageContextMenu from "./MessageContextMenu";
import ConversationInfoScreen from "./ConversationInfoScreen";
import { useContentContext } from "../../../utils/ContentProvider";
import MessagesTopMenu from "./MessagesTopMenu";
import "./messaging.sass";
import { Spinner } from "react-bootstrap";

export default function Messages({ containerRef }) {
  const [isLoading, setIsLoading] = useState(true);
  const { display, activeContent } = useContentContext();
  const { selectedConversation } = useConversations();
  const [contextMenuShow, setContextMenuShow] = useState(false);
  const { bottomOfMessages } = useViewport();

  // Handler function for message context menu
  function handleRightClick(event, element) {
    if (contextMenuShow) return;
    event.preventDefault();
    //? const messageIndex = element.getAttribute("data-key");
    setContextMenuShow(true);
  }

  // Handler function for clicking away from the message context menu
  const dismissContextMenu = useCallback(() => {
    if (!contextMenuShow) return;
    setContextMenuShow(false);
  }, [contextMenuShow]);
  // Hook to add the dismiss handler function
  useEffect(() => {
    document.addEventListener("click", dismissContextMenu);
    return () => {
      document.removeEventListener("click", dismissContextMenu);
    };
  }, [dismissContextMenu]);

  // When a new conversation is sleceted,
  // Scroll to the bottom right away
  useEffect(() => {
    if (isLoading) return;
    document.getElementById("messageWrapper").scrollTop = 1000000;
  }, [selectedConversation, display, isLoading]);

  // Loader effect
  useEffect(() => {
    if (!selectedConversation) return;
    setIsLoading(false);
  }, [selectedConversation]);

  return isLoading ? (
    <>
      <Spinner className="spinner" animation="border" />
    </>
  ) : (
    /*
?   Need to add a loading state for the message portion of this.
?   OR I need to figure out a way to reverse load messages. 
?   Reverse loading would be a better way in terms of UI/UX
?   Having a loader would certainly interupt the expected flow 
?   of a messaging app.
    */
    <>
      <MessagesTopMenu containerRef={containerRef} />
      <MessageContextMenu show={contextMenuShow} />

      <div id="messageWrapper">
        <div className="d-flex flex-column flex-grow-1" id="messages">
          <div className="flex-grow-1 overflow-auto">
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
              {selectedConversation.messages.map((message, i) => {
                return (
                  <SingleMessage
                    key={i}
                    index={i}
                    data={[message, selectedConversation.messages]}
                    handleRightClick={handleRightClick}
                  />
                );
              })}
              <div id="bottomOfMessages" ref={bottomOfMessages}></div>
            </div>
          </div>
        </div>

        {activeContent.conversations && (
          <ChatInput containerRef={containerRef} />
        )}
      </div>
    </>
  );
}

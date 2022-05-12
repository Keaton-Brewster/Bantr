/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useCallback } from "react";

import { Spinner } from "react-bootstrap";
import { useConversations } from "../../../utils/providers/ConversationProvider";
import { useViewport } from "../../../utils/providers/ViewportProvider";
import { useUIContext } from "../../../utils/providers/UIProvider";

import ChatInput from "../../Inputs/ChatInput";
import MessageContextMenu from "./MessageContextMenu";
import SingleMessage from "./SingleMessage";
import MessagesTopMenu from "./TopMenu/MessagesTopMenu";

import "./messaging.sass";

export default function Messages({ containerRef }) {
  //STATE
  //================================================================================
  const [isLoading, setIsLoading] = useState(true);
  const { display, activeContent } = useUIContext();
  const { selectedConversation } = useConversations();
  const [contextMenuShow, setContextMenuShow] = useState(false);
  const { bottomOfMessages } = useViewport();

  //FUNCTIONS
  //================================================================================
  function handleRightClick(event, element) {
    if (contextMenuShow) return;
    event.preventDefault();
    //? const messageIndex = element.getAttribute("data-key");
    setContextMenuShow(true);
  }

  const dismissContextMenu = useCallback(() => {
    if (!contextMenuShow) return;
    setContextMenuShow(false);
  }, [contextMenuShow]);

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (isLoading) return;
    document.getElementById("messageWrapper").scrollTop = 1000000;
  }, [selectedConversation, display, isLoading]);

  // Hook to add the dismiss handler function
  useEffect(() => {
    document.addEventListener("click", dismissContextMenu);
    return () => {
      document.removeEventListener("click", dismissContextMenu);
    };
  }, [dismissContextMenu]);

  // Loader effect
  useEffect(() => {
    if (!selectedConversation) return;
    setIsLoading(false);
  }, [selectedConversation]);

  //COMPONENT
  //================================================================================
  return isLoading ? (
    <Spinner className="absoluteCenter" animation="border" />
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

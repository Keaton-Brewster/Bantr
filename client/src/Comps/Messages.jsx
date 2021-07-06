import React, { useRef, useState, useEffect, useCallback } from "react";
import { Navbar } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useConversations } from "../utils/ConversationProvider";
import { useViewportContext } from "../utils/ViewportProvider";
import ChatInput from "./ChatInput";
import MessageContextMenu from "./MessageContextMenu";
import SingleMessage from "./SingleMessage";

export default function Messages() {
  const { sendMessage, selectedConversation } = useConversations();
  const [contextMenuShow, setContextMenuShow] = useState(false);
  const textRef = useRef();
  const containerRef = useRef();
  const {
    mobileScreen,
    show,
    setShow,
    bottomOfMessages,
    scrollToBottomMessages,
  } = useViewportContext();

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
  // Alternatively, if show is changed during mobile view
  // Also want to run scroll to bottom
  useEffect(() => {
    scrollToBottomMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation, show]);

  return (
    /*
?   Need to add a loading state for the message portion of this.
?   OR I need to figure out a way to reverse load messages. 
?   Reverse loading would be a better way in terms of UI/UX
?   Having a loader would certainly interupt the expected flow 
?   of a messaging app.
    */

    //This is only important for when you are viewing the Mobile app
    <div className={show.messages ? "show" : "hide"} ref={containerRef}>
      <MessageContextMenu show={contextMenuShow} />

      <div id="messageWrapper">
        {mobileScreen ? (
          <Navbar>
            <button
              id="backButton"
              onClick={() => {
                setShow({
                  convos: true,
                  messages: false,
                });
              }}
            >
              <FaArrowLeft className="bg-danger backButton" />
            </button>
          </Navbar>
        ) : null}

        <div className="d-flex flex-column flex-grow-1" id="messages">
          <div className="flex-grow-1 overflow-auto">
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
              {selectedConversation?.messages?.map((message, i) => {
                return (
                  <SingleMessage
                    key={i}
                    index={i}
                    data={[message, selectedConversation.messages]}
                    handleRightClick={handleRightClick}
                  />
                );
              })}
              <div ref={bottomOfMessages}></div>
            </div>
          </div>
        </div>

        <ChatInput
          textRef={textRef}
          sendMessage={sendMessage}
          containerRef={containerRef}
        />
      </div>
    </div>
  );
}

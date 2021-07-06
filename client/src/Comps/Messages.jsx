import React, { useRef, useState, useEffect, useCallback } from "react";
import { Navbar, Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useConversations } from "../utils/ConversationProvider";
import { useViewportContext } from "../utils/ViewportProvider";
import MessageContextMenu from "./MessageContextMenu";
import SingleMessage from "./SingleMessage";

export default function Messages() {
  const { sendMessage, selectedConversation } = useConversations();
  const [contextMenuShow, setContextMenuShow] = useState(false);
  const textRef = useRef();
  const { mobileScreen, show, setShow } = useViewportContext();

  const bottomRef = useRef();
  function scrollToBottom() {
    bottomRef.current?.scrollIntoView();
  }
  useEffect(() => {
    scrollToBottom();
  }, []);

  function handleRightClick(event, element) {
    if (contextMenuShow) return;
    event.preventDefault();
    // const messageIndex = element.getAttribute("data-key");
    setContextMenuShow(true);
  }

  const dismissContextMenu = useCallback(() => {
    if (!contextMenuShow) return;
    setContextMenuShow(false);
  }, [contextMenuShow]);

  useEffect(() => {
    document.addEventListener("click", dismissContextMenu);
    return () => {
      document.removeEventListener("click", dismissContextMenu);
    };
  }, [dismissContextMenu]);

  return (
    //This is only important for when you are viewing the Mobile app
    <div className={show ? "show" : "hide"}>
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
              <div ref={bottomRef}></div>
            </div>
          </div>
        </div>

        {/*  At some point in time it would be good to re visit this so that you can do CMD+Enter and have the message send. 
        Obviously this would only work for computers, but it would be a good basic function to have */}
        <div id="chatBox">
          <Row>
            <Col xs={10}>
              <textarea ref={textRef} rows="1" id="chatInput" type="text" />
            </Col>
            <Col xs={2}>
              <button
                id="sendButton"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToBottom();
                  sendMessage(textRef.current.value);
                  textRef.current.value = "";
                }}
              >
                <FaArrowRight className="bg-primary sendButton" />
              </button>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Navbar, Row, Col, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useConversations } from "../utils/ConversationProvider";
import { useViewportContext } from "../utils/ViewportProvider";
import MessageContextMenu from "./MessageContextMenu";
import SingleMessage from "./SingleMessage";

export default function Messages({ messages, show, setShow }) {
  const { sendMessage } = useConversations();
  const [contextMenuShow, setContextMenuShow] = useState(false);

  const bottomRef = useRef();
  function scrollToBottom() {
    bottomRef.current?.scrollIntoView();
  }
  useEffect(() => {
    scrollToBottom();
  }, []);

  const textRef = useRef();
  const { mobileScreen } = useViewportContext();

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
              {messages.length < 0 ? (
                <Spinner id="spinner" animation="border" />
              ) : (
                messages.map((message, i) => {
                  return (
                    <SingleMessage
                      key={i}
                      index={i}
                      data={[message, messages]}
                      handleRightClick={handleRightClick}
                    />
                  );
                })
              )}
              <div ref={bottomRef}></div>
            </div>
          </div>
        </div>
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

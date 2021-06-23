import { useRef, useEffect, useState, useCallback } from "react";
import { Navbar, Container, Row, Col, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useConversations } from "../utils/ConvorsationProvider";
import useViewport from "../utils/useViewport";
import MessageContextMenu from "./MessageContextMenu";

export default function Message({ sendMessage }) {
  const { messageState, userState, mobileViewState } = useConversations();
  const [messages, setMessages] = messageState;
  const [user, setUser] = userState;
  const [mobileView, setMobileView] = mobileViewState;
  const [contextMenu, setContextMenu] = useState({
    xPos: "0px",
    yPos: "0px",
    show: false,
  });

  const textRef = useRef();
  const { width } = useViewport();

  // //! I need to research useCallback.
  // //* I REALLY NEED TO JUST TRASH THIS WHOLE IDEA AND START FROM SCRATCH ON THE CONTEXT MENU IDEA
  // const handleRightClick = useCallback(
  //   (event, element) => {
  //     event.preventDefault();
  //     // const messageIndex = element.getAttribute("data-key");
  //     const xPos = `${event.pageX}px`;
  //     const yPos = `${event.pageY}px`;
  //     console.log(xPos, yPos);

  //     //! this does not work. I need a different way to handle the display state of the message context menu.
  //     //! Possibly with custom CSS or there may be another eventListener I need

  //     //! The problem is that I am setting state in an event listener,
  //     //! this causes the page to re render and so the event listener function gets lost.
  //     setContextMenu({
  //       xPos: xPos,
  //       yPos: yPos,
  //       show: true,
  //     });
  //     console.log(contextMenu);
  //   },
  //   [contextMenu]
  // );

  // //* Setting up the ability to delete messages via a custom context menu (from "right-click")
  // useEffect(() => {
  //   //? May want to set up a filter for which element you click on dismiss the menu,
  //   //? Cause obviously if you click on a setting in the context menu, you don't want the menu to disappear
  //   document.addEventListener("click", (event) => {
  //     setContextMenu({
  //       ...contextMenu,
  //       show: false,
  //     });
  //   });
  //   const messageElements = document.querySelectorAll(".message");
  //   messageElements.forEach((element) => {
  //     element.addEventListener("contextmenu", (event) => {
  //       handleRightClick(event, element);
  //     });
  //   });
  //   //* Need to remove the event listeners before re-rendering the page.
  //   //* Without doing this there will be errors
  //   return () => {
  //     messageElements.forEach((element) => {
  //       element.removeEventListener("contextmenu", handleRightClick);
  //     });
  //   };
  // }, [contextMenu, handleRightClick]);

  return (
    <>
      {contextMenu.show ? <MessageContextMenu position={contextMenu} /> : null}

      <div className={mobileView.messages ? "show" : "hide"}>
        {width <= 575 ? (
          <Navbar>
            <button
              id="backButton"
              onClick={(e) => {
                e.preventDefault();
                setMobileView({
                  conversations: true,
                  messages: false,
                });
              }}
            >
              <FaArrowLeft className="bg-danger" />
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
                    <div
                      key={i}
                      className={`my-1 d-flex flex-column ${
                        message.sender_id === user._id
                          ? "align-self-end align-items-end"
                          : "align-items-start"
                      }`}
                    >
                      <div
                        data-key={i}
                        className={`message rounded px-2 py-1 ${
                          message.sender_id === user._id
                            ? "bg-primary text-white"
                            : "border"
                        }`}
                      >
                        {message.content}
                      </div>
                      {
                        //? for some reason, this thing breaks when you tryi to select a new conversation? No idea why
                        /* <div
                    className={`text-muted small ${
                      message.sender_id === user._id ? "text-right" : ""
                    }`}
                  >
                    {message.sender_id === user._id &&
                    messages[i - 1].sender_id === user._id
                      ? "You"
                      : message.senderName}
                  </div> */
                      }
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <Container fluid id="chatBox">
          <Row>
            <Col xs={7}>
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
                <FaArrowRight className="bg-primary" />
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

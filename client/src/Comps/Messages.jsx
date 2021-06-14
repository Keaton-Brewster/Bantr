import { useRef, useEffect } from "react";
import { Navbar, Container, Row, Col, Spinner } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useConversations } from "../utils/ConvorsationProvider";
import useViewport from "../utils/useViewport";

export default function Message({ sendMessage }) {
  const { messageState, userState, mobileViewState } = useConversations();
  const [messages, setMessages] = messageState;
  const [user, setUser] = userState;
  const [mobileView, setMobileView] = mobileViewState;

  const textRef = useRef();
  const { width } = useViewport();

  // Setting up the ability to delete messages via a custom context menu (from "right-click")
  useEffect(() => {
    const messageElements = document.querySelectorAll(".message");
    messageElements.forEach((element) => {
      element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const messageIndex = element.getAttribute("data-key");
        const xPos = e.pageX + "px";
        const yPos = e.pageY + "px";
      });
    });
  }, []);

  return (
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
      <Container id="messages">
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
                  // for some reason, this thing breaks when you tryi to select a new conversation? No idea why
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
      </Container>
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
              }}
            >
              <FaArrowRight className="bg-primary" />
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

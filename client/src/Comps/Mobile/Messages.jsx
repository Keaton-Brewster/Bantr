import { useState } from "react";
import { Navbar, Container, Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useConversations } from "../../utils/ConvorsationProvider";

export default function Message({ sendMessage }) {
  const { messageState, userState, mobileViewState } = useConversations();
  const [messages, setMessages] = messageState;
  const [user, setUser] = userState;
  const [mobileView, setMobileView] = mobileViewState;
  const [text, setText] = useState();

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={mobileView.messages ? "show" : "hide"}>
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
      {messages.length === 1 ? (
        <div>
          <div
            className={`my-1 d-flex flex-column ${
              messages[0].sender_id === user._id
                ? "align-self-end align-items-end"
                : "align-items-start"
            }`}
          >
            <div
              className={`rounded px-2 py-1 ${
                messages[0].sender_id === user._id
                  ? "bg-primary text-white"
                  : "border"
              }`}
            >
              {messages[0].content}
            </div>
            <div
              className={`text-muted small ${
                messages[0].sender_id === user._id ? "text-right" : ""
              }`}
            >
              {messages[0].sender_id === user._id
                ? "You"
                : messages[0].senderName}
            </div>
          </div>
        </div>
      ) : (
        messages.map((message, i) => {
          return (
            <div key={i}>
              <div
                className={`my-1 d-flex flex-column ${
                  message.sender_id === user._id
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }`}
              >
                <div
                  className={`rounded px-2 py-1 ${
                    message.sender_id === user._id
                      ? "bg-primary text-white"
                      : "border"
                  }`}
                >
                  {message.content}
                </div>
                <div
                  className={`text-muted small ${
                    message.sender_id === user._id ? "text-right" : ""
                  }`}
                >
                  {message.sender_id === user._id &&
                  messages[i - 1].sender_id === user._id
                    ? "You"
                    : message.senderName}
                </div>
              </div>
            </div>
          );
        })
      )}
      <Container fluid id="chatBox">
        <Row>
          <Col xs={10}>
            <textarea rows="1" id="chatInput" type="text" />
          </Col>
          <Col xs={2}>
            <button id="sendButton" onClick={sendMessage}>
              <FaArrowRight className="bg-primary" />
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

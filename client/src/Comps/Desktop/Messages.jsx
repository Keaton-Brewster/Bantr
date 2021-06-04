import { useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { useConversations } from "../../utils/ConvorsationProvider";

export default function Message({ sendMessage }) {
  const { messageState, userState } = useConversations();
  const [messages, setMessages] = messageState;
  const [user, setUser] = userState;

  const textRef = useRef();

  return (
    <>
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
    </>
  );
}

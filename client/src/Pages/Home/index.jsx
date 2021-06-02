import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import API from "../../utils/API";
import "./home.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    _id: "User1",
  });

  useEffect(() => {
    API.init()
      .then(([convos, topMessages]) => {
        setConversations(convos);
        setMessages(topMessages);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  function selectConversation(e, convo_id) {
    e.preventDefault();
    API.getMessages(convo_id)
      .then((messages) => setMessages(messages))
      .catch((e) => console.error(e));
  }

  return (
    <>
      <Container fluid>
        <Row>
          {isLoading ? (
            <Spinner id="spinner" animation="border" />
          ) : (
            <>
              <Col sm={3}>
                <InputGroup className="mb-3">
                  <FormControl
                    id="userSearch"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    placeholder="search"
                  />
                </InputGroup>

                {conversations.map((convo, i) => {
                  return (
                    <div key={i}>
                      <Row
                        className="convoBox"
                        onClick={(e) => selectConversation(e, convo._id)}
                      >
                        {convo.name || "New Conversation"}
                      </Row>
                    </div>
                  );
                })}
              </Col>
              <Col sm={9}>
                {messages.map((message, i) => {
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
                        className={`rounded px-2 py-1 ${
                          message.sender_id === user._id
                            ? "bg-success text-white"
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
                  );
                })}
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
}

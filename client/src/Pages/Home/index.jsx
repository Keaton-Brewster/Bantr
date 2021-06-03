import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import API from "../../utils/API";
import { useConversations } from "../../utils/ConvorsationProvider";
import Message from "../../Comps/Message";
import "./home.css";

export default function Home() {
  const { loadingState, conversationState, messageState, userState } =
    useConversations();
  const [isLoading, setIsLoading] = loadingState;
  const [conversations, setConversations] = conversationState;
  const [messages, setMessages] = messageState;
  const [user, setUser] = userState;

  function selectConversation(convo_id) {
    //   e.preventDefault();
    //   API.getMessages(convo_id)
    //     .then((messages) => {
    //       console.log(messages);
    //       setMessages(messages);
    //     })
    //     .catch((e) => console.error(e));
  }

  return (
    <>
      <Container fluid>
        <Row>
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
                      // Just another place where I am having to use a different "id"
                      // onClick={(e) => selectConversation(e, convo._id)}
                      onClick={() =>
                        API.selectConversation(convo.id).then((messages) => {
                          setMessages(messages);
                        })
                      }
                    >
                      {convo.name || "New Conversation"}
                    </Row>
                  </div>
                );
              })}
            </Col>
            <Col sm={9}>
              {messages.map((message, i) => {
                console.log(message);
                return (
                  <Message
                    i={i}
                    key={i}
                    user={user}
                    message={message}
                    messages={messages}
                  />
                );
              })}
            </Col>
          </>
        </Row>
      </Container>
    </>
  );
}

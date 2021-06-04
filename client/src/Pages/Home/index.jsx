import React, { useRef } from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import API from "../../utils/API";
import { useConversations } from "../../utils/ConvorsationProvider";
import Messages from "../../Comps/Message";
import "./home.css";

export default function Home() {
  const { conversationState, messageState, selectedConversationState } =
    useConversations();
  const [conversations, setConversations] = conversationState;
  const [messages, setMessages] = messageState;
  const [selectedConversation, setSelectedConversation] =
    selectedConversationState;

  const searchRef = useRef();

  return (
    <>
      <Container fluid>
        <Row>
          <>
            <Col sm={3}>
              <input
                id="searchConversationsInput"
                type="text"
                ref={searchRef}
                placeholder="search"
              />

              {conversations.map((convo, i) => {
                return (
                  <Row
                    key={i}
                    className="convoBox"
                    id={selectedConversation.id === convo.id ? "selected" : "#"}
                    // className={selectedConversation._id === convo._id ? "selected" : "notSelected"}
                    // Just another place where I am having to use a different "id"
                    // onClick={(e) => selectConversation(e, convo._id)}
                    onClick={() =>
                      API.selectConversation(convo.id).then((messages) => {
                        setSelectedConversation(convo);
                        setMessages(messages);
                      })
                    }
                  >
                    {convo.name || "New Conversation"}
                  </Row>
                );
              })}
              <div id="bottomOfConvos" />
            </Col>
            <Col sm={9} id="messageBox">
              <Messages />
            </Col>
          </>
        </Row>
      </Container>
    </>
  );
}

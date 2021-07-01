import { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useConversations } from "../utils/ConvorsationProvider";
import API from "../utils/API";
import useViewport from "../utils/useViewport";
import Conversations from "./Conversations";
import Messages from "./Messages";

export default function Dashboard({ user }) {
  const { selectedConversation, messageState, loadingMessagesState } =
    useConversations();
  const [messages, setMessages] = messageState;
  const [loadingMessages, setLoadingMessages] = loadingMessagesState;
  const { mobile } = useViewport();

  return (
    <>
      {!mobile ? (
        <Container fluid>
          <Row>
            <Col sm={3}>
              <Conversations />
            </Col>
            <Col sm={9} id="messageBox">
              <Messages />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Conversations />
          {loadingMessages ? (
            <Spinner id="spinner" animation="border" />
          ) : (
            <Messages />
          )}
        </Container>
      )}
    </>
  );
}

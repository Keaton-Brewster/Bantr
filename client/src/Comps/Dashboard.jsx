import { useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useConversations } from "../utils/ConversationProvider";
import { useViewportContext } from "../utils/ViewportProvider";
import Conversations from "./Conversations";
import Messages from "./Messages";

export default function Dashboard() {
  const { selectedConversation } = useConversations();
  const { mobileScreen } = useViewportContext();

  // For mobile Layout
  const [show, setShow] = useState({
    convos: true,
    messages: false,
  });

  const Main = () => {
    return (
      <>
        {!mobileScreen ? (
          <Container fluid>
            <Row style={{ marginRight: "0px !important" }}>
              <Col sm={3} style={{ paddingRight: "0px" }}>
                <Conversations show={true} />
              </Col>
              <Col sm={9} id="messageBox">
                <Messages
                  show={true}
                  messages={selectedConversation.messages}
                />
              </Col>
            </Row>
          </Container>
        ) : (
          <Container fluid>
            <Conversations setShow={setShow} show={show.convos} />
            <Messages
              show={show.messages}
              setShow={setShow}
              messages={selectedConversation.messages}
            />
          </Container>
        )}
      </>
    );
  };

  return (
    <>
      {selectedConversation ? (
        <Main />
      ) : (
        <Spinner id="spinner" animation="border" />
      )}
    </>
  );
}

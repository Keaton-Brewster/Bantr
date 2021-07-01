import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useConversations } from "../utils/ConversationProvider";
import useViewport from "../utils/useViewport";
import Conversations from "./Conversations";
import Messages from "./Messages";

export default function Dashboard() {
  const { selectedConversation } = useConversations();
  const width = useViewport();

  const Main = () => {
    return (
      <>
        {width > 575 ? (
          <Container fluid>
            <Row>
              <Col sm={3}>
                <Conversations />
              </Col>
              <Col sm={9} id="messageBox">
                <Messages messages={selectedConversation.messages} />
              </Col>
            </Row>
          </Container>
        ) : (
          <Container fluid>
            <Conversations />
            <Messages messages={selectedConversation.messages} />
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

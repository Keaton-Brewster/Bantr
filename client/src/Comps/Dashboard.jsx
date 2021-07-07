import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useViewport } from "../utils/ViewportProvider";
import Menu from "./Menu";
import MainContent from "./MainContent";
import { useConversations } from "../utils/ConversationProvider";

export default function Dashboard() {
  const { mobileScreen } = useViewport();
  const { selectedConversation } = useConversations();

  return (
    <>
      {!selectedConversation ? (
        <Spinner id="spinner" />
      ) : !mobileScreen ? (
        <Container fluid>
          <Row style={{ marginRight: "0px !important" }}>
            <Col sm={4} style={{ paddingRight: "0px" }}>
              <Menu />
            </Col>
            <Col sm={8} id="messageBox">
              <MainContent />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Menu />
          <MainContent />
        </Container>
      )}
    </>
  );
}

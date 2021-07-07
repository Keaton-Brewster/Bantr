import { Container, Row, Col } from "react-bootstrap";
import { useViewport } from "../utils/ViewportProvider";
import Conversations from "./Menu/Conversations";
import MainContent from "./MainContent";

export default function Dashboard() {
  const { mobileScreen } = useViewport();

  return (
    <>
      {!mobileScreen ? (
        <Container fluid>
          <Row style={{ marginRight: "0px !important" }}>
            <Col sm={4} style={{ paddingRight: "0px" }}>
              <Conversations />
            </Col>
            <Col sm={8} id="messageBox">
              <MainContent />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Conversations />
          <MainContent />
        </Container>
      )}
    </>
  );
}

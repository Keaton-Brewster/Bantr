import { Container, Row, Col } from "react-bootstrap";
import { useViewport } from "../utils/ViewportProvider";
import Menu from "./Menu";
import MainContent from "./MainContent";

export default function Dashboard() {
  const { mobileScreen } = useViewport();

  return (
    <>
      {!mobileScreen ? (
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

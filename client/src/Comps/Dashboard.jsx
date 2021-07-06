import { Container, Row, Col } from "react-bootstrap";
import { useViewportContext } from "../utils/ViewportProvider";
import Conversations from "./SideBar/Conversations";
import Messages from "./Messages";

export default function Dashboard() {
  const { mobileScreen } = useViewportContext();

  return (
    <>
      {!mobileScreen ? (
        <Container fluid>
          <Row style={{ marginRight: "0px !important" }}>
            <Col sm={4} style={{ paddingRight: "0px" }}>
              <Conversations />
            </Col>
            <Col sm={8} id="messageBox">
              <Messages />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Conversations />
          <Messages />
        </Container>
      )}
    </>
  );
}

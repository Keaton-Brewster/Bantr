import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useViewportContext } from "../utils/ViewportProvider";
import Conversations from "./Conversations";
import Messages from "./Messages";

export default function Dashboard() {
  const { mobileScreen } = useViewportContext();
  // For mobile Layout
  const [show, setShow] = useState({
    convos: true,
    messages: false,
  });

  return (
    <>
      {!mobileScreen ? (
        <Container fluid>
          <Row style={{ marginRight: "0px !important" }}>
            <Col sm={4} style={{ paddingRight: "0px" }}>
              <Conversations show={true} />
            </Col>
            <Col sm={8} id="messageBox">
              <Messages show={true} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Conversations setShow={setShow} show={show.convos} />
          <Messages show={show.messages} setShow={setShow} />
        </Container>
      )}
    </>
  );
}

import { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { useConversations } from "../utils/ConversationProvider";
import { useContentContext } from "../utils/ContentProvider";
import Menu from "./Menu";
import MainContent from "./MainContent";
import "./animations.css";

export default function Dashboard() {
  const { display } = useContentContext();
  const { selectedConversation } = useConversations();

  function renderMobile() {
    if (display.menu) return <Menu />;
    if (display.mainContent) return <MainContent />;
  }

  function cleanLocalStorage() {
    localStorage.removeItem("epr_ru");
  }

  // apparently the emoji keyboard thing is storing things in local storage
  // So to stop that from piling up, we will regularly clean it out
  useEffect(() => {
    return () => {
      cleanLocalStorage();
    };
  });

  return (
    <>
      {!selectedConversation ? (
        <Spinner className="spinner" animation="border" />
      ) : (
        <>
          <BrowserView>
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
          </BrowserView>

          <MobileView>
            <Container fluid>{renderMobile()}</Container>
          </MobileView>
        </>
      )}
    </>
  );
}

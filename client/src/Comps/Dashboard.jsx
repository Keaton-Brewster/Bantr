import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { useContentContext } from "../utils/ContentProvider";
import Menu from "./Menu";
import MainContent from "./MainContent";
import "./animations.sass";
import { useAppRendering } from "../utils/Reducer";

export default function Dashboard() {
  const { display } = useContentContext();
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useAppRendering();
  const dashboard = state.mainContent;

  function renderMobile() {
    if (display.menu) return <Menu />;
    if (display.mainContent) return <MainContent />;
  }

  function cleanLocalStorage() {
    localStorage.removeItem("epr_ru");
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 50);
  }, []);

  // apparently the emoji keyboard thing is storing things in local storage
  // So to stop that from piling up, we will regularly clean it out
  useEffect(() => {
    return () => {
      cleanLocalStorage();
    };
  });

  return (
    <>
      {
        //!   THERE HAS TO BE A BETTER WAY TO RENDER THE HOME SCREEN BEFORE ANY CONVERSATIONS HAVE STARTED.
        //!   THIS WILL BE INTEGRAL FOR USER EXPERIENCE
      }
      {loading ? (
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
            {/* <Container fluid>{dashboard}</Container> */}
          </MobileView>
        </>
      )}
    </>
  );
}

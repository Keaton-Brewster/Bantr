import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useViewport from "../../utils/useViewport";
import ConversationsDesktop from "../../Comps/Desktop/Conversations";
import MessagesDesktop from "../../Comps/Desktop/Messages";
import ConversationsMobile from "../../Comps/Mobile/Conversations";
import MessagesMobile from "../../Comps/Mobile/Messages";
import "./home.css";
import { useConversations } from "../../utils/ConvorsationProvider";

export default function Home() {
  const { selectedConversationState } = useConversations();
  const [selectedConversation, setSelectedConversation] =
    selectedConversationState;
  const [text, setText] = useState("");
  const { width } = useViewport();

  function sendMessage(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (width <= 575) {
      setSelectedConversation();
    }
  }, []);

  return (
    <>
      {width > 575 ? (
        <Container fluid>
          <Row>
            <Col sm={3}>
              <ConversationsDesktop />
            </Col>
            <Col sm={9} id="messageBox">
              <MessagesDesktop sendMessage={sendMessage} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <ConversationsMobile />
          <MessagesMobile sendMessage={sendMessage} />
        </Container>
      )}
    </>
  );
}

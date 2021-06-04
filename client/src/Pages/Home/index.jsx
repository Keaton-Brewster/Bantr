import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useConversations } from "../../utils/ConvorsationProvider";
import useViewport from "../../utils/useViewport";
import ConversationsDesktop from "../../Comps/Desktop/Conversations";
import MessagesDesktop from "../../Comps/Desktop/Messages";
import ConversationsMobile from "../../Comps/Mobile/Conversations";
import MessagesMobile from "../../Comps/Mobile/Messages";
import "./home.css";

export default function Home() {
  const { selectedConversationState } = useConversations();
  const [selectedConversation, setSelectedConversation] =
    selectedConversationState;
  const { width } = useViewport();

  function sendMessage(text) {
    console.log(selectedConversation);
    // Yet another place where I ran into id issues.. this is going to be a mess to fix later
    const convo_id = selectedConversation.id;
    // const convo_id = selectedConversation._id;
    API.sendMessage(convo_id, text);
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

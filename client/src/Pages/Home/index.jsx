import { useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useConversations } from "../../utils/ConvorsationProvider";
import API from "../../utils/API";
import useViewport from "../../utils/useViewport";
import Conversations from "../../Comps/Conversations";
import Messages from "../../Comps/Messages";
import "./home.css";

export default function Home() {
  const {
    selectedConversationState,
    userState,
    messageState,
    loadingMessagesState,
    mobileViewState,
  } = useConversations();
  const [user, setUser] = userState;
  const [selectedConversation, setSelectedConversation] =
    selectedConversationState;
  const [messages, setMessages] = messageState;
  const [loadingMessages, setLoadingMessages] = loadingMessagesState;
  const [mobileView, setMobileView] = mobileViewState;
  const { width } = useViewport();

  function sendMessage(text) {
    // Yet another place where I ran into id issues.. this is going to be a mess to fix later
    const convo_id = selectedConversation.id;
    // const convo_id = selectedConversation._id;
    API.sendMessage(convo_id, user._id, text)
      .then((data) => {
        console.log(data);
        setMessages([...messages, data]);
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    if (width <= 575) {
      setMobileView({ conversations: true, messages: false });
      return;
    }
    setMobileView({ conversations: true, messages: true });
  }, [width, setSelectedConversation, setMobileView]);

  return (
    <>
      {width > 575 ? (
        <Container fluid>
          <Row>
            <Col sm={3}>
              <Conversations />
            </Col>
            <Col sm={9} id="messageBox">
              <Messages sendMessage={sendMessage} />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Conversations />
          {loadingMessages ? (
            <Spinner id="spinner" animation="border" />
          ) : (
            <Messages sendMessage={sendMessage} />
          )}
        </Container>
      )}
    </>
  );
}

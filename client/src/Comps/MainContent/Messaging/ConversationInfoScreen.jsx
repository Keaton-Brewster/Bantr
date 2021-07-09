import { useState, useEffect } from "react";
import { Spinner, ListGroup, Container, Col, Row } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { useConversations } from "../../../utils/ConversationProvider";
import UserCard from "../../UserCard";
import axios from "axios";

export default function ConversationInfoScreen({ containerRef }) {
  const [convoInfo, setConvoInfo] = useState();
  const { selectedConversation } = useConversations();
  const [loading, setLoading] = useState(true);

  function trimMessages(conversation) {
    const mutatedConversation = { ...conversation };
    mutatedConversation.messages = [];
    return mutatedConversation;
  }

  async function getConversationInformation() {
    const filteredConversation = trimMessages(selectedConversation);
    const conversationInformation = await axios.get(
      `api/conversations/getInfo/${JSON.stringify(filteredConversation)}`
    );
    setConvoInfo(conversationInformation.data);
    setLoading(false);
  }

  useEffect(() => {
    getConversationInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Spinner animation="border" className="spinner" role="status" />
      ) : (
        <div className="conversationInfoScreen">
          <Container>
            <Col>
              <Row xs={9}>
                <p>{selectedConversation.name || "Untitled Conversation"}</p>
                <FiEdit className="float-right ml-auto" />
              </Row>
              <Row xs={3}></Row>
            </Col>
          </Container>

          <ListGroup variant="flush">
            <h4>Members</h4>
            <ListGroup.Item />
            {convoInfo.members.map((member, index) => {
              return <UserCard member={member} key={index} />;
            })}
          </ListGroup>
        </div>
      )}
    </>
  );
}

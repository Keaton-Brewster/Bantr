import { useState, useEffect } from "react";
import { Spinner, ListGroup } from "react-bootstrap";
import { useConversations } from "../../../utils/ConversationProvider";
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
        <Spinner animation="border" id="spinner" />
      ) : (
        <div style={{ paddingTop: "40px" }}>
          <ListGroup>
            <ListGroup.Item>
              Hello, {convoInfo.participants[0].name}
            </ListGroup.Item>
          </ListGroup>
        </div>
      )}
    </>
  );
}

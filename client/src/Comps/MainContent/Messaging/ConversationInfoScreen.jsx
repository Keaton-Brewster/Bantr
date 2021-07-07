import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../../utils/ConversationProvider";
import axios from "axios";

export default function ConversationInfoScreen({ containerRef }) {
  const [convoInfo, setConvoInfo] = useState();
  const { selectedConversation } = useConversations();

  function removeBloatData(conversation) {
    const mutatedConversation = { ...conversation };
    mutatedConversation.messages = [];
    return mutatedConversation;
  }

  async function getConversationInformation() {
    const filteredConversation = removeBloatData(selectedConversation);
    const conversationInformation = await axios.get(
      `api/conversations/getInfo/${JSON.stringify(filteredConversation)}`
    );
    setConvoInfo(conversationInformation);
  }

  useEffect(() => {
    getConversationInformation();
    console.log(convoInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ paddingTop: "auto" }}>
      <ListGroup>
        <ListGroup.Item></ListGroup.Item>
      </ListGroup>
    </div>
  );
}

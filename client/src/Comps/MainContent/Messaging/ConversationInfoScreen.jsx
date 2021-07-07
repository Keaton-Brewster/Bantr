import { useState, useEffect } from "react";
import { useConversations } from "../../../utils/ConversationProvider";
import axios from "axios";

export default function ConversationInfoScreen({ containerRef }) {
  const [convoInfo, setConvoInfo] = useState();
  const { selectedConversation } = useConversations();

  function removeBloatData(conversation) {
    conversation.messages = [];
    return conversation;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div style={{ paddingTop: "50px" }}>Hello</div>;
}

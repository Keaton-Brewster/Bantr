import { useRef } from "react";
import { Row } from "react-bootstrap";
import { useConversations } from "../../utils/ConvorsationProvider";
import API from "../../utils/API";

export default function Conversations() {
  const { messageState, conversationState, selectedConversationState } =
    useConversations();
  const [messages, setMessages] = messageState;
  const [conversations, setConversations] = conversationState;
  const [selectedConversation, setSelectedConversation] =
    selectedConversationState;
  const searchRef = useRef();

  return (
    <>
      <input
        id="searchConversationsInput"
        type="text"
        ref={searchRef}
        placeholder="search"
      />

      {conversations.map((convo, i) => {
        return (
          <Row
            key={i}
            className="convoBox"
            id={selectedConversation.id === convo.id ? "selected" : "#"}
            // className={selectedConversation._id === convo._id ? "selected" : "notSelected"}
            // Just another place where I am having to use a different "id"
            // onClick={(e) => selectConversation(e, convo._id)}
            onClick={() =>
              API.selectConversation(convo.id).then((messages) => {
                setSelectedConversation(convo);
                setMessages(messages);
              })
            }
          >
            {convo.name || "New Conversation"}
          </Row>
        );
      })}
      <div id="bottomOfConvos" />
    </>
  );
}

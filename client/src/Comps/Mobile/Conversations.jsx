import { useRef } from "react";
import { Row } from "react-bootstrap";
import { useConversations } from "../../utils/ConvorsationProvider";
import API from "../../utils/API";

export default function Conversations() {
  const {
    messageState,
    conversationState,
    selectedConversationState,
    mobileViewState,
  } = useConversations();
  const [messages, setMessages] = messageState;
  const [conversations, setConversations] = conversationState;
  const [selectedConversation, setSelectedConversation] =
    selectedConversationState;
  const [mobileView, setMobileView] = mobileViewState;

  const searchRef = useRef();

  return (
    <div className={mobileView.conversations ? "show" : "hide"}>
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
            // className={selectedConversation._id === convo._id ? "selected" : "notSelected"}
            // Just another place where I am having to use a different "id"
            // onClick={(e) => selectConversation(e, convo._id)}
            onClick={() =>
              API.selectConversation(convo.id).then((messages) => {
                setMobileView({
                  conversations: false,
                  messages: true,
                });
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
    </div>
  );
}

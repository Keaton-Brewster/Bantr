import { useRef } from "react";
import { Row } from "react-bootstrap";
import { useConversations } from "../utils/ConvorsationProvider";
import API from "../utils/API";
import useViewport from "../utils/useViewport";

export default function Conversations() {
  const {
    messageState,
    conversationState,
    selectConversationIndex,
    loadingMessagesState,
  } = useConversations();
  const [messages, setMessages] = messageState;
  const [conversations, setConversations] = conversationState;
  const [loadingMessages, setLoadingMessages] = loadingMessagesState;

  const searchRef = useRef();

  const { mobile, mobileView, setMobileView } = useViewport();

  return (
    <div className={mobileView.conversations ? "show" : "hide"}>
      {/* <input
        id="searchConversationsInput"
        type="text"
        ref={searchRef}
        placeholder="search"
      /> */}

      {conversations.map((convo, index) => {
        return (
          <Row
            key={index}
            className="convoBox"
            // className={selectedConversation._id === convo._id ? "selected" : "notSelected"}
            // Just another place where I am having to use a different "id"
            // onClick={(e) => selectConversation(e, convo._id)}
            onClick={() => {
              setLoadingMessages(true);
              API.selectConversation(convo.id).then((messages) => {
                if (mobile)
                  setMobileView({
                    conversations: false,
                    messages: true,
                  });
                selectConversationIndex(index);
                setMessages(messages);
                setLoadingMessages(false);
              });
            }}
          >
            {convo.name || "New Conversation"}
          </Row>
        );
      })}
      <div id="bottomOfConvos" />
    </div>
  );
}

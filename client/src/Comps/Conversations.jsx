import { useRef } from "react";
import { Row } from "react-bootstrap";
import { useConversations } from "../utils/ConversationProvider";
import useMobileLayout from "../utils/useMobileLayout";
import useViewport from "../utils/useViewport";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();

  const searchRef = useRef();

  const width = useViewport();
  const [show, setShow] = useMobileLayout();

  return (
    <div className={show.convos ? "show" : "hide"}>
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
            onClick={(e) => {
              e.preventDefault();
              if (width < 575)
                setShow({
                  convos: false,
                  messages: true,
                });
              selectConversationIndex(index);
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

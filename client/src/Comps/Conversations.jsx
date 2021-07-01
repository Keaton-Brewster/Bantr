import { useState, useRef } from "react";
import { Row } from "react-bootstrap";
import { BsChatSquareDots as Chat } from "react-icons/bs";
import { useConversations } from "../utils/ConversationProvider";
import useMobileLayout from "../utils/useMobileLayout";
import useViewport from "../utils/useViewport";
import NewConversationModal from "./NewConversationModal";

export default function Conversations() {
  const { conversations, selectConversationIndex } = useConversations();
  const [newConvoModal, setNewConvoModal] = useState(false);

  const searchRef = useRef();

  const width = useViewport();
  const [show, setShow] = useMobileLayout();

  function createConversation(event) {}

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
      <button
        id="newConversationButton"
        onClick={(e) => {
          e.preventDefault();
          setNewConvoModal(true);
        }}
      >
        <Chat id="newChat" />
      </button>
      <NewConversationModal
        show={newConvoModal}
        hide={() => setNewConvoModal(false)}
        createConversation={createConversation}
      />
    </div>
  );
}

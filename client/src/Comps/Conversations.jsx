import { useState, useRef } from "react";
import { Row } from "react-bootstrap";
import { BsChatSquareDots as Chat } from "react-icons/bs";
import { useConversations } from "../utils/ConversationProvider";
import useViewport from "../utils/useViewport";
import NewConversationModal from "./NewConversationModal";

export default function Conversations({ show, setShow }) {
  const { conversations, selectConversationIndex } = useConversations();
  const [newConvoModal, setNewConvoModal] = useState(false);

  const searchRef = useRef();

  const width = useViewport();

  function createConversation(event) {}

  return (
    <div className={show ? "show" : "hide"}>
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
            onClick={(event) => {
              event.preventDefault();
              selectConversationIndex(index);
              if (width < 575)
                setShow({
                  convos: false,
                  messages: true,
                });
              console.log(show);
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

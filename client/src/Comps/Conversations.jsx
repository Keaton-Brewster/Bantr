import { useState, useRef } from "react";
import { Row, ListGroup } from "react-bootstrap";
import { BsChatSquareDots as Chat } from "react-icons/bs";
import { useConversations } from "../utils/ConversationProvider";
import useViewport from "../utils/useViewport";
import NewConversationModal from "./NewConversationModal";

export default function Conversations({ show, setShow }) {
  const { conversations, selectedConversation, selectConversationIndex } =
    useConversations();
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
      <ListGroup variant="flush">
        {conversations.map((convo, index) => {
          return (
            <ListGroup.Item
              key={index}
              className={`convoBox ${
                convo._id === selectedConversation._id && width > 575
                  ? "activeConvo"
                  : ""
              }`}
              onClick={(event) => {
                event.preventDefault();
                selectConversationIndex(index);
                if (width < 575)
                  setShow({
                    convos: false,
                    messages: true,
                  });
              }}
            >
              {convo.name || "New Conversation"}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
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

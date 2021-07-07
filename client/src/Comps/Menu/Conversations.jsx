import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { BsChatSquareDots as Chat } from "react-icons/bs";
import { useConversations } from "../../utils/ConversationProvider";
import { useViewport } from "../../utils/ViewportProvider";
import NewConversationModal from "../Modals/NewConversationModal";

export default function Conversations() {
  const { conversations, selectedConversation, selectConversationIndex } =
    useConversations();
  const [newConvoModal, setNewConvoModal] = useState(false);

  const { mobileScreen, show, setShow } = useViewport();

  function createConversation(event) {}

  return (
    <div className={show.convos ? "show" : "hide"}>
      <ListGroup variant="flush">
        {conversations?.map((convo, index) => {
          return (
            <ListGroup.Item
              key={index}
              className={`convoBox ${
                convo._id === selectedConversation._id && !mobileScreen
                  ? "activeConvo"
                  : ""
              }`}
              onClick={(event) => {
                event.preventDefault();
                selectConversationIndex(index);
                if (mobileScreen)
                  setShow({
                    convos: false,
                    mainContent: true,
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

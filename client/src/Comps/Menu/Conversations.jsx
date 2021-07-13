import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { useConversations } from "../../utils/ConversationProvider";
import { useContentContext } from "../../utils/ContentProvider";
import { useViewport } from "../../utils/ViewportProvider";
import NewConversationModal from "../Modals/NewConversationModal";

export default function Conversations() {
  const { setActiveContent, setDisplay } = useContentContext();
  const { conversations, selectedConversation, selectConversationIndex } =
    useConversations();
  const { isMobile } = useViewport();
  const [newConvoModal, setNewConvoModal] = useState(false);

  function createConversation(event) {}

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item
          className="LGItem"
          onClick={(e) => {
            e.preventDefault();
            setNewConvoModal(true);
          }}
        >
          <AiFillPlusCircle id="addButton" />
          New Conversation
        </ListGroup.Item>
        {conversations.map((convo, index) => {
          return (
            <ListGroup.Item
              key={index}
              className={`LGItem ${
                convo._id === selectedConversation._id && !isMobile
                  ? "activeConvo"
                  : ""
              }`}
              onClick={(event) => {
                event.preventDefault();
                selectConversationIndex(index);
                if (isMobile) {
                  setDisplay({
                    menu: false,
                    mainContent: true,
                  });
                } else {
                  setActiveContent({
                    messaging: true,
                  });
                }
              }}
            >
              {convo.name || "Untitled Conversation"}
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      <NewConversationModal
        show={newConvoModal}
        hide={() => setNewConvoModal(false)}
        createConversation={createConversation}
      />
    </>
  );
}

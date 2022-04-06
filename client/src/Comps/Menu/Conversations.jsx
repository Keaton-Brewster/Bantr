import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { useConversations } from "../../utils/ConversationProvider";
import { useUIContext } from "../../utils/UIProvider";
import { useViewport } from "../../utils/ViewportProvider";
import { useContactContext } from "../../utils/ContactProvider";
import NewConversationModal from "../Modals/NewConversation/NewConversationModal";
import NewMessageModal from "../Modals/NewMessage/NewMessageModal";
import API from "../../utils/API";
import { useUserContext } from "../../utils/UserProvider";

export default function Conversations() {
  //STATE
  //================================================================================
  const { user } = useUserContext();
  const { setActiveContent, setDisplay } = useUIContext();
  const {
    conversations,
    setPendingText,
    selectedConversation,
    selectConversationIndex,
  } = useConversations();
  const { isMobile } = useViewport();
  const [newConvoModalVisible, setNewConvoModalVisible] = useState(false);
  const [newMessageModalVisible, setNewMessageModalVisible] = useState(false);
  const [newConversationRecipients, setNewConversationRecipients] =
    useState(null);

  //FUNCTIONS
  //================================================================================
  // function goToConversation() {
  //   setConversationFromContact(selectedContact._id)
  //     .then(() => {
  //       setActiveContent({ conversations: true });
  //       setActiveMenu({ conversations: true });
  //     })
  //     .catch((error) => console.error(error));
  // }

  function writeConversationName(recipients) {
    let names = [];
    recipients.forEach((user, i) => {
      if (recipients[recipients.length - 1] === user)
        names.push(`${user.givenName} ${user.familyName}`);
      else names.push(`${user.givenName} ${user.familyName},`);
    });
    return names.join(" ").toString();
  }

  function mapConversationMembers(recipients) {
    let members = [user._id];
    recipients.forEach((recipient) => members.push(recipient._id));
    return members;
  }

  function createConversation() {
    API.createConversation(
      {
        members: mapConversationMembers(newConversationRecipients),
        name: writeConversationName(newConversationRecipients),
      },
      (created) => console.log("created: ", created),
      (alreadyExists) => {
        console.log("alreadyExists: ", alreadyExists);
      },
      (error) => console.error(error)
    );
  }

  function messageSubmit(text) {
    // setPendingText(text);
    createConversation();
    // goToConversation();
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!newConversationRecipients) return;
    setNewMessageModalVisible(true);
  }, [newConversationRecipients]);

  //COMPONENT
  //================================================================================
  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item
          className="LGItem"
          onClick={(e) => {
            e.preventDefault();
            setNewConvoModalVisible(true);
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
                    conversations: true,
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
        show={newConvoModalVisible}
        hide={() => setNewConvoModalVisible(false)}
        setNewConversationRecipients={setNewConversationRecipients}
      />

      <NewMessageModal
        show={newMessageModalVisible}
        hide={() => setNewMessageModalVisible(false)}
        messageSubmit={messageSubmit}
      />
    </>
  );
}

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

  function startOrGoToConversation(started, goTo) {
    API.createConversation(
      {
        members: mapConversationMembers(newConversationRecipients),
        name: writeConversationName(newConversationRecipients),
      },
      (newConversation) => started(newConversation),
      (existingConversation) => goTo(existingConversation),
      (error) => console.error(error)
    );
  }

  function messageSubmit(text) {
    setPendingText(text);
    startOrGoToConversation(
      (newConversation) => {
        // Handle adding, and going to the newly created conversation
        console.log(newConversation);
      },
      (existingConversation) => {
        // Handle going to the existing conversation
        console.log(existingConversation);
      }
    );
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
          Start A New Message
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

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
    addNewConversation,
    setConvoStateReady,
  } = useConversations();
  const { isMobile } = useViewport();
  const [newConvoModalVisible, setNewConvoModalVisible] = useState(false);
  const [newMessageModalVisible, setNewMessageModalVisible] = useState(false);
  const [newConversationRecipients, setNewConversationRecipients] =
    useState(null);
  const [conversationAdded, setConversationAdded] = useState(false);
  const [newConversation_id, setNewConversation_id] = useState(null);

  //FUNCTIONS
  //================================================================================
  function writeConversationName(recipients) {
    let names = [];
    recipients.forEach((user, index) => {
      if (recipients.length - 1 === index)
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
    API.startOrGoTOConversation(
      {
        members: mapConversationMembers(newConversationRecipients),
        name: writeConversationName(newConversationRecipients),
      },
      (newConversation) => started(newConversation),
      (existingConversation) => goTo(existingConversation),
      (error) =>
        console.error("conversations.jsx:startOrGoToConversation():: ", error)
    );
  }

  function goToConversation() {
    setConvoStateReady(true);
    setNewMessageModalVisible(false);
  }

  function messageSubmit(text) {
    setPendingText(text);

    startOrGoToConversation(
      (newConversation) => {
        addNewConversation(newConversation).then(() => {
          setNewConversation_id(newConversation._id);
          setConversationAdded(true);
        });
      },

      (existingConversation) => {
        selectConversationIndex(
          conversations.findIndex(
            (convo) => convo._id === existingConversation._id
          )
        );
        goToConversation();
      }
    );
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!newConversationRecipients) return;
    setNewMessageModalVisible(true);
  }, [newConversationRecipients]);

  // This effect handles the loading of a newly created conversation
  // Took some manipulation but I think it's good to go.
  useEffect(() => {
    if (!conversationAdded) return;
    selectConversationIndex(
      conversations.findIndex((convo) => convo._id === newConversation_id)
    );
    goToConversation();
    setNewConversation_id(null);
    setConversationAdded(false);
  }, [
    conversationAdded,
    conversations,
    goToConversation,
    newConversation_id,
    selectConversationIndex,
  ]);

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

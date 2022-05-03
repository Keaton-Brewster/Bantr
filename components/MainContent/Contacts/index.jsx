import { useState, useEffect, useCallback } from "react";
import { Spinner, ListGroup, Image } from "react-bootstrap";
import { useContactContext } from "../../../lib/contexts/ContactProvider";
import { useUIContext } from "../../../lib/contexts/UIProvider";
import { useConversations } from "../../../lib/contexts/ConversationProvider";
import { startOrGoToConversation } from "../../../lib/contexts/ConversationProvider";
import { useUserContext } from "../../../lib/contexts/UserProvider";
import API from "../../../lib/API";
import ContactTopMenu from "./ContactTopMenu";
import ConfrimContactRemovalModal from "../../Modals/ConfirmContactRemoval_Modal";
import NewMessageModal from "../../Modals/NewMessage/NewMessageModal";
import LGItem from "../../Menu/LGItem";
// import "./contacts.sass";

export default function Contacts({ containerRef }) {
  // STATE
  //================================================================================
  const { selectedContact } = useContactContext();
  const { user } = useUserContext();
  const {
    conversations,
    setPendingText,
    setSelectedConversation_id,
    addNewConversation,
    setConvoStateReady,
  } = useConversations();
  const { setActiveContent, setActiveMenu } = useUIContext();
  const [conversationAdded, setConversationAdded] = useState(false);
  const [newConversation_id, setNewConversation_id] = useState(null);
  const [contactRemovalModalVisible, setContactRemovalModalVisible] =
    useState(false);
  const [newMessageModalVisible, setNewMessageModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // FUNCTIONS
  //================================================================================
  const goToConversation = useCallback(() => {
    setConvoStateReady(true);
    setNewMessageModalVisible(false);
    setActiveContent({ conversations: true });
    setActiveMenu({ conversations: true });
  }, [setActiveContent, setActiveMenu, setConvoStateReady]);

  // function startOrGoToConversation(started, goTo) {
  //   API.startOrGoTOConversation(
  //     {
  //       members: [user._id, selectedContact._id],
  //       //! This needs to change. The name should include all group memebrs
  //       //! and then when the conversation loads for users, their name should
  //       //! filtered out of the name
  //       name: `${selectedContact.givenName} ${selectedContact.familyName}`,
  //     },
  //     (newConversation) => started(newConversation),
  //     (existingConversation) => goTo(existingConversation),
  //     (error) =>
  //       console.error("conversations.jsx:startOrGoToConversation():: ", error)
  //   );
  // }

  function messageSubmit(text) {
    setPendingText(text);
    const members = [user, selectedContact];
    startOrGoToConversation(
      members,
      (newConversation) => {
        addNewConversation(newConversation).then(() => {
          setNewConversation_id(newConversation._id);
          setConversationAdded(true);
        });
      },
      (existingConversation) => {
        setSelectedConversation_id(existingConversation._id);
        goToConversation();
      }
    );
  }

  // EFFECTS
  //================================================================================
  useEffect(() => {
    if (!conversationAdded) return;
    setSelectedConversation_id(newConversation_id);
    goToConversation();
    setNewConversation_id(null);
    setConversationAdded(false);
  }, [
    conversationAdded,
    conversations,
    goToConversation,
    newConversation_id,
    setSelectedConversation_id,
  ]);

  // COMPONENT
  //================================================================================
  return (
    <>
      {selectedContact ? (
        <>
          <ContactTopMenu
            containerRef={containerRef}
            setContactRemovalModal={setContactRemovalModalVisible}
            _id={selectedContact._id}
            showNewMessageModal={() => {
              setNewMessageModalVisible(true);
            }}
          />

          <div className="conversationInfoScreen">
            <ListGroup variant="flush">
              <LGItem>
                <div className="mb-3">
                  <Image
                    style={{ width: "40%", marginLeft: "25%" }}
                    src={selectedContact.photoURL}
                    fluid
                    thumbnail
                  />
                </div>
              </LGItem>

              <LGItem>
                <h4>Email:</h4>
                <p
                  style={{ paddingLeft: "20px" }}
                >{`${selectedContact.email}`}</p>
              </LGItem>
            </ListGroup>
          </div>

          <NewMessageModal
            show={newMessageModalVisible}
            hide={() => setNewMessageModalVisible(false)}
            messageSubmit={messageSubmit}
          />

          <ConfrimContactRemovalModal
            show={contactRemovalModalVisible}
            hide={() => setContactRemovalModalVisible(false)}
          />
        </>
      ) : (
        // otherwise it will just tell you to select a contact
        <div className="absoluteCenter">Select A Contact</div>
      )}
    </>
  );
}

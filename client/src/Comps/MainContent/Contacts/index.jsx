import { useState, useEffect, useCallback, useRef } from "react";
import { useContactContext } from "../../../utils/providers/ContactProvider";
import { useUIContext } from "../../../utils/providers/UIProvider";
import { useConversations } from "../../../utils/providers/ConversationProvider";
import { useUserContext } from "../../../utils/providers/UserProvider";
import { startOrGoToConversation } from "../../../utils/providers/ConversationProvider";

import { Spinner, ListGroup, Image } from "react-bootstrap";
import ContactTopMenu from "./TopMenu/ContactTopMenu";
import ConfrimContactRemovalModal from "../../Modals/ConfirmContactRemoval_Modal";
import NewMessageModal from "../../Modals/NewMessage/NewMessageModal";
import LGItem from "../../Menu/LGItem";
import "./contacts.sass";

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

  // FUNCTIONS
  //================================================================================
  const goToConversation = useCallback(() => {
    setConvoStateReady(true);
    setNewMessageModalVisible(false);
    setActiveContent({ conversations: true });
    setActiveMenu({ conversations: true });
  }, [setActiveContent, setActiveMenu, setConvoStateReady]);

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

  // Log contact to the console so I can see the info
  useEffect(() => {
    console.log(containerRef.current.offsetWidth);
    console.log(selectedContact);
  }, [selectedContact]);

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
                    style={{
                      width: "30%",
                      marginLeft: `${containerRef.current.offsetWidth / 3.4}px`,
                    }}
                    src={selectedContact.photoURL}
                    fluid
                    thumbnail
                  />
                </div>
              </LGItem>

              <LGItem className="text-center">
                <h4>{`${selectedContact.givenName} ${selectedContact.familyName}`}</h4>
              </LGItem>
              <LGItem>
                <h4>Phone</h4>
                <p
                  style={{ paddingLeft: "20px" }}
                >{`${selectedContact.phoneNum}`}</p>
              </LGItem>
              <LGItem>
                <h4>Email</h4>
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

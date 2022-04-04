import { useState, useEffect } from "react";
import { Spinner, ListGroup, Image } from "react-bootstrap";
import { useContactContext } from "../../../utils/ContactProvider";
import { useUIContext } from "../../../utils/UIProvider";
import { useConversations } from "../../../utils/ConversationProvider";
import ContactTopMenu from "./ContactTopMenu";
import ConfrimContactRemovalModal from "../../Modals/ConfirmContactRemoval_Modal";
import NewMessageModal from "../../Modals/NewMessage/NewMessageModal";
import "./contacts.sass";

export default function Contacts({ containerRef }) {
  // STATE
  //================================================================================
  const { selectedContact } = useContactContext();
  const [contactRemovalModalVisible, setContactRemovalModalVisible] =
    useState(false);
  const [newMessageModalVisible, setNewMessageModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setConversationFromContact, setPendingText } = useConversations();
  const { setActiveContent, setActiveMenu } = useUIContext();

  // FUNCTIONS
  //================================================================================
  function goToConversation() {
    setConversationFromContact(selectedContact._id)
      .then(() => {
        setActiveContent({ conversations: true });
        setActiveMenu({ conversations: true });
      })
      .catch((error) => console.error(error));
  }

  function messageSubmit(text) {
    setPendingText(text);
    goToConversation();
  }

  // EFFECTS
  //================================================================================
  useEffect(() => {
    setIsLoading(false);
  }, [selectedContact]);

  // COMPONENT
  //================================================================================
  return (
    <>
      {isLoading ? (
        // If loading, return loader
        <Spinner className="absoluteCenter" animation="border" />
      ) : // Otherwise return the content: The selected contact if applicable
      selectedContact ? (
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
              <ListGroup.Item>
                <div className="mb-3">
                  <Image
                    style={{ width: "40%", marginLeft: "25%", }}
                    src={selectedContact.imageUrl}
                    fluid
                    thumbnail
                  />
                </div>
              </ListGroup.Item>

              <ListGroup.Item>
                <h4>Email:</h4>
                <p
                  style={{ paddingLeft: "20px" }}
                >{`${selectedContact.email}`}</p>
              </ListGroup.Item>
            </ListGroup>
          </div>

          <NewMessageModal
            show={newMessageModalVisible}
            hide={() => setNewMessageModalVisible(false)}
            selectedContact={selectedContact}
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

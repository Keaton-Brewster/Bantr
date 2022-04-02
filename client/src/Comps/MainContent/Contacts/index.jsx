import { useState, useEffect, useCallback } from "react";
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
  const { setConversationFromContact } = useConversations();
  const { setActiveContent, setActiveMenu } = useUIContext();

  // FUNCTIONS
  //================================================================================
  const goToConversation = (_id) => {
    console.log("ContactTopMenu :: executed goToConversation()");
    console.log(selectedContact);
    setConversationFromContact(_id);
    setActiveContent({ conversations: true });
    setActiveMenu({ conversations: true });

    //! Actually I think what would be really cool is if this opened a modal
    //! that you could use to send a message, and then after the message
    //! is sent, it would take you to the conversation

    /* 
    ? Tasks this function should perform: 
      Change state of content to Messaging
      Create a new conversation if a conversation with the selected contact does not already exists
      OR
      Set selected conversation to match the contact on which you selected
      if possible, highlight the text box in the messaging screen
    */
  };

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
                    style={{ width: "40%", marginLeft: "25%" }}
                    // This is not wokring right now. For some reason the source of the image responds with a
                    // 403 "forbidden" code. Probably going to need to find a new source for default profile pictures
                    src={selectedContact.imageUrl}
                    fluid
                    roundedCircle
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

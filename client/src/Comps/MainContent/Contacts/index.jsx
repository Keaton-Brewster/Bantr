import { useState, useEffect, useCallback } from "react";
import { Spinner, ListGroup, Image } from "react-bootstrap";
import { useContactContext } from "../../../utils/ContactProvider";
import ContactTopMenu from "./ContactTopMenu";
import ConfrimContactRemovalModal from "../../Modals/ConfirmContactRemoval_Modal";
import "./contacts.sass";

export default function Contacts({ containerRef }) {
  const { selectedContact } = useContactContext();
  const [contactRemovalModalVisible, setContactRemovalModalVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [selectedContact]);

  return (
    <>
      <ContactTopMenu containerRef={containerRef} 
        setContactRemovalModal={setContactRemovalModalVisible}
      />
      <ConfrimContactRemovalModal
        show={contactRemovalModalVisible}
        hide={() => setContactRemovalModalVisible(false)}
      />

      {isLoading ? (
        // If loading, return loader
        <Spinner className="absoluteCenter" animation="border" />
      ) : // Otherwise return the content: The selected contact if applicable
      selectedContact ? (
        <>
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
        </>
      ) : (
        // otherwise it will just tell you to select a contact
        <div className="absoluteCenter">Select A Contact</div>
      )}
    </>
  );
}

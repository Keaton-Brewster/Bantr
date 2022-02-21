import { useState, useEffect, useCallback } from "react";
import { Spinner, ListGroup, Image } from "react-bootstrap";
import { useContactContext } from "../../../utils/ContactProvider";
import ContactTopMenu from "./ContactTopMenu";
import "./contacts.sass";

export default function Contacts({ containerRef }) {
  const { selectedContact } = useContactContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [selectedContact]);

  return (
    <>
      <ContactTopMenu containerRef={containerRef} />

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
                    style={{ width: "40%", marginLeft: '25%' }}
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

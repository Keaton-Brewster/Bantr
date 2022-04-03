import { useEffect, useState, useRef } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useContactContext } from "../../utils/ContactProvider";

export default function NewConversationModal({
  //PROPS
  //================================================================================
  show,
  hide,
  createConversation,
}) {
  //STATE
  //================================================================================
  const [recipient, setRecipients] = useState([]);
  const { contacts, setSelectedContact, setSearchValue } = useContactContext();
  const [searchedContacts, setSearchedContacts] = useState(contacts);
  const [loading, setLoading] = useState(true);
  const searchRef = useRef();

  //FUNCTIONS
  //================================================================================
  function createRecipientCard() {}

  function selectContact(event) {
    event.preventDefault();
    console.log("selectContact() :: ");
  }

  function handleInputChange(event) {
    event.preventDefault();
    setSearchValue(searchRef.current.textContent);
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!contacts) return;
    setLoading(false);
  }, [contacts]);

  //COMPONENT
  //================================================================================
  return (
    <Modal
      show={show}
      onHide={hide}
      centered
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Start a new conversation</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Header>
        <small>Recipients:</small>
      </Modal.Header>
      <Modal.Body>
        <ListGroup.Item
          contentEditable
          ref={searchRef}
          className="textarea"
          id="searchBox"
          onInput={handleInputChange}
        />
        <ListGroup>
          {contacts ? (
            contacts.map((contact, index) => {
              return (
                <ListGroup.Item
                  className="LGItem"
                  onClick={selectContact}
                  key={index}
                >
                  {contact.givenName + " " + contact.familyName}
                </ListGroup.Item>
              );
            })
          ) : (
            <div>
              <p>No Contacts here!</p>
            </div>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            createConversation();
          }}
        >
          Start Conversation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

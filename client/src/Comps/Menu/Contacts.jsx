import { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { useConversations } from "../../utils/ConversationProvider";
import API from "../../utils/API";
import NewContactModal from "../Modals/NewContactModal";
import { useContactContext } from "../../utils/ContactProvider";

export default function Contacts() {
  const [newContactModal, setNewContactModal] = useState(false);
  const { contacts } = useContactContext();
  const { user } = useConversations();
  const [loading, setLoading] = useState(true);

  function showNewContactModal(event) {
    event.preventDefault();
    setNewContactModal(true);
  }

  const selectContact = () => {};

  function addContact(phoneNum) {
    API.addContact(
      user._id,
      phoneNum,
      (contact) => {
        console.log(contact);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  useEffect(() => {
    if (!contacts) return;
    setLoading(false);
  }, [contacts]);

  return loading ? (
    <Spinner className="absoluteCenter" animation="border" />
  ) : (
    <>
      <NewContactModal
        show={newContactModal}
        hide={() => setNewContactModal(false)}
        addContact={addContact}
      />

      <ListGroup>
        <ListGroup.Item className="LGItem" onClick={showNewContactModal}>
          <AiFillPlusCircle id="addButton" />
          Add Contact
        </ListGroup.Item>
        {contacts ? (
          contacts.map((contact, index) => {
            return (
              <ListGroup.Item
                className="LGItem"
                onClick={selectContact(contact)}
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
    </>
  );
}

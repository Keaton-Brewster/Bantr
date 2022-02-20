import { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import NewContactModal from "../Modals/NewContactModal";
import API from "../../utils/API";
import { useContactContext } from "../../utils/ContactProvider";
import { useUserContext } from "../../utils/UserProvider";

export default function Contacts() {
  const [newContactModal, setNewContactModal] = useState(false);
  const { contacts, setSelectedContact } = useContactContext();
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(true);

  function showNewContactModal(event) {
    event.preventDefault();
    setNewContactModal(true);
  }

  const selectContact = (contact) => {
    console.log(contact);
    setSelectedContact(contact);
  };

  function addContact(phoneNum) {
    API.addContact(
      user._id,
      phoneNum,
      (updatedUser) => {
        // need to call to update the user in the local storage
        setUser(updatedUser);
        setNewContactModal(false);
      },
      (err) => {
        console.log("contacts.jsx", err);
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
          contacts
            .sort((a, b) => {
              if (a.familyName < b.familyName) {
                return -1;
              }
              if (a.familyName > b.familyName) {
                return 1;
              }
              return 0;
            })
            .map((contact, index) => {
              return (
                <ListGroup.Item
                  className="LGItem"
                  onClick={(e) => {
                    e.preventDefault();
                    selectContact(contact);
                  }}
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

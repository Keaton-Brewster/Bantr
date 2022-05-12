import { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import NewContactModal from "../Modals/NewContactModal";
import API from "../../utils/API";
import { useContactContext } from "../../utils/providers/ContactProvider";
import { useUserContext } from "../../utils/providers/UserProvider";
import { useUIContext } from "../../utils/providers/UIProvider";
import LGItem from "./LGItem";

export default function Contacts() {
  //STATE
  //================================================================================
  const { contacts, selectedContact, setSelectedContact } = useContactContext();
  const { user, setUser } = useUserContext();
  const { isMobile } = useUIContext();
  const [newContactModal, setNewContactModal] = useState(false);
  const [loading, setLoading] = useState(true);

  //FUNCTIONS
  //================================================================================
  function showNewContactModal(event) {
    event.preventDefault();
    setNewContactModal(true);
  }

  function selectContact(contact) {
    setSelectedContact(contact);
  }

  function addContact(phoneNum) {
    if (phoneNum === user.phoneNum) {
      setNewContactModal(false);
      return alert("you cannot add yourself as a contact");
    }
    API.addContact(
      user._id,
      phoneNum,
      (updatedUser) => {
        // need to call to update the user in the local storage
        if (!updatedUser) return alert("You already have that contact!");
        setUser(updatedUser);
        setNewContactModal(false);
      },
      (err) => {
        console.log("contacts.jsx", err);
      }
    );
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!contacts) return;
    setLoading(false);
  }, [contacts]);

  useEffect(() => {
    return () => {
      setSelectedContact(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //COMPONENT
  //================================================================================
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
        <LGItem className="LGItem" onClick={showNewContactModal}>
          <AiFillPlusCircle id="addButton" />
          Add Contact
        </LGItem>
        {contacts ? (
          contacts.map((contact, index) => {
            return (
              <LGItem
                className={`LGItem ${
                  selectedContact
                    ? contact._id === selectedContact._id && !isMobile
                      ? "LGActive"
                      : ""
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  selectContact(contact);
                }}
                key={index}
              >
                {contact.givenName + " " + contact.familyName}
              </LGItem>
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

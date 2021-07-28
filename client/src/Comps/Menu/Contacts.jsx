import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import NewContactModal from "../Modals/NewContactModal";

export default function Contacts() {
  const [newContactModal, setNewContactModal] = useState(false);

  function showNewContactModal(event) {
    event.preventDefault();
    setNewContactModal(true);
  }

  function addContact(newContact) {
    if (!newContact.phoneNum)
      return alert("please provide a valid phone number");

    console.log(newContact);
  }

  return (
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
      </ListGroup>
    </>
  );
}

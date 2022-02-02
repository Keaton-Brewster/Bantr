import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import API from "../../utils/API";
import NewContactModal from "../Modals/NewContactModal";

export default function Contacts() {
  const [newContactModal, setNewContactModal] = useState(false);

  function showNewContactModal(event) {
    event.preventDefault();
    setNewContactModal(true);
  }

  function addContact(phoneNum) {
    console.log(`phoneNumber: ${phoneNum}`);
    API.getContact(
      phoneNum,
      (contact) => {
        if (!contact) return;
        console.log(contact);
      },
      (error) => {
        if (error) console.log(error);
      }
    );
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

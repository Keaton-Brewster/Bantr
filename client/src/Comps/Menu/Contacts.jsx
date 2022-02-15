import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { useConversations } from "../../utils/ConversationProvider";
import API from "../../utils/API";
import NewContactModal from "../Modals/NewContactModal";

export default function Contacts() {
  const [newContactModal, setNewContactModal] = useState(false);
  const { user } = useConversations();

  function showNewContactModal(event) {
    event.preventDefault();
    setNewContactModal(true);
  }

  function addContact(phoneNum) {
    API.addContact(
      user._id,
      phoneNum,
      (contact) => {
        console.log(contact);
      },
      (err) => {
        if (err === 304) {
          // handle what to do when you try to add a contact that
          // is already in your system
          return alert("contact already exists");
        }
        console.error(err);
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

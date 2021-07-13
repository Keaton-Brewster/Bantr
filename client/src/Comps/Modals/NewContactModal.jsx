import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function NewContactModal({ show, hide, addContact }) {
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
          <h4>Add a new contact</h4>
          <p className="small">
            (Reminder: if the user you are trying to add does not have a Banter
            account, they will not recieve any messages
          </p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => {}}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

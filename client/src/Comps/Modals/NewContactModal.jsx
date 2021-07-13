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
          <h4>Add a new contact by phone or email address</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input placeholder="Name" />
        <input placeholder="phone or email address" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => {}}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

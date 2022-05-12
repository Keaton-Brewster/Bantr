import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

export default function ConfirmContactRemovalModal({ show, hide }) {
  const removeContact = () => {
    console.log("confirm removal of contact");
    /*
    This will probably not actually be where this function lives,
    but for now as a proof, I will just make it here
    */
  };

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
          <h4>Are you sure you want to remove this contact?</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={removeContact}>Yes</Button>
        <Button onClick={hide}>No</Button>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

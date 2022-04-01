import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

export default function NewContactModal({ show, hide }) {
  //   useEffect(() => {
  //     if (phoneNum === undefined || phoneNum === null) return;
  //     let mutablePN = phoneNum.replace(/[+]/g, "");

  //     if (mutablePN.match(/\d/g).length === 11) setButtonDisabled(false);
  //     else setButtonDisabled(true);
  //   }, [phoneNum]);

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
        <Button>Yes</Button>
        <Button>No</Button>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

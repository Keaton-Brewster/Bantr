import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

export default function NewContactModal({ show, hide, addContact }) {
  const [phoneNum, setPhoneNum] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (phoneNum === undefined || phoneNum === null) return;
    let mutablePN = phoneNum.replace(/[+]/g, "");

    if (mutablePN.match(/\d/g).length === 11) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [phoneNum]);

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
          <h4>Add a new contact by phone number</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PhoneInput
          id="phoneInput"
          country="US"
          defaultCountry="US"
          placeholder="(___) ___-____ "
          value={phoneNum}
          onChange={setPhoneNum}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={buttonDisabled}
          variant="success"
          onClick={() => addContact(phoneNum)}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

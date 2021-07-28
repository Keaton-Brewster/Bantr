import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";

export default function NewContactModal({ show, hide, addContact }) {
  const [newContact, setNewContact] = useState({
    phoneNum: "",
    givenName: "",
    familyName: "",
  });
  const [phoneNum, setPhoneNum] = useState();
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const givenNameRef = useRef();
  const familyNameRef = useRef();

  function handleChange() {
    setGivenName(givenNameRef.current.value);
    setFamilyName(familyNameRef.current.value);
  }

  useEffect(() => {
    setNewContact({
      phoneNum,
      givenName,
      familyName,
    });
  }, [phoneNum, givenName, familyName]);

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
        <input
          ref={givenNameRef}
          onChange={handleChange}
          type="text"
          placeholder="First name"
        />
        <input
          ref={familyNameRef}
          onChange={handleChange}
          type="text"
          placeholder="Last name"
        />
        <PhoneInput
          id="phoneInput"
          country="US"
          defaultCountry="US"
          placeholder="+0 000 000 0000"
          value={phoneNum}
          onChange={setPhoneNum}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={buttonDisabled}
          variant="success"
          onClick={() => addContact(newContact)}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

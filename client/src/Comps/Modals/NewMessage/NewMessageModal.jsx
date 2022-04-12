import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useContactContext } from "../../../utils/ContactProvider";
import ModalTextInput from "../../Inputs/ModalTextInput";

export default function NewMessageModal({
  //PROPS
  //================================================================================
  show,
  hide,
  messageSubmit,
}) {
  //STATE
  //====================================================================
  const [currentInput, setCurrentInput] = useState(null);
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);
  // const [images, setImages] = useState([]);
  const textRef = useRef();

  //FUNCTIONS
  //====================================================================

  function testForCMD(event) {
    if (document.activeElement !== textRef.current) return;
    if (!currentInput) return;
    if (event.key === "Enter" && event.metaKey) {
      messageSubmit(currentInput);
    }
  }

  function handleSendButton(event) {
    event.preventDefault();
    if (!currentInput) return;
    messageSubmit(currentInput);
  }

  //EFFECTS
  //====================================================================
  useEffect(() => {
    document.addEventListener("keydown", testForCMD, false);

    return () => {
      document.removeEventListener("keydown", testForCMD, false);
    };
  });

  //COMPONENT
  //====================================================================
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
          <h4>New Message</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalTextInput
          textRef={textRef}
          setCurrentInput={setCurrentInput}
          emojiPickerState={[emojiPickerShow, setEmojiPickerShow]}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleSendButton}>
          Send
        </Button>
        <Button variant="danger" onClick={hide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

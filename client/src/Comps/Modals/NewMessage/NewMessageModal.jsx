import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useConversations } from "../../../utils/ConversationProvider";
import { useViewport } from "../../../utils/ViewportProvider";
import ModalTextInput from "./ModalTextInput";

export default function NewMessageModal({ show, hide, selectedContact }) {
  //STATE
  //====================================================================
  const [currentInput, setCurrentInput] = useState(null);
  const { sendMessage } = useConversations();
  const { scrollToBottomMessages } = useViewport();
  const [emojiPickerShow, setEmojiPickerShow] = useState(false);
  // const [images, setImages] = useState([]);
  const textRef = useRef();

  //FUNCTIONS
  //====================================================================
  function messageSubmit(event) {
    event.preventDefault();
    if (!currentInput) return;
    setEmojiPickerShow(false);

    //! This might break
    scrollToBottomMessages();
    sendMessage(currentInput);
    setCurrentInput(null);
    textRef.current.textContent = "";

    //? On desktop this is effective, but I may want to adjust this when it comes to mobile interaction
    document.activeElement.blur();
  }

  function testForCMD(event) {
    if (document.activeElement !== textRef.current) return;
    if (event.key === "Enter" && event.metaKey) {
      messageSubmit(event);
    }
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
          <h4>New Message to {selectedContact.givenName}</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalTextInput
          textRef={textRef}
          inputState={[currentInput, setCurrentInput]}
          emojiPickerState={[emojiPickerShow, setEmojiPickerShow]}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={messageSubmit}>
          Send
        </Button>
        <Button variant="danger" onClick={hide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

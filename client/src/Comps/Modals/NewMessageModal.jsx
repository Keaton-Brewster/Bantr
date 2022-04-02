import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ChatInput from "../MainContent/Messaging/ChatInput";

export default function NewMessageModal({ show, hide, containerRef }) {
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
          <h4>New Message With "Insert variable here"</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ChatInput containerRef={containerRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

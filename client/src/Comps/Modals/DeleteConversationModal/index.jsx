import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Modal, Button } from "react-bootstrap";

function DeleteConversationModal({ show, hide, className }) {
  // STATES
  //================================================================================
  // FUNCTIONS
  //================================================================================
  function deleteConversation(e) {
    e.preventDefault();
  }
  // EFFECTS
  //================================================================================
  // RENDER
  //================================================================================
  return (
    <Modal
      show={show}
      onHide={hide}
      centered
      aria-labelledby="contained-modal-title-vcenter"
      keyboard={false}
      className={className}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Are you sure you want to delete this conversation?</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={deleteConversation}>Yes</Button>
        <Button onClick={hide}>No</Button>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default styled(DeleteConversationModal)``;

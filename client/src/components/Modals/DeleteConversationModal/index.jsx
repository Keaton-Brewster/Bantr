import React from "react";
import styled, { withTheme } from "styled-components";

import { useUserContext } from "../../../utils/providers/UserProvider";
import { useConversations } from "../../../utils/providers/ConversationProvider";
import API from "../../../utils/API";

import { Modal, Button } from "react-bootstrap";

function DeleteConversationModal({
  show,
  hide,
  className,
  targetIndex,
  theme,
}) {
  // STATES
  //================================================================================
  const { user } = useUserContext();
  const { conversations } = useConversations();
  // FUNCTIONS
  //================================================================================
  function deleteConversation(e) {
    e.preventDefault();
    console.log(targetIndex);
    // This function will need to send the conversation._id and the user._id to the server
    // And then the server will need to add that conversation._id to a list on the user model
    // And use that list to filter out the conversation when returning all conversations to the client
    //! Above method is not the way to go, I am going to need to overhaul the
    //! way conversations are stored in order to get this to work the way
    //! I want it to.
    // API.hideConversation(conversations[targetIndex]._id, user._id);
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
        <br />
        <Button
          style={{ backgroundColor: `${theme.danger}` }}
          onClick={deleteConversation}
        >
          Yes
        </Button>
        <Button onClick={hide}>No</Button>
      </Modal.Header>
    </Modal>
  );
}

const styledComp = styled(DeleteConversationModal)``;

export default withTheme(styledComp);

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { Spinner, ListGroup } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { BiSave } from "react-icons/bi";
import { useConversations } from "../../../utils/ConversationProvider";
import { useThemes } from "../../../utils/ThemeProvider";

import LGItem from "../../Menu/LGItems";
import UserCardSM from "../../UserCards/UserCardSM";
import axios from "axios";
import MessagesTopMenu from "./TopMenu/MessagesTopMenu";

function _ConversationInfoScreen({ containerRef }) {
  //STATE
  //================================================================================
  const { selectedConversation, updateConversation } = useConversations();
  const { theme } = useThemes();
  const [convoInfo, setConvoInfo] = useState();
  const [editingConvoName, setEditingConvoName] = useState(false);
  const [loading, setLoading] = useState(true);
  const editConvoNameInput = useRef();

  //FUNCTIONS
  //================================================================================
  async function getConversationInformation() {
    const conversationInformation = await axios.get(
      `http://localhost:3001/api/conversations/getInfo/${selectedConversation._id}`
    );
    setConvoInfo(conversationInformation.data);
    setLoading(false);
  }

  function editConvoName(event) {
    event.preventDefault();
    setEditingConvoName(true);
    // Have to just make sure that the input has time to render
    // Sincei it is rendered conditionally, and we need to reference it.
    setTimeout(() => {
      editConvoNameInput.current.value = `${
        selectedConversation.name || "Untitled Conversation"
      }`;
      document.getElementById("editConvoNameInput").focus();
    }, 5);
  }

  async function saveEditedConvoName(event) {
    event.preventDefault();
    const updatedConversation = {
      _id: selectedConversation._id,
      newName: editConvoNameInput.current.value,
    };
    const response = await axios.put(
      "http://localhost:3001/api/conversations/updateConvoName/",
      updatedConversation
    );
    updateConversation(response.data);
    setEditingConvoName(false);
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    getConversationInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //COMPONENT
  //================================================================================
  if (loading)
    return (
      <Spinner animation="border" className="absoluteCenter" role="status" />
    );

  return (
    <>
      <MessagesTopMenu theme={theme} containerRef={containerRef} />

      <div className="conversationInfoScreen">
        <ListGroup variant="flush">
          <LGItem>
            <div className="mb-3">
              <h4>Group Name</h4>
              {editingConvoName ? (
                <input id="editConvoNameInput" ref={editConvoNameInput} />
              ) : (
                <span>
                  {selectedConversation.name || "Untitled Conversation"}
                </span>
              )}
              {editingConvoName ? (
                <BiSave
                  onClick={saveEditedConvoName}
                  className="float-right ml-auto"
                />
              ) : (
                <FiEdit
                  onClick={editConvoName}
                  className="float-right ml-auto"
                />
              )}
            </div>
          </LGItem>

          <LGItem>
            <h4>Members</h4>
            {convoInfo.map((user, index) => {
              return <UserCardSM user={user} key={index} />;
            })}
          </LGItem>
        </ListGroup>
      </div>
    </>
  );
}

const ConversationInfoScreen = styled(_ConversationInfoScreen)`
  transition: background 0.5s ease;
`;

export default ConversationInfoScreen;

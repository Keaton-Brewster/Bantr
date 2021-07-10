import { useState, useEffect, useRef } from "react";
import { Spinner, ListGroup } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { BiSave } from "react-icons/bi";
import { useConversations } from "../../../utils/ConversationProvider";
import UserCard from "../../UserCard";
import axios from "axios";

export default function ConversationInfoScreen({ containerRef }) {
  const { selectedConversation, updateConversation } = useConversations();
  const [convoInfo, setConvoInfo] = useState();
  const [editingConvoName, setEditingConvoName] = useState(false);
  const [conversationName, setConversationName] = useState(
    selectedConversation.name
  );
  const [loading, setLoading] = useState(true);
  const editConvoNameInput = useRef();

  function trimMessages(conversation) {
    const mutatedConversation = { ...conversation };
    mutatedConversation.messages = [];
    return mutatedConversation;
  }

  async function getConversationInformation() {
    const filteredConversation = trimMessages(selectedConversation);
    const conversationInformation = await axios.get(
      `api/conversations/getInfo/${JSON.stringify(filteredConversation)}`
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
    console.log(editConvoNameInput.current.value);
    const updatedConversation = {
      _id: selectedConversation._id,
      newName: editConvoNameInput.current.value,
    };
    const response = await axios.put(
      "/api/conversations/updateConvoName/",
      updatedConversation
    );
    updateConversation(response.data);
  }

  useEffect(() => {
    getConversationInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <Spinner animation="border" className="spinner" role="status" />
      ) : (
        <div className="conversationInfoScreen">
          <div className="mb-3">
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
              <FiEdit onClick={editConvoName} className="float-right ml-auto" />
            )}
          </div>

          {/* <input id="editConvoNameInput" ref={editConvoNameInput} /> */}

          <ListGroup variant="flush">
            <h4>Members</h4>
            <ListGroup.Item />
            {convoInfo.members.map((member, index) => {
              return <UserCard member={member} key={index} />;
            })}
          </ListGroup>
        </div>
      )}
    </>
  );
}

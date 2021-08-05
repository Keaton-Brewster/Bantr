import { useState, useEffect, useRef } from "react";
import { Spinner, ListGroup } from "react-bootstrap";
import { FiEdit } from "react-icons/fi";
import { BiSave } from "react-icons/bi";
import { useConversations } from "../../../utils/ConversationProvider";
import UserCard from "../../UserCard";
import axios from "axios";
import MessagesTopMenu from "./MessagesTopMenu";

export default function ConversationInfoScreen({ containerRef }) {
  const { selectedConversation, updateConversation } = useConversations();
  const [convoInfo, setConvoInfo] = useState();
  const [editingConvoName, setEditingConvoName] = useState(false);
  const [conversationName, setConversationName] = useState(
    selectedConversation.name
  );
  const [loading, setLoading] = useState(true);
  const editConvoNameInput = useRef();

  // function trimMessages(conversation) {
  //   const mutatedConversation = { ...conversation };
  //   mutatedConversation.messages = [];
  //   return mutatedConversation;
  // }

  async function getConversationInformation() {
    const conversationInformation = await axios.get(
      `http://localhost:5001/api/conversations/getInfo/${selectedConversation._id}`
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
      "http://localhost:5001/api/conversations/updateConvoName/",
      updatedConversation
    );
    updateConversation(response.data);
    setEditingConvoName(false);
  }

  useEffect(() => {
    getConversationInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return <Spinner animation="border" className="spinner" role="status" />;

  return (
    <>
      <MessagesTopMenu containerRef={containerRef} />

      <div className="conversationInfoScreen">
        <ListGroup variant="flush">
          <ListGroup.Item>
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
          </ListGroup.Item>

          <ListGroup.Item>
            <h4>Members</h4>
            {convoInfo.members.map((member, index) => {
              return <UserCard member={member} key={index} />;
            })}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
}

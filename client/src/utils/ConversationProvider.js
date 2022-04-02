import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUserContext } from "../utils/UserProvider";

const conversationContext = React.createContext();

export function useConversations() {
  return useContext(conversationContext);
}

export default function ConversationProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { user } = useUserContext();

  function updateConversation(updatedConversation) {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation._id === updatedConversation._id)
        return updatedConversation;
      return conversation;
    });
    setConversations(updatedConversations);
  }

  function sendMessage(string) {
    axios
      .put("/api/conversations/newMessage", {
        message_info: {
          sender_id: user._id,
          content: string,
        },
        conversation_id: conversations[selectedConversationIndex]._id,
      })
      .then((response) => response.data)
      .then((updatedConversation) => {
        updateConversation(updatedConversation);
      })
      .catch((e) => console.error(e));
  }

  function findConversationByUserID(_id) {
    let index = null;
    conversations.forEach((convo, i) => {
      if (convo.members.includes(_id) && convo.members.length === 2) index = i;
    });
    return index;
  }

  function setConversationFromContact(_id) {
    const index = findConversationByUserID(_id);
    setSelectedConversationIndex(index);
  }

  const loadConversations = useCallback(
    (cb) => {
      axios
        .get(`http://localhost:3001/api/conversations/${user._id}`)
        .then(({ data }) => {
          cb(data);
        });
    },
    [user._id]
  );

  const formattedConversations = conversations
    .sort((a, b) => {
      if (a.familyName < b.familyName) {
        return -1;
      }
      if (a.familyName > b.familyName) {
        return 1;
      }
      return 0;
    })
    .map((conversation) => {
      const formattedMessages = conversation.messages.map((message) => {
        message.fromMe = message.sender_id === user._id;
        return message;
      });
      conversation.messages = formattedMessages;
      return conversation;
    });

  useEffect(() => {
    if (!user._id) return;
    loadConversations((conversations) => {
      setConversations(conversations);
    });
  }, [user._id, loadConversations]);

  const value = {
    conversations: formattedConversations,
    selectedConversation: conversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    updateConversation,
    setConversationFromContact,
  };
  return (
    <conversationContext.Provider value={value}>
      {children}
    </conversationContext.Provider>
  );
}

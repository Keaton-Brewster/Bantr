import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

const conversationContext = React.createContext();

export function useConversations() {
  return useContext(conversationContext);
}

export default function ConversationProvider({ user, children }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  function updateConversation(updatedConversation) {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation._id === updatedConversation._id)
        return updatedConversation;
      return conversation;
    });
    setConversations(updatedConversations);
  }

  function sendMessage(text) {
    axios
      .put("/api/messages/newMessage", {
        message: {
          sender_id: user._id,
          content: text,
          senderName: user.name,
        },
        conversation_id: conversations[selectedConversationIndex]._id,
      })
      .then((response) => response.data)
      .then((updatedConversation) => {
        updateConversation(updatedConversation);
      })
      .catch((e) => console.error(e));
  }

  const loadConversations = useCallback(
    (cb) => {
      axios
        .get(`http://localhost:5001/api/conversations/${user._id}`)
        .then((conversations) => {
          cb(conversations.data);
        });
    },
    [user._id]
  );

  const formattedConversations = conversations.map((conversation) => {
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
      console.log(conversations);
      setConversations(conversations);
    });
  }, [user._id, loadConversations]);

  const value = {
    conversations: formattedConversations,
    selectedConversation: conversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    updateConversation,
  };
  return (
    <conversationContext.Provider value={value}>
      {children}
    </conversationContext.Provider>
  );
}

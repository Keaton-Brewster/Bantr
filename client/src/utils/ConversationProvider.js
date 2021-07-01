import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import API from "./API";

const conversationContext = React.createContext();

export function useConversations() {
  return useContext(conversationContext);
}

export function Provider({ id, children }) {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  function updateConversation(updatedConversation) {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation._id === updatedConversation._id) {
        return updatedConversation;
      }
      return conversation;
    });
    setConversations(updatedConversations);
  }

  function sendMessage(text) {
    // Yet another place where I ran into id issues.. this is going to be a mess to fix later
    const convo_id = conversations[selectedConversationIndex]._id;
    // const convo_id = conversations[selectedConversationIndex]._id;
    API.sendMessage(convo_id, id, text)
      .then((updatedConversation) => {
        updateConversation(updatedConversation);
      })
      .catch((e) => console.error(e));
  }

  const loadConversations = useCallback(
    (cb) => {
      axios.get(`/api/conversations/${id}`).then((conversations) => {
        cb(conversations.data);
      });
    },
    [id]
  );

  const formattedConversations = conversations.map((conversation) => {
    const formattedMessages = conversation.messages.map((message) => {
      message.fromMe = message.sender_id === id;
      return message;
    });
    conversation.messages = formattedMessages;
    console.log(conversation);
    return conversation;
  });

  useEffect(() => {
    if (!id) return;
    loadConversations((conversations) => {
      setConversations(conversations);
    });
  }, [id, loadConversations]);

  const value = {
    conversations: formattedConversations,
    selectedConversation: conversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
  };
  return (
    <conversationContext.Provider value={value}>
      {children}
    </conversationContext.Provider>
  );
}

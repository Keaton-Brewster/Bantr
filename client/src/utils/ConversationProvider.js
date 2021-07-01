import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import API from "./API";

const conversationContext = React.createContext();

export function useConversations() {
  return useContext(conversationContext);
}

export function Provider({ id, children }) {
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  function sendMessage(text) {
    // Yet another place where I ran into id issues.. this is going to be a mess to fix later
    const convo_id = conversations[selectedConversationIndex].id;
    // const convo_id = conversations[selectedConversationIndex]._id;
    API.sendMessage(convo_id, id, text)
      .then((data) => {
        console.log(data);
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

  useEffect(() => {
    if (!id) return;
    loadConversations((conversations) => {
      setConversations(conversations);
    });
  }, [id, loadConversations]);

  const value = {
    conversations,
    setConversations,
    selectedConversation: conversations[selectedConversationIndex],
    loadingMessagesState: [loadingMessages, setLoadingMessages],
    sendMessage,
    userID: id,
    selectConversationIndex: setSelectedConversationIndex,
  };
  return (
    <conversationContext.Provider value={value}>
      {children}
    </conversationContext.Provider>
  );
}

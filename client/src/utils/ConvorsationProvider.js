import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import API from "./API";

const conversationContext = React.createContext();

export function useConversations() {
  return useContext(conversationContext);
}

export function Provider({ id, children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  function sendMessage(text) {
    // Yet another place where I ran into id issues.. this is going to be a mess to fix later
    const convo_id = conversations[selectedConversationIndex].id;
    // const convo_id = conversations[selectedConversationIndex]._id;
    API.sendMessage(convo_id, id, text)
      .then((data) => {
        console.log(data);
        setMessages([...messages, data]);
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    API.init(([convos, topMessages]) => {
      setConversations(convos);
      setMessages(topMessages);
      setIsLoading(false);
    }).catch((e) => console.error(e));
  }, []);

  const value = {
    loadingState: [isLoading, setIsLoading],
    conversationState: [conversations, setConversations],
    selectedConversation: conversations[selectedConversationIndex],
    messageState: [messages, setMessages],
    loadingMessagesState: [loadingMessages, setLoadingMessages],
    sendMessage,
    userID: id,
    selectConversationIndex: setSelectedConversationIndex,
  };
  return (
    <conversationContext.Provider value={value}>
      {isLoading ? <Spinner id="spinner" animation="border" /> : children}
    </conversationContext.Provider>
  );
}

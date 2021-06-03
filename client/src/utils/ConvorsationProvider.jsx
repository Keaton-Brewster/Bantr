import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import API from "./API";

const conversationContext = React.createContext();

export function useConversations() {
  return useContext(conversationContext);
}

export function Provider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    _id: "User1",
  });

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
    messageState: [messages, setMessages],
    userState: [user, setUser],
  };
  return (
    <conversationContext.Provider value={value}>
      {isLoading ? <Spinner id="spinner" animation="border" /> : children}
    </conversationContext.Provider>
  );
}

import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useUserContext } from "../utils/UserProvider";
import API from "./API";

const conversationContext = React.createContext();

export function useConversations() {
  return useContext(conversationContext);
}

export default function ConversationProvider({ children }) {
  //STATE
  //================================================================================
  const { user } = useUserContext();
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [pendingText, setPendingText] = useState(null);
  const [convoStateReady, setConvoStateReady] = useState(false);

  //FUNCTIONS
  //================================================================================
  function updateConversation(updatedConversation) {
    const updatedConversations = conversations.map((conversation) => {
      if (conversation._id === updatedConversation._id)
        return updatedConversation;
      return conversation;
    });
    setConversations(updatedConversations);
  }

  function sendMessage(string) {
    const message_info = {
        sender_id: user._id,
        content: string,
      },
      conversation_id = conversations[selectedConversationIndex]._id;

    API.sendMessage(
      message_info,
      conversation_id,
      (updatedConversation) => {
        updateConversation(updatedConversation);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  function findConversationByUserID(_id) {
    let index = null;
    conversations.forEach((convo, i) => {
      if (convo.members.includes(_id) && convo.members.length === 2) index = i;
    });
    return index;
  }

  const setConversationFromContact = (_id) => {
    return new Promise((resolve, reject) => {
      try {
        const index = findConversationByUserID(_id);
        setSelectedConversationIndex(index);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const loadConversations = useCallback(
    (cb) => {
      API.getConversations(
        user._id,
        (conversations) => cb(conversations),
        (error) =>
          console.error("conversationProvider.js:loadConversation():: ", error)
      );
    },
    [user._id]
  );

  function addNewConversation(newConversation) {
    return new Promise((resolve, reject) => {
      try {
        setConversations([...conversations, newConversation]);
        resolve();
      } catch (error) {
        reject(
          "ConversationProvider::addNewConversation():: Promise Rejected",
          error
        );
      }
    });
  }

  function sendPendingText() {
    sendMessage(pendingText);
    setPendingText(null);
  }

  //VARIABLES FOR VALUE
  //================================================================================
  const formattedConversations = conversations
    //This should actually sort conversations by last 'updatedAt' value
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

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!user._id) return;
    loadConversations((conversations) => {
      setConversations(conversations);
    });
  }, [user._id, loadConversations]);

  useEffect(() => {
    // This effect handles the state delay that occurs when sending a message from the
    // Contact screen and the transitioning to the conversation screen.
    if (!pendingText || !convoStateReady) return;
    sendPendingText();
    setConvoStateReady(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingText, convoStateReady]);

  //PROVIDER VALUE
  //================================================================================
  const value = {
    conversations: formattedConversations,
    selectedConversation: conversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    updateConversation,
    setConversationFromContact,
    setPendingText,
    addNewConversation,
    setConvoStateReady,
  };

  //COMPONENT
  //================================================================================
  return (
    <conversationContext.Provider value={value}>
      {children}
    </conversationContext.Provider>
  );
}

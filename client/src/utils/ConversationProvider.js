import React, { useContext, useEffect, useState, useCallback } from "react";
import { useUserContext } from "../utils/UserProvider";
import API from "./API";
import useLocalStorage from "./useLocalStorage";

const conversationContext = React.createContext();

export function useConversations() {
  return useContext(conversationContext);
}

export default function ConversationProvider({ children }) {
  //STATE
  //================================================================================
  const { user } = useUserContext();
  //! I need to find a new way to select conversations
  //! Because I want them to be ordered by off of their 'updated_at'
  //! Value, I need a way to maintain selected conversation when the
  //! order of the conversation array changes
  const [conversations, setConversations] = useState([]);
  const [selectedConversation_id, setSelectedConversation_id] = useLocalStorage(
    "last_selected_convo",
    conversations[0] ? conversations[0]?._id : 0
  );
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
    };

    API.sendMessage(
      message_info,
      conversations.find((convo) => convo._id === selectedConversation_id),
      (updatedConversation) => {
        updateConversation(updatedConversation);
        setSelectedConversation_id(updatedConversation._id);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  function findConversationByUserID(_id) {
    return conversations.find(
      (convo) => convo.members.includes(_id) && convo.members.length === 2
    );
  }

  const setConversationFromContact = (_id) => {
    return new Promise((resolve, reject) => {
      try {
        const convo_id = findConversationByUserID(_id);
        setSelectedConversation_id(convo_id);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const loadConversations = useCallback(
    (callback) => {
      API.getConversations(
        user._id,
        (conversations) => callback(conversations),
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
      if (a.updated_at < b.updated_at) {
        return 1;
      }
      if (a.updated_at > b.updated_at) {
        return -1;
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
    selectedConversation: conversations.find(
      (convo) => convo._id === selectedConversation_id
    ),
    sendMessage,
    setSelectedConversation_id,
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

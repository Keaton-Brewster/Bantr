import React, { useContext, useEffect, useState, useCallback } from "react";
import { useUserContext } from "../utils/UserProvider";
import API from "./API";
import useLocalStorage from "./useLocalStorage";

const conversationContext = React.createContext();

export function useConversations() {
  return useContext(conversationContext);
}

//================================================================================
//* COMPONENT
//================================================================================
export default function ConversationProvider({ children }) {
  //================================================================================
  //* STATE
  //================================================================================
  const { user } = useUserContext();
  //! I need to find a new way to select conversations
  //! Because I want them to be ordered by off of their 'updated_at'
  //! Value, I need a way to maintain selected conversation when the
  //! order of the conversation array changes
  const [conversations, setConversations] = useState([]);
  const [selectedConversation_id, setSelectedConversation_id] = useLocalStorage(
    "last_selected_convo",
    0
  );
  const [pendingText, setPendingText] = useState(null);
  const [convoStateReady, setConvoStateReady] = useState(false);

  //================================================================================
  //* FUNCTIONS
  //================================================================================
  const updateConversation = useCallback(
    (updatedConversation) => {
      const updatedConversations = conversations.map((conversation) => {
        if (conversation._id === updatedConversation._id)
          return updatedConversation;
        return conversation;
      });
      setConversations(updatedConversations);
    },
    [conversations]
  );

  const sendMessage = useCallback(
    (string) => {
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
    },
    [
      conversations,
      selectedConversation_id,
      setSelectedConversation_id,
      updateConversation,
      user._id,
    ]
  );

  function findConversationByUserID(_id) {
    return conversations.find(
      (convo) => convo.members.includes(_id) && convo.members.length === 2
    );
  }

  function setConversationFromContact(_id) {
    return new Promise((resolve, reject) => {
      try {
        const convo_id = findConversationByUserID(_id);
        setSelectedConversation_id(convo_id);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

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

  const sendPendingText = useCallback(() => {
    sendMessage(pendingText);
    setPendingText(null);
  }, [pendingText, sendMessage]);

  //================================================================================
  //* VARIABLE(S) FOR VALUE
  //================================================================================
  const formattedConversations = conversations
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

  //================================================================================
  //* EFFECTS
  //================================================================================
  useEffect(() => {
    if (!user) return;
    loadConversations((conversations) => {
      setConversations(conversations);
      if (selectedConversation_id === 0 && conversations.length > 0)
        setSelectedConversation_id(conversations[0]._id);
    });
  }, [
    user,
    loadConversations,
    selectedConversation_id,
    setSelectedConversation_id,
  ]);

  useEffect(() => {
    // This effect handles the state delay that occurs when sending a message from the
    // Contact screen and the transitioning to the conversation screen.
    if (!pendingText || !convoStateReady) return;
    sendPendingText();
    setConvoStateReady(false);
  }, [pendingText, convoStateReady, sendPendingText]);

  // if user signs out or is lost from local storage for any reason
  // reset the local storage state of selected conversation
  useEffect(() => {
    if (user === 0) return setSelectedConversation_id(0);
    else return;
  }, [setSelectedConversation_id, user]);

  //================================================================================
  //* PROVIDER VALUE
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

  //================================================================================
  //* RENDER
  //================================================================================
  return (
    <conversationContext.Provider value={value}>
      {children}
    </conversationContext.Provider>
  );
}
//================================================================================
//* OTHER FUNCTIONS
//================================================================================
// Helper function for stertOrGoToConversation()
function writeConversationName(recipients) {
  let names = [];
  recipients.forEach((user, index) => {
    if (recipients.length - 1 === index)
      names.push(`${user.givenName} ${user.familyName}`);
    else names.push(`${user.givenName} ${user.familyName},`);
  });
  return names.join(" ").toString();
}

// For anywhere in the app that you can "start a conversation"
// Which as of now, is from conversation menu and contacts
export function startOrGoToConversation(members, started, goTo) {
  API.startOrGoTOConversation(
    {
      members: members.map((mem) => mem._id),
      name: writeConversationName(members),
    },
    (newConversation) => started(newConversation),
    (existingConversation) => goTo(existingConversation),
    (error) =>
      console.error("conversations.jsx:startOrGoToConversation():: ", error)
  );
}

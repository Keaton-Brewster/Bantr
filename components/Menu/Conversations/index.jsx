import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ListGroup } from "react-bootstrap";

import { useConversations } from "../../../lib/providers/ConversationProvider";
import { startOrGoToConversation } from "../../../lib/providers/ConversationProvider";
import { useUIContext } from "../../../lib/providers/UIProvider";
import { useViewport } from "../../../lib/providers/ViewportProvider";
import { useAppContext } from "../../../lib/providers/AppProvider";

import NewConversationModal from "../../Modals/NewConversation/NewConversationModal";
import NewMessageModal from "../../Modals/NewMessage/NewMessageModal";
import API from "../../..//lib/API";
import NewMessageBTN from "./NewMessageBTN";
import SearchBox from "../../Inputs/SearchBox";
import ConversationMap from "./ConversationMap";
import SearchResultsMap from "./SearchResultsMap";

function Conversations({ className }) {
  //STATE
  //================================================================================
  //CONTEXTS
  const { state } = useAppContext();
  const { user } = state;
  const {
    conversations,
    setPendingText,
    selectedConversation,
    setSelectedConversation_id,
    addNewConversation,
    setConvoStateReady,
  } = useConversations();
  //Modals
  const [newConvoModalVisible, setNewConvoModalVisible] = useState(false);
  const [newMessageModalVisible, setNewMessageModalVisible] = useState(false);
  //New Conversations Variables
  const [newConversationRecipients, setNewConversationRecipients] =
    useState(null);
  const [conversationAdded, setConversationAdded] = useState(false);
  const [newConversation_id, setNewConversation_id] = useState(null);
  //Handling Search Input
  const searchRef = useRef();
  const [searchValue, setSearchValue] = useState(null);

  //FUNCTIONS
  //================================================================================
  // function writeConversationName(recipients) {
  //   let names = [];
  //   recipients.forEach((user, index) => {
  //     if (recipients.length - 1 === index)
  //       names.push(`${user.givenName} ${user.familyName}`);
  //     else names.push(`${user.givenName} ${user.familyName},`);
  //   });
  //   return names.join(" ").toString();
  // }

  // function mapConversationMembers(recipients) {
  //   let members = [user];
  //   recipients.forEach((recipient) => members.push(recipient._id));
  //   return members;
  // }

  // function startOrGoToConversation(started, goTo) {
  //   API.startOrGoTOConversation(
  //     {
  //       members: mapConversationMembers(newConversationRecipients),
  //       name: writeConversationName(newConversationRecipients),
  //     },
  //     (newConversation) => started(newConversation),
  //     (existingConversation) => goTo(existingConversation),
  //     (error) =>
  //       console.error("conversations.jsx:startOrGoToConversation():: ", error)
  //   );
  // }

  const goToConversation = useCallback(() => {
    setConvoStateReady(true);
    setNewMessageModalVisible(false);
  }, [setConvoStateReady]);

  function messageSubmit(text) {
    setPendingText(text);

    startOrGoToConversation(
      [...newConversationRecipients, user],
      (newConversation) => {
        addNewConversation(newConversation).then(() => {
          setNewConversation_id(newConversation._id);
          setConversationAdded(true);
        });
      },

      (existingConversation) => {
        setSelectedConversation_id(existingConversation._id);
        goToConversation();
      }
    );
  }

  function handleSearch(event) {
    event.preventDefault();
    if (searchRef.current.innerText.trim() === "") {
      setSearchValue(null);
      setSearchResults(null);
      return;
    }
    setSearchValue(searchRef.current.innerText);
  }

  function handleSelectSearched(event, convoId) {
    event.preventDefault();
    setSelectedConversation_id(convoId);
    setSearchValue(null);
    searchRef.current.innerText = "";
    setSearchResults(null);
  }

  function handleNewConvoBTN(e) {
    e.preventDefault();
    setNewConvoModalVisible(true);
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!newConversationRecipients) return;
    setNewMessageModalVisible(true);
  }, [newConversationRecipients]);

  // This effect handles the loading of a newly created conversation
  // Took some manipulation but I think it's good to go.
  useEffect(() => {
    if (!conversationAdded) return;
    setSelectedConversation_id(newConversation_id);
    goToConversation();
    setNewConversation_id(null);
    setConversationAdded(false);
  }, [
    conversationAdded,
    conversations,
    goToConversation,
    newConversation_id,
    setSelectedConversation_id,
  ]);

  //* FOR SEARCH FUNCTIONALITY
  //================================================================================
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    if (!searchValue) return;
    let results = [];

    conversations.forEach((convo) => {
      results = [
        ...results,
        ...convo.messages
          .filter((message) => {
            if (
              message.content
                .toLowerCase()
                .trim()
                .includes(searchValue.toLowerCase().trim())
            )
              return true;
            else return false;
          })
          .map((message) => {
            return {
              convoId: convo._id,
              convoName: convo.name,
              message,
            };
          }),
      ];
    });
    setSearchResults(results);
  }, [conversations, searchValue]);

  //COMPONENT
  //================================================================================
  return (
    <div className={className}>
      <ListGroup variant="flush">
        <SearchBox
          ref={searchRef}
          handleInputChange={handleSearch}
          fixed={searchValue ? true : false}
        />

        {searchResults ? (
          <SearchResultsMap
            results={searchResults}
            onClick={handleSelectSearched}
          />
        ) : (
          <>
            <NewMessageBTN onClick={handleNewConvoBTN} />
            <ConversationMap
              conversations={conversations}
              selectedConversation={selectedConversation}
            />
          </>
        )}
      </ListGroup>
      <NewConversationModal
        show={newConvoModalVisible}
        hide={() => setNewConvoModalVisible(false)}
        setNewConversationRecipients={setNewConversationRecipients}
      />
      <NewMessageModal
        show={newMessageModalVisible}
        hide={() => setNewMessageModalVisible(false)}
        messageSubmit={messageSubmit}
      />
    </div>
  );
}

export default styled(Conversations)`
  height: 100vh;
  overflow-y: scroll;
  padding-bottom: 4rem;
`;

import { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";

import { useConversations } from "../../../utils/ConversationProvider";
import { useUIContext } from "../../../utils/UIProvider";
import { useViewport } from "../../../utils/ViewportProvider";
import { useUserContext } from "../../../utils/UserProvider";
import { useThemes } from "../../../utils/ThemeProvider";

import NewConversationModal from "../../Modals/NewConversation/NewConversationModal";
import NewMessageModal from "../../Modals/NewMessage/NewMessageModal";
import API from "../../../utils/API";
import LGItem from "../LGItems";
import SearchBox from "../../Inputs/SearchBox";

function Conversations({ className }) {
  //STATE
  //================================================================================
  //Contexts
  const { user } = useUserContext();
  const { setActiveContent, setDisplay } = useUIContext();
  const {
    conversations,
    setPendingText,
    selectedConversation,
    selectConversationIndex,
    addNewConversation,
    setConvoStateReady,
  } = useConversations();
  const { isMobile } = useViewport();
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
  //Theme
  const { theme } = useThemes();

  //FUNCTIONS
  //================================================================================
  function handleConversationSelection(event, index) {
    event.preventDefault();
    selectConversationIndex(index);
    if (isMobile) {
      setDisplay({
        menu: false,
        mainContent: true,
      });
    } else {
      setActiveContent({
        conversations: true,
      });
    }
  }

  function writeConversationName(recipients) {
    let names = [];
    recipients.forEach((user, index) => {
      if (recipients.length - 1 === index)
        names.push(`${user.givenName} ${user.familyName}`);
      else names.push(`${user.givenName} ${user.familyName},`);
    });
    return names.join(" ").toString();
  }

  function mapConversationMembers(recipients) {
    let members = [user._id];
    recipients.forEach((recipient) => members.push(recipient._id));
    return members;
  }

  function startOrGoToConversation(started, goTo) {
    API.startOrGoTOConversation(
      {
        members: mapConversationMembers(newConversationRecipients),
        name: writeConversationName(newConversationRecipients),
      },
      (newConversation) => started(newConversation),
      (existingConversation) => goTo(existingConversation),
      (error) =>
        console.error("conversations.jsx:startOrGoToConversation():: ", error)
    );
  }

  const goToConversation = useCallback(() => {
    setConvoStateReady(true);
    setNewMessageModalVisible(false);
  }, [setConvoStateReady]);

  function messageSubmit(text) {
    setPendingText(text);

    startOrGoToConversation(
      (newConversation) => {
        addNewConversation(newConversation).then(() => {
          setNewConversation_id(newConversation._id);
          setConversationAdded(true);
        });
      },

      (existingConversation) => {
        selectConversationIndex(
          conversations.findIndex(
            (convo) => convo._id === existingConversation._id
          )
        );
        goToConversation();
      }
    );
  }

  function handleSearch(event) {
    event.preventDefault();
    setSearchValue(searchRef.current.innerText);
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
    selectConversationIndex(
      conversations.findIndex((convo) => convo._id === newConversation_id)
    );
    goToConversation();
    setNewConversation_id(null);
    setConversationAdded(false);
  }, [
    conversationAdded,
    conversations,
    goToConversation,
    newConversation_id,
    selectConversationIndex,
  ]);

  useEffect(() => {
    if (!searchValue) return;

    //! This will need to handle the intake of a search value and then find
    //! results matching (if any) including text content and names.
    //! Then display those results in some way.

    console.log(searchValue);
  }, [searchValue]);

  //COMPONENT
  //================================================================================
  return (
    <div className={className}>
      <ListGroup variant="flush">
        <LGItem
          className="LGItem"
          onClick={(e) => {
            e.preventDefault();
            setNewConvoModalVisible(true);
          }}
        >
          <AiFillPlusCircle id="addButton" />
          Start A New Message
        </LGItem>

        <SearchBox ref={searchRef} handleInputChange={handleSearch} />

        {conversations.map((convo, index) => {
          return (
            <LGItem
              theme={theme}
              key={index}
              className={`${
                convo._id === selectedConversation._id && !isMobile
                  ? "LGActive"
                  : ""
              }`}
              onClick={(event) => handleConversationSelection(event, index)}
            >
              {convo.name || "Untitled Conversation"}
              <br />
              <span>
                {convo.messages[convo.messages.length - 1].content.slice(
                  0,
                  20
                ) + "..." || ""}
              </span>
            </LGItem>
          );
        })}
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

export default styled(Conversations)``;

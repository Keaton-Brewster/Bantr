import { useState, useEffect, useCallback } from 'react'
import { useContactContext } from '../../../lib/providers/ContactProvider'
import { useUIContext } from '../../../lib/providers/UIProvider'
import { useAppContext } from '../../../lib/providers/AppProvider'
import { useConversations } from '../../../lib/providers/ConversationProvider'

import { startOrGoToConversation } from '../../../lib/providers/ConversationProvider'

import { Spinner, ListGroup, Image } from 'react-bootstrap'
import ContactTopMenu from './ContactTopMenu'
import ConfrimContactRemovalModal from '../../Modals/ConfirmContactRemoval_Modal'
import NewMessageModal from '../../Modals/NewMessage/NewMessageModal'
import LGItem from '../../Menu/LGItem'

import './contacts.module.sass'

export default function Contacts({ containerRef }) {
  // STATE
  //================================================================================
  const { selectedContact } = useContactContext()
  const { state, dispatch } = useAppContext()
  const { user } = state
  const {
    conversations,
    setPendingText,
    setSelectedConversation_id,
    addNewConversation,
    setConvoStateReady,
  } = useConversations()
  const { setActiveContent, setActiveMenu } = useUIContext()
  const [conversationAdded, setConversationAdded] = useState(false)
  const [newConversation_id, setNewConversation_id] = useState(null)
  const [contactRemovalModalVisible, setContactRemovalModalVisible] =
    useState(false)
  const [newMessageModalVisible, setNewMessageModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // FUNCTIONS
  //================================================================================
  const goToConversation = useCallback(() => {
    setConvoStateReady(true)
    setNewMessageModalVisible(false)
    setActiveContent({ conversations: true })
    setActiveMenu({ conversations: true })
  }, [setActiveContent, setActiveMenu, setConvoStateReady])

  function messageSubmit(text) {
    setPendingText(text)
    const members = [user, selectedContact]
    startOrGoToConversation(
      members,
      (newConversation) => {
        addNewConversation(newConversation).then(() => {
          setNewConversation_id(newConversation._id)
          setConversationAdded(true)
        })
      },
      (existingConversation) => {
        setSelectedConversation_id(existingConversation._id)
        goToConversation()
      }
    )
  }

  // EFFECTS
  //================================================================================
  useEffect(() => {
    if (!conversationAdded) return
    setSelectedConversation_id(newConversation_id)
    goToConversation()
    setNewConversation_id(null)
    setConversationAdded(false)
  }, [
    conversationAdded,
    conversations,
    goToConversation,
    newConversation_id,
    setSelectedConversation_id,
  ])

  // COMPONENT
  //================================================================================
  return (
    <>
      {selectedContact ? (
        <>
          <ContactTopMenu
            containerRef={containerRef}
            setContactRemovalModal={setContactRemovalModalVisible}
            _id={selectedContact._id}
            showNewMessageModal={() => {
              setNewMessageModalVisible(true)
            }}
          />

          <div className="conversationInfoScreen">
            <ListGroup variant="flush">
              <LGItem>
                <div className="mb-3">
                  <Image
                    style={{ width: '40%', marginLeft: '25%' }}
                    src={selectedContact.photoURL}
                    fluid
                    thumbnail
                    alt="Profile picture of selected contact"
                  />
                </div>
              </LGItem>

              <LGItem>
                <h4>Email:</h4>
                <p
                  style={{ paddingLeft: '20px' }}
                >{`${selectedContact.email}`}</p>
              </LGItem>
            </ListGroup>
          </div>

          <NewMessageModal
            show={newMessageModalVisible}
            hide={() => setNewMessageModalVisible(false)}
            messageSubmit={messageSubmit}
          />

          <ConfrimContactRemovalModal
            show={contactRemovalModalVisible}
            hide={() => setContactRemovalModalVisible(false)}
          />
        </>
      ) : (
        // otherwise it will just tell you to select a contact
        <div className="absoluteCenter">Select A Contact</div>
      )}
    </>
  )
}

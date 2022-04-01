import { useState, useEffect } from "react";
import { Nav, Dropdown, DropdownButton } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useUIContext } from "../../../utils/UIProvider";
import { useContactContext } from "../../../utils/ContactProvider";
import { useViewport } from "../../../utils/ViewportProvider";

export default function MessagesTopMenu({
  containerRef,
  setContactRemovalModal,
}) {
  const [menuBarWidth, setMenuBarWidth] = useState("100%");
  const { width, isMobile } = useViewport();
  const { selectedContact } = useContactContext();
  const { activeContent, setActiveContent, setDisplay } = useUIContext();

  //   function openConversationInfo() {
  //     if (activeContent.conversationInfo) return handleBackButton();
  //     setActiveContent({
  //       conversationInfo: true,
  //     });
  //   }

  const openContactOptions = () => {};

  const goToConversation = () => {
    console.log("ContactTopMenu :: executed goToConversation()");
    /* 
    Tasks this function should perform: 
      Change state of content to Messaging
      Create a new conversation if a conversation with the selected contact does not already exists
      OR
      Set selected conversation to match the contact on which you selected
      if possible, highlight the text box in the messaging screen
    */
  };

  const removeContact = () => {
    console.log("ContactTopMenu :: executed removeContact()");
    setContactRemovalModal(true);
    /* 
    Tasks this function needs to perform:
      Actiave a modal that asks you to confirm the removal of the selected contact
    */
  };

  // To make the back button multipurpose, simply switch case the state of the current display
  // And then act accordingly
  //   function handleBackButton() {
  //     if (isMobile && !activeContent.conversationInfo)
  //       return setDisplay({
  //         menu: true,
  //         mainContent: false,
  //       });

  //     setActiveContent({ conversations: true });
  //     // Set timeout to allow convo info animtaion to take it offscreen before messages come back
  //     setActiveContent({ conversationInfo: false });
  //     setTimeout(() => {
  //       setActiveContent({ conversations: true });
  //     }, 590);
  //   }

  useEffect(() => {
    return setMenuBarWidth(`${containerRef.current.offsetWidth}px`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return selectedContact ? (
    <Nav
      id="contactTopMenu"
      className="flex-row justify-content-center"
      style={{ width: menuBarWidth }}
    >
      {/* {isMobile || !activeContent.conversations ? (
        <Nav.Item onClick={}>
          <FaArrowLeft className="backButton" />
        </Nav.Item>
      ) : null} */}
      <Nav.Item
        id="conversationName"
        style={{
          paddingLeft: `${
            !isMobile && activeContent.conversations ? "30px" : ""
          }`,
        }}
      >
        {`${selectedContact.givenName} ${selectedContact.familyName}`}
      </Nav.Item>
      <Nav.Item onClick={openContactOptions}>
        {/* <BsThreeDotsVertical id="conversationInfoButton" /> */}
        <DropdownButton align={{ lg: "start" }} title="" key="secondary">
          <Dropdown.Item onClick={goToConversation}>Send Message</Dropdown.Item>
          <Dropdown.Item onClick={removeContact}>Remove Contact</Dropdown.Item>
        </DropdownButton>
      </Nav.Item>
    </Nav>
  ) : null;
}

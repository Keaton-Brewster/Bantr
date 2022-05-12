import { useState, useEffect } from "react";
import { Nav, Dropdown, DropdownButton } from "react-bootstrap";

import { useUIContext } from "../../../../utils/providers/UIProvider";
import { useContactContext } from "../../../../utils/providers/ContactProvider";
import { useViewport } from "../../../../utils/providers/ViewportProvider";

export default function ContactsTopMenu({
  //PROPS
  //================================================================================
  containerRef,
  setContactRemovalModal,
  _id,
  showNewMessageModal,
}) {
  //STATE
  //================================================================================
  const [menuBarWidth, setMenuBarWidth] = useState("100%");
  const { width, isMobile } = useViewport();
  const { selectedContact } = useContactContext();
  const { activeContent } = useUIContext();

  //FUNCTIONS
  //================================================================================
  function removeContact() {
    console.log("ContactTopMenu :: executed removeContact()");
    setContactRemovalModal(true);
    /* 
    Tasks this function needs to perform:
      Actiave a modal that asks you to confirm the removal of the selected contact
    */
  }

  //   function openConversationInfo() {
  //     if (activeContent.conversationInfo) return handleBackButton();
  //     setActiveContent({
  //       conversationInfo: true,
  //     });
  //   }

  //! this portion of code is because this Component was copied from another
  //! Going to leave for now, but it is mostly irrelevant
  //!======================================================================
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
  //!======================================================================

  //EFFECTS
  //================================================================================
  useEffect(() => {
    return setMenuBarWidth(`${containerRef.current.offsetWidth}px`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  //COMPONENT
  //================================================================================
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
      <Nav.Item>
        {/* <BsThreeDotsVertical id="conversationInfoButton" /> */}
        <DropdownButton align={{ lg: "start" }} title="" key="secondary">
          <Dropdown.Item onClick={showNewMessageModal}>
            Send Message
          </Dropdown.Item>
          <Dropdown.Item onClick={removeContact}>Remove Contact</Dropdown.Item>
        </DropdownButton>
      </Nav.Item>
    </Nav>
  ) : null;
}

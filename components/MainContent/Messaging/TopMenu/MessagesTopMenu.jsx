import { useState, useEffect } from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { useUIContext } from "../../../../utils/UIProvider";
import { useViewport } from "../../../../utils/ViewportProvider";
import ConversationName from "./ConversationName";
import ConversationInfoButton from "./ConversationInfoButton";
import BackButton from "./BackButton";

function MessagesTopMenu({ className, containerRef }) {
  //STATE
  //================================================================================
  const [menuBarWidth, setMenuBarWidth] = useState("100%");
  const { width, isMobile } = useViewport();
  const { activeContent, setActiveContent, setDisplay } = useUIContext();

  //FUNCTIONS
  //================================================================================
  function openConversationInfo() {
    if (activeContent.conversationInfo) return handleBackButton();
    setActiveContent({
      conversationInfo: true,
    });
  }

  // To make the back button multipurpose, simply switch case the state of the current display
  // And then act accordingly
  function handleBackButton() {
    if (isMobile && !activeContent.conversationInfo)
      return setDisplay({
        menu: true,
        mainContent: false,
      });

    setActiveContent({ conversations: true });
    // Set timeout to allow convo info animtaion to take it offscreen before messages come back
    setActiveContent({ conversationInfo: false });
    setTimeout(() => {
      setActiveContent({ conversations: true });
    }, 590);
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    return setMenuBarWidth(`${containerRef.current.offsetWidth}px`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  //COMPONENT
  //================================================================================
  return (
    <Nav
      className={`${className} 'flex-row justify-content-center'`}
      style={{ width: menuBarWidth }}
    >
      <>
        {isMobile || !activeContent.conversations ? (
          <BackButton
            isMobile={isMobile}
            onClick={handleBackButton}
            activeContent={activeContent}
          />
        ) : null}{" "}
      </>
      <ConversationName isMobile={isMobile} activeContent={activeContent} />
      <ConversationInfoButton onClick={openConversationInfo} />
    </Nav>
  );
}

export default styled(MessagesTopMenu)`
  background-color: ${({ theme }) => theme.topMenuBackground};
  position: fixed;
  top: 0px;
  padding: 10px;
  z-index: 20;
`;

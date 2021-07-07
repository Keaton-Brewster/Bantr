import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useMainContent } from "..";
import { useViewport } from "../../../utils/ViewportProvider";

export default function MessagesTopMenu({ conversationName, containerRef }) {
  const { width, mobileScreen, setShow } = useViewport();
  const [menuBarWidth, setMenuBarWidth] = useState("100%");
  const { activeContent, setActiveContent } = useMainContent();

  function openConversationInfo() {
    setActiveContent("conversation info");
  }

  function handleBackButton() {
    switch (activeContent) {
      case "messaging":
        break;
      case "conversation info":
        setActiveContent("messaging");
        break;
      default:
        setShow({
          convos: true,
          messages: false,
        });
    }
  }

  useEffect(() => {
    if (width >= 680) setMenuBarWidth(`${containerRef.current.offsetWidth}px`);
    else setMenuBarWidth("100%");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <Nav
      id="messagesTopMenu"
      className="flex-row justify-content-end"
      style={{ width: menuBarWidth }}
    >
      {mobileScreen || activeContent === "conversation info" ? (
        <Nav.Item onClick={handleBackButton}>
          <FaArrowLeft className="backButton" />
        </Nav.Item>
      ) : null}
      <Nav.Item
        id="conversationName"
        style={{
          paddingLeft: `${activeContent === "messaging" ? "30px" : ""}`,
        }}
      >
        {conversationName ? conversationName : "Untitled Conversation"}
      </Nav.Item>
      <Nav.Item onClick={openConversationInfo}>
        <AiOutlineInfoCircle id="messageInfoButton" />
      </Nav.Item>
    </Nav>
  );
}

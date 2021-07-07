import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { useConversations } from "../../../utils/ConversationProvider";
import { useViewport } from "../../../utils/ViewportProvider";

export default function MessagesTopMenu({ conversationName, containerRef }) {
  const { selectedConversation } = useConversations();
  const { width, mobileScreen, setShow } = useViewport();
  const [menuBarWidth, setMenuBarWidth] = useState("100%");

  function openConversationInfo(e) {
    e.preventDefault();
    console.log(selectedConversation);
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
      {mobileScreen ? (
        <Nav.Item
          onClick={() => {
            setShow({
              convos: true,
              messages: false,
            });
          }}
        >
          <FaArrowLeft className="backButton" />
        </Nav.Item>
      ) : null}
      <Nav.Item id="conversationName">
        {conversationName ? conversationName : "Untitled Conversation"}
      </Nav.Item>
      <Nav.Item onClick={openConversationInfo}>
        <AiOutlineInfoCircle id="messageInfoButton" />
      </Nav.Item>
    </Nav>
  );
}

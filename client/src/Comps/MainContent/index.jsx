import { useState, useRef } from "react";
import { useConversations } from "../../utils/ConversationProvider";
import { useViewport } from "../../utils/ViewportProvider";
import Messages from "./Messaging";

export default function MainContent() {
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();

  const { show } = useViewport();

  return (
    <div className={show.mainContent ? "show" : "hide"} ref={containerRef}>
      <Messages containerRef={containerRef} />
    </div>
  );
}

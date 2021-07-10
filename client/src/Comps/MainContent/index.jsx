import { useRef } from "react";
import { useViewport } from "../../utils/ViewportProvider";
import MessagesTopMenu from "./Messaging/MessagesTopMenu";
import Messaging from "./Messaging";

export default function MainContent() {
  // Container ref is used to give refernce of width to the
  // Chat input so that is always is 100% width of its parent
  const containerRef = useRef();
  const { mobileDisplay } = useViewport();

  return (
    <div
      className={mobileDisplay.mainContent ? "show" : "hide"}
      ref={containerRef}
    >
      <MessagesTopMenu containerRef={containerRef} />
      <Messaging containerRef={containerRef} />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IndividualConversation from "./IndividualConversation";

function ConversationMap({ className, conversations }) {
  //STATE
  //================================================================================
  const [offset, setOffset] = useState(0);
  const [targetIndex, setTargetIndex] = useState(null);

  //FUNCTIONS
  //================================================================================
  function slideConvo(target, direction) {
    if (!targetIndex || !target) return setOffset(0);

    if (direction === "open" && offset < 100) {
      setOffset(100);
    } else if (direction === "close" && offset > 0) {
      setOffset(0);
    }
  }

  function handleTouchMove(e) {
    const target = e.target.dataset.index;
    setTargetIndex(target);
    if (e.wheelDeltaX < 0 && e.wheelDeltaY === 0) slideConvo(target, "open");
    if (e.wheelDeltaX > 0 && e.wheelDeltaY === 0) slideConvo(target, "close");
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    // This disables the browsers automatic fature of two-finger swiping to
    // Go back page
    // document.body.addEventListener("wheel", (e) => e.preventDefault(), {
    //   passive: false,
    // });

    document.addEventListener("mousewheel", handleTouchMove, false);
    document.addEventListener("DOMMouseScroll", handleTouchMove, false);

    return () => {
      document.removeEventListener("mousewheel", handleTouchMove, false);
      document.removeEventListener("DOMMouseScroll", handleTouchMove, false);
    };
  });

  //COMPONENT
  //================================================================================
  return (
    <div className={className}>
      {conversations.map((convo, index) => {
        return (
          <IndividualConversation
            key={index}
            convo={convo}
            index={index}
            targetIndex={targetIndex}
            offset={offset}
          />
        );
      })}
    </div>
  );
}

export default styled(ConversationMap)``;

import React, { useState, useEffect, createContext, useContext } from "react";
import styled from "styled-components";
import DeleteConversationModal from "../../Modals/DeleteConversationModal";
import IndividualConversation from "./IndividualConversation";

const DeleteConvoModalContext = createContext();

export function useDeleteConvoModal() {
  return useContext(DeleteConvoModalContext);
}

function ConversationMap({ className, conversations }) {
  //STATE
  //================================================================================
  const [offset, setOffset] = useState(0);
  const [targetIndex, setTargetIndex] = useState(null);
  //modal
  const [delConvoModalShow, setDelConvoModalShow] = useState(false);

  //FUNCTIONS
  //================================================================================
  function slideConvo(target, direction) {
    if (!targetIndex || !target) return setOffset(0);

    if (direction === "open" && offset < 80) {
      setOffset(80);
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
      <DeleteConvoModalContext.Provider
        value={{ delConvoModalShow, setDelConvoModalShow }}
      >
        <>
          {conversations.map((convo, index) => {
            return (
              <IndividualConversation
                key={index}
                convo={convo}
                index={index.toString()}
                targetIndex={targetIndex}
                offset={offset}
              />
            );
          })}

          <DeleteConversationModal
            show={delConvoModalShow}
            hide={() => setDelConvoModalShow(false)}
            targetIndex={targetIndex}
          />
        </>
      </DeleteConvoModalContext.Provider>
    </div>
  );
}

export default styled(ConversationMap)`
  overflow-x: hidden;
`;

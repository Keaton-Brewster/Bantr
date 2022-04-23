import React from "react";
import styled from "styled-components";

import { useDeleteConvoModal } from "./ConversationMap";

import { FaTrash } from "react-icons/fa";

function DeleteConvoBtn({ className }) {
  //STATES
  //================================================================================
  const [delConvoModalShow, setDelConvoModalShow] = useDeleteConvoModal();
  //FUNCTIONS
  //================================================================================
  function handleDeleteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
    setDelConvoModalShow(true);
  }
  //EFFECTS
  //================================================================================
  //RENDER
  //================================================================================
  return (
    <div className={className} onClick={handleDeleteClick}>
      <FaTrash id="deleteIcon" className="center" onClick={handleDeleteClick} />
    </div>
  );
}

export default styled(DeleteConvoBtn)`
  width: 80px;
  background-color: ${({ theme }) => theme.danger};
  position: absolute;
  right: -80px;
  top: 0px;
  height: 100%;
  display: flex;
  justify-content: center;
  > #deleteIcon {
    fill: #fefffb;
    background-color: ${({ theme }) => theme.danger};
    height: 100%;
    width: 20px;
    left: auto;
  }
`;

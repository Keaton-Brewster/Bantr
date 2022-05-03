import React from "react";
import { FaTrash } from "react-icons/fa";

export default function MessageContextMenu({ show }) {
  return (
    <nav id="contextMenu" className={show ? "show" : "hide"}>
      <button className="deleteMessageButton">
        <FaTrash className="deleteMessageButton" />
      </button>
    </nav>
  );
}

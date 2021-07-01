import React, { useEffect } from "react";

export default function SingleMessage({ data, handleRightClick, index }) {
  const [message, messages] = data;

  useEffect(() => {
    const thisElement = document.getElementById(`message_${index}`);
    thisElement.addEventListener("contextmenu", (e) => {
      handleRightClick(e, thisElement);
    });

    return () =>
      thisElement.removeEventListener("contextmenu", handleRightClick);
  }, [handleRightClick, index]);

  return (
    <div
      id={`message_${index}`}
      className={`my-1 d-flex flex-column ${
        message.fromMe ? "align-self-end align-items-end" : "align-items-start"
      }`}
    >
      <div
        // data-key={i}
        className={`message rounded px-2 py-1 ${
          message.fromMe ? "bg-primary text-white" : "bg-success"
        }`}
      >
        {message.content}
      </div>
      {
        <div
          className={`text-muted small ${message.fromMe ? "text-right" : ""}`}
        >
          {message.fromMe && !messages[index + 1]?.fromMe
            ? "You"
            : message.fromMe
            ? ""
            : message.senderName}
        </div>
      }
    </div>
  );
}

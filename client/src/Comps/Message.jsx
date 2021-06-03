import React from "react";

export default function Message({ messages, message, user, i }) {
  return (
    <div>
      <div
        className={`my-1 d-flex flex-column ${
          message.sender_id === user._id
            ? "align-self-end align-items-end"
            : "align-items-start"
        }`}
      >
        <div
          className={`rounded px-2 py-1 ${
            message.sender_id === user._id ? "bg-success text-white" : "border"
          }`}
        >
          {message.content}
        </div>
        <div
          className={`text-muted small ${
            message.sender_id === user._id ? "text-right" : ""
          }`}
        >
          {message.sender_id === user._id &&
          messages[i - 1].sender_id === user._id
            ? "You"
            : message.senderName}
        </div>
      </div>
    </div>
  );
}

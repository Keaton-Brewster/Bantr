import { useEffect } from "react";
import styled from "styled-components";

function SingleMessage({
  //PROPS
  //================================================================================
  data,
  handleRightClick,
  index,
  className,
}) {
  //STATE
  //================================================================================
  const [message, messages] = data;

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!message.fromMe) return;
    const thisElement = document.getElementById(`message_${index}`);
    thisElement.addEventListener("contextmenu", (e) => {
      handleRightClick(e, thisElement);
    });

    return () =>
      thisElement.removeEventListener("contextmenu", handleRightClick);
  });

  //COMPONENT
  //================================================================================
  return (
    <div
      id={`message_${index}`}
      className={`my-1 d-flex flex-column ${className} ${
        message.fromMe ? "align-self-end align-items-end" : "align-items-start"
      }`}
    >
      <div
        className={`message round-border px-2 py-1 ${
          message.fromMe ? "messageFromMe" : "messageToMe"
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

export default styled(SingleMessage)`
  > div.message {
    overflow-wrap: break-word;
    white-space: break-spaces;
    transition: background 0s linear;
    background-color: ${({ data }) => (data[0].fromMe ? "#6ab71c" : "#e9e9e9")};
    color: ${({ data }) => (data[0].fromMe ? "#fefffb" : "#232425")};
  }
`;

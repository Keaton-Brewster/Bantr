import { AiOutlineInfoCircle } from "react-icons/ai";

export default function MessagesTopMenu({ conversationName }) {
  return (
    <div id="messagesTopMenu" className="flex-row justify-content-center">
      <span>
        {conversationName ? conversationName : "Untitled Conversation"}
      </span>
      <AiOutlineInfoCircle id="messageInfoButton" />
    </div>
  );
}

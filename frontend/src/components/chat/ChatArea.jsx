import { useEffect, useRef } from "react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";

function ChatArea() {
  const {
    selectedUser,
    messages,
    isMessagesLoading,
    setSelectedUser,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = ({ text, image }) => {
    // This will be wired to the store's sendMessage later
    console.log("Send message:", { text, image });
  };

  // No user selected state
  if (!selectedUser) {
    return <NoChatSelected />;
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />

      <MessageList
        messages={messages}
        isMessagesLoading={isMessagesLoading}
        authUser={authUser}
        ref={messagesEndRef}
      />

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatArea;

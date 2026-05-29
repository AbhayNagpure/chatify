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
    isSoundEnabled,
    getMessagesByUserId,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(messages.length);

  // Auto-scroll to bottom on new messages and play notification sound
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    if (messages.length > prevMessagesLength.current && isSoundEnabled) {
      const audio = new Audio('/sounds/notification.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
    prevMessagesLength.current = messages.length;
  }, [messages, isSoundEnabled]);

  const handleSendMessage = ({ text, image }) => {
    // This will be wired to the store's sendMessage later
    console.log("Send message:", { text, image });
  };

  // Fetch messages when a user is selected
  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser?._id, getMessagesByUserId]);

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

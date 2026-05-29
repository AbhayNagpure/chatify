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
    sendMessage,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(messages.length);

  // Auto-scroll to bottom on new messages and play notification sound
  useEffect(() => {
    const isNewMessage = messages.length > prevMessagesLength.current;

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: isNewMessage && prevMessagesLength.current > 0 ? "smooth" : "auto" 
      });
    }, 50);
    
    if (isNewMessage && isSoundEnabled) {
      const audio = new Audio('/sounds/notification.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
    prevMessagesLength.current = messages.length;
  }, [messages, isSoundEnabled]);

  const handleSendMessage = async ({ text, image }) => {
    try {
      await sendMessage({ text, image });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
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
        selectedUser={selectedUser}
        ref={messagesEndRef}
      />

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default ChatArea;

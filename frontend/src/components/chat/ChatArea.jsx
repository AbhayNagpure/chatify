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
    getMessagesByUserId,
    sendMessage,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(messages.length);

  // Auto-scroll to bottom on new messages and window resize (keyboard opening)
  useEffect(() => {
    const scrollToBottom = (behavior = "auto") => {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior });
      }, 50);
    };

    const isNewMessage = messages.length > prevMessagesLength.current;
    scrollToBottom(isNewMessage && prevMessagesLength.current > 0 ? "smooth" : "auto");
    prevMessagesLength.current = messages.length;

    // Handle mobile keyboard opening
    const handleResize = () => scrollToBottom("auto");
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [messages]);

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
        onlineUsers={onlineUsers}
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

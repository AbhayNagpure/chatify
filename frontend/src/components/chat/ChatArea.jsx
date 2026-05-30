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
    subscribeToMessage,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  const messagesEndRef = useRef(null);
  const prevMessagesLength = useRef(messages.length);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const isNewMessage = messages.length > prevMessagesLength.current;

    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: isNewMessage && prevMessagesLength.current > 0 ? "smooth" : "auto" 
      });
    }, 50);
    
    prevMessagesLength.current = messages.length;
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
      subscribeToMessage();
    }
    return () => {
      unsubscribeFromMessages();
    };
  }, [selectedUser?._id, getMessagesByUserId, subscribeToMessage, unsubscribeFromMessages]);

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

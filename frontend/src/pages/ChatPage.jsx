import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/chat/Sidebar";
import ChatArea from "../components/chat/ChatArea";

function ChatPage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex items-center justify-center min-h-screen p-2 sm:p-4 lg:p-6">
      {/* Main Chat Container */}
      <div className="flex w-full max-w-[1200px] h-[calc(100vh-2rem)] sm:h-[calc(100vh-3rem)] bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_60px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Sidebar */}
        <div
          className={`w-full lg:w-[320px] lg:min-w-[320px] flex-shrink-0 ${
            selectedUser ? "hidden lg:flex lg:flex-col" : "flex flex-col"
          }`}
        >
          <Sidebar />
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 min-w-0 ${
            selectedUser ? "flex flex-col" : "hidden lg:flex lg:flex-col"
          }`}
        >
          <ChatArea />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
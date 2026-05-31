import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/chat/Sidebar";
import ChatArea from "../components/chat/ChatArea";

function ChatPage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex items-center justify-center h-[100dvh] p-0 sm:p-4 lg:p-6 overflow-hidden">
      {/* Main Chat Container */}
      <div className="flex w-full h-full max-w-[1200px] sm:h-[calc(100dvh-2rem)] lg:h-[calc(100dvh-3rem)] bg-slate-900/60 backdrop-blur-2xl rounded-none sm:rounded-2xl border-0 sm:border border-white/10 shadow-[0_0_60px_-12px_rgba(0,0,0,0.6)] overflow-hidden">
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
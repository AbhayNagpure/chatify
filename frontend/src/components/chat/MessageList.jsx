import { forwardRef } from "react";

const MessageList = forwardRef(
  ({ messages, isMessagesLoading, authUser, selectedUser }, ref) => {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex flex-col scrollbar-thin">
        {isMessagesLoading ? (
          <div className="flex items-center justify-center h-full flex-1">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
              <span className="text-xs text-slate-500">
                Loading messages...
              </span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full flex-1 gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-800/40 border border-slate-700/20 flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <p className="text-sm text-slate-500 text-center">
              No messages yet. Say hello!
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1"></div>
            <div className="space-y-4 w-full">
              {messages.map((message) => {
                console.log("Message:", message, "AuthUser:", authUser);
                const isOwn = String(message.senderId) === String(authUser?._id);
                const profilePic = isOwn ? authUser?.profilePic : selectedUser?.profilePic;

                return (
                  <div key={message._id} className={`chat ${isOwn ? "chat-end" : "chat-start"}`}>
                    <div className="chat-image avatar">
                      <div className="w-9 h-9 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-slate-300 overflow-hidden">
                        <img src={profilePic || "/avatar.png"} alt="profile" className="object-cover w-full h-full" />
                      </div>
                    </div>
                    <div
                      className={`chat-bubble flex flex-col ${
                        isOwn
                          ? "bg-orange-600 text-white"
                          : "bg-slate-700 text-slate-50"
                      }`}
                    >
                      {message.image && (
                        
                        <img
                          src={message.image}
                          alt="attachment"
                          className="max-w-[200px] sm:max-w-xs rounded-xl mb-2 border border-white/10"
                        />
                        
                        
                        
                      )}
                      {message.text && (
                        <p className="text-sm leading-relaxed break-words">
                          {message.text}
                        </p>
                        
                      )}
                      <div className="chat-header">
                        <time className="text-[10px] opacity-50 text-slate-130">
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
        <div ref={ref} className="mt-4" />
      </div>
    );
  }
);

MessageList.displayName = "MessageList";

export default MessageList;

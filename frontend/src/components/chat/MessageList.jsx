import { forwardRef } from "react";

const MessageList = forwardRef(
  ({ messages, isMessagesLoading, authUser }, ref) => {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {isMessagesLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
              <span className="text-xs text-slate-500">
                Loading messages...
              </span>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2">
            <div className="w-12 h-12 rounded-xl bg-slate-800/40 border border-slate-700/20 flex items-center justify-center">
              <span className="text-2xl">👋</span>
            </div>
            <p className="text-sm text-slate-500 text-center">
              No messages yet. Say hello!
            </p>
          </div>
        ) : (
          messages.map((message) => {
            const isOwn = message.senderId === authUser?._id;
            return (
              <div
                key={message._id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-[65%] px-3.5 py-2.5 rounded-2xl ${
                    isOwn
                      ? "bg-orange-600 text-white rounded-br-md"
                      : "bg-slate-800/60 text-slate-100 border border-slate-700/30 rounded-bl-md"
                  }`}
                >
                  {/* Image */}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="attachment"
                      className="max-w-full rounded-xl mb-2 border border-white/5"
                    />
                  )}

                  {/* Text */}
                  {message.text && (
                    <p className="text-sm leading-relaxed break-words">
                      {message.text}
                    </p>
                  )}

                  {/* Timestamp */}
                  <p
                    className={`text-[10px] mt-1 ${
                      isOwn ? "text-orange-200/60" : "text-slate-500"
                    } text-right`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={ref} />
      </div>
    );
  }
);

MessageList.displayName = "MessageList";

export default MessageList;

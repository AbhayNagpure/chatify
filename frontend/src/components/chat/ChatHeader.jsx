import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";

function ChatHeader({ selectedUser, setSelectedUser, onlineUsers }) {
  const isOnline = onlineUsers?.includes(selectedUser._id);

  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5 bg-slate-900/30 backdrop-blur-md flex-shrink-0 z-10">
      {/* Back button on mobile */}
      <button
        onClick={() => setSelectedUser(null)}
        className="flex items-center justify-center w-8 h-8 rounded-lg lg:hidden text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {/* User Info */}
      <div className="flex items-center flex-1 gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-sm font-bold text-white overflow-hidden ring-2 ring-slate-700/50">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-slate-900"></div>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white leading-tight">
            {selectedUser.fullName}
          </h3>
          <p className="text-[11px] text-slate-500">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-1">
        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
          <Phone className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
          <Video className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;

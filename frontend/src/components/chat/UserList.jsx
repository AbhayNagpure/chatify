import { User } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";

function UserList({
  isUsersLoading,
  filteredUsers,
  searchQuery,
  activeTab,
  selectedUser,
  setSelectedUser,
  onlineUsers,
}) {
  const { unreadMessages } = useChatStore();

  return (
    <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-thin">
      {isUsersLoading ? (
        <div className="flex flex-col items-center justify-center h-32 gap-2">
          <div className="w-6 h-6 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
          <span className="text-xs text-slate-500">Loading...</span>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-32 gap-2">
          <User className="w-8 h-8 text-slate-700" />
          <span className="text-xs text-slate-500">
            {searchQuery
              ? "No users found"
              : activeTab === "chat"
              ? "No conversations yet"
              : "No contacts found"}
          </span>
        </div>
      ) : (
        filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-200 group ${
              selectedUser?._id === user._id
                ? "bg-orange-600/15 border border-orange-500/20"
                : "hover:bg-slate-800/40 border border-transparent"
            }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-sm font-bold text-white overflow-hidden ring-2 ring-slate-700/50">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online indicator - placeholder */}
              {onlineUsers?.includes(user._id) && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900"></div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-center gap-1">
                <p
                  className={`text-sm font-medium truncate ${
                    selectedUser?._id === user._id
                      ? "text-orange-300"
                      : "text-white group-hover:text-slate-100"
                  }`}
                >
                  {user.fullName}
                </p>
                {unreadMessages[user._id] > 0 && (
                  <span className="bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">
                    {unreadMessages[user._id]} new message{unreadMessages[user._id] > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                {user.lastMessage || "Start a conversation"}
              </p>
            </div>
          </button>
        ))
      )}
    </div>
  );
}

export default UserList;

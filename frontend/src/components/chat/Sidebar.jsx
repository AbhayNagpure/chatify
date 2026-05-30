import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import SidebarHeader from "./SidebarHeader";
import UserList from "./UserList";

function Sidebar() {
  const {
    allContacts,
    chats,
    activeTab,
    selectedUser,
    isUsersLoading,
    setActiveTab,
    setSelectedUser,
    getAllContacts,
    getMyChatPartners,
  } = useChatStore();

  const { authUser, logout, onlineUsers } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (activeTab === "chat") {
      getMyChatPartners();
    } else {
      getAllContacts();
    }
  }, [activeTab, getMyChatPartners, getAllContacts]);

  const displayedUsers = activeTab === "chat" ? chats : allContacts;

  const filteredUsers = displayedUsers.filter((user) =>
    user.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full border-r border-white/5">
      <SidebarHeader
        authUser={authUser}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <UserList
        isUsersLoading={isUsersLoading}
        filteredUsers={filteredUsers}
        searchQuery={searchQuery}
        activeTab={activeTab}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        onlineUsers={onlineUsers}
      />

      {/* Logout Button */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={logout}
          className="flex items-center justify-center w-full gap-2 py-2.5 text-xs font-semibold text-red-400 transition-all bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 hover:text-red-300 active:scale-[0.98]"
        >
          <LogOut className="w-3.5 h-3.5" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;

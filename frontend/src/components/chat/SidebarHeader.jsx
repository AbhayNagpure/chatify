import { useRef} from "react";
import { Users, MessageCircle, Search, Camera, Loader2 } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

function SidebarHeader({
  authUser,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}) {
  const { updateProfile, isUpdatingProfile } = useAuthStore();
  const fileInputRef = useRef(null);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="p-4 pb-3">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white tracking-tight">Chatify</h2>
        <div className="flex items-center gap-2">
          {/* User Avatar */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-slate-800/50">
            <div 
              className="relative w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-orange-500 to-emerald-500 flex items-center justify-center text-[12px] font-bold text-white overflow-hidden cursor-pointer group ring-1 ring-white/10 hover:ring-orange-500/50 transition-all"
              onClick={() => fileInputRef.current?.click()}
            >
              {isUpdatingProfile ? (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Camera className="w-3.5 h-3.5 text-white/90" />
                </div>
              )}
              
              {authUser?.profilePic ? (
                <img
                  src={authUser.profilePic}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                authUser?.fullName?.charAt(0)?.toUpperCase() || "U"
              )}
            </div>

            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept="image/*"
              onChange={handleImageUpload} 
              disabled={isUpdatingProfile}
            />

            <span className="text-xs text-slate-300 font-medium hidden sm:block max-w-[80px] truncate">
              {authUser?.fullName}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 p-1 rounded-xl bg-slate-950/60 border border-slate-700/30">
        <button
          onClick={() => setActiveTab("chat")}
          className={`flex items-center justify-center gap-1.5 flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
            activeTab === "chat"
              ? "bg-orange-600 text-white shadow-[0_0_12px_-2px_rgba(249,115,22,0.4)]"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          Chats
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center justify-center gap-1.5 flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
            activeTab === "contacts"
              ? "bg-orange-600 text-white shadow-[0_0_12px_-2px_rgba(249,115,22,0.4)]"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Contacts
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mt-3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-2 pl-9 pr-3 text-xs text-white bg-slate-950/50 border border-slate-700/30 rounded-lg focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/30 focus:outline-none placeholder:text-slate-600 transition-all"
        />
      </div>
    </div>
  );
}

export default SidebarHeader;

import { useAuthStore } from "../store/userAuthStore";

function ChatPage() {
  const { logout } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white ">
      <h1 className="mb-4 text-2xl font-bold">ChatPage</h1>
      <button 
        onClick={logout}
        className="px-4 py-2 font-bold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-500"
      >
        Logout
      </button>
    </div>
  )
}

export default ChatPage
import { Route, Routes, Navigate} from "react-router"
import ChatPage from "./pages/ChatPage.jsx"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { useEffect } from "react"
import { useAuthStore } from "./store/useAuthStore.js"
import { useChatStore } from "./store/useChatStore.js"
import PageLoader from "./components/PageLoader.jsx"
import { Toaster } from "react-hot-toast"

function App() {

  const {checkAuth, isCheckingAuth, authUser} = useAuthStore()
  const { isSoundEnabled } = useChatStore()

  useEffect(() => {
    checkAuth();
    
  }, [checkAuth])

  useEffect(() => {
    const handleMouseClick = () => {
      if (!isSoundEnabled) return;
      const audio = new Audio('/sounds/mouse-click.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed:", e));
    };
    
    document.addEventListener('mousedown', handleMouseClick);
    return () => document.removeEventListener('mousedown', handleMouseClick);
  }, [isSoundEnabled])

  console.log(authUser);

  if(isCheckingAuth) return <PageLoader />

  return ( 

    <div className="min-h-screen relative w-full bg-slate-950 text-white">
      {/* Modern Dark Grid Colored Background */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]">
        {/* Top-left Orange Glow */}
        <div className="absolute top-[-200px] left-[-200px] -z-10 h-[500px] w-[500px] rounded-full bg-orange-600 opacity-20 blur-[120px]"></div>
        {/* Bottom-right Green Glow */}
        <div className="absolute bottom-[-200px] right-[-200px] -z-10 h-[500px] w-[500px] rounded-full bg-emerald-600 opacity-20 blur-[120px]"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen">
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} /> } />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}  />
        </Routes>
      </div>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export default App
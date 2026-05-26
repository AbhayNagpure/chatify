import { Route, Routes } from "react-router"
import ChatPage from "./pages/ChatPage.jsx"
import LoginPage from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage"
import { useAuthStore } from "./store/userAuthStore.js"

function App() {

  const {authUser,  isLoading} = useAuthStore();

  console.log("auth user: ", authUser);
  console.log("isLoggedIn: ", isLoading);

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
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
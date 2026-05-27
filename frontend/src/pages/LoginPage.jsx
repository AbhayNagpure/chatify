import { useState } from "react";
import { Link } from "react-router";
import { Mail, Lock, MessageSquare, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/userAuthStore";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6">
      {/* Main Container */}
      <div className="flex flex-col-reverse lg:flex-row w-full max-w-[1000px] bg-slate-900/60 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden">
        
        {/* Left Form Section */}
        <div className="flex flex-col justify-center w-full p-6 sm:p-8 lg:w-1/2 lg:px-12 lg:py-10">
          <div className="w-full max-w-md mx-auto">
            
            {/* Header */}
            <div className="flex flex-col items-center mb-6 text-center lg:items-start lg:text-left">
              <div className="p-2 mb-3 bg-orange-500/20 rounded-xl ring-1 ring-orange-500/50">
                <MessageSquare className="w-6 h-6 text-orange-500" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">
                Welcome Back
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">
                Login to your account
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              
              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="w-4 h-4 text-slate-500" />
                  </div>
                  <input
                    type="email"
                    required
                    className="w-full py-2.5 pl-11 pr-4 text-sm text-white transition-all bg-slate-950/50 border border-slate-700/50 rounded-xl focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 focus:outline-none placeholder:text-slate-600"
                    placeholder="johndoe@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="w-4 h-4 text-slate-500" />
                  </div>
                  <input
                    type="password"
                    required
                    className="w-full py-2.5 pl-11 pr-4 text-sm text-white transition-all bg-slate-950/50 border border-slate-700/50 rounded-xl focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 focus:outline-none placeholder:text-slate-600"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="flex items-center justify-center w-full py-2.5 text-sm font-bold text-white transition-all shadow-[0_0_15px_-3px_rgba(249,115,22,0.4)] rounded-xl bg-orange-600 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-900 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            {/* Signup Link */}
            <div className="flex justify-center mt-5 lg:justify-start">
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-medium transition-colors border text-orange-500 bg-orange-500/10 border-orange-500/20 rounded-lg hover:bg-orange-500/20 hover:text-orange-400"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Right Illustration Section */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-8 bg-slate-800/30 border-l border-white/5 relative overflow-hidden">
          
          {/* Soft background glow behind image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[250px] h-[250px] bg-orange-500/20 blur-[90px] rounded-full"></div>
            <div className="w-[150px] h-[150px] bg-emerald-500/10 blur-[60px] rounded-full absolute bottom-10 right-10"></div>
          </div>

          {/* 3D Illustration */}
          <div className="relative z-10 w-full max-w-[280px] mb-8 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out">
            <img 
              src="/signup_illustration.png" 
              alt="Chat Illustration" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Features Text */}
          <div className="text-center z-10">
            <h3 className="mb-4 text-lg font-medium tracking-wide text-white drop-shadow-sm">
              Welcome Back to Chatify
            </h3>
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-slate-900/60 text-orange-400 border border-orange-500/30 shadow-sm backdrop-blur-md">
                Fast
              </span>
              <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-slate-900/60 text-orange-400 border border-orange-500/30 shadow-sm backdrop-blur-md">
                Secure
              </span>
              <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-slate-900/60 text-orange-400 border border-orange-500/30 shadow-sm backdrop-blur-md">
                Reliable
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
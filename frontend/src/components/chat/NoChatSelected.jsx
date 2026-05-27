import { MessageCircle } from "lucide-react";

function NoChatSelected() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full">
      {/* Animated Illustration */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-slate-800/50 border border-slate-700/30 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-1.5">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-slate-700/80 animate-pulse"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "2s",
                }}
              ></div>
            ))}
          </div>
        </div>
        {/* Glow */}
        <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-orange-500/10 blur-xl -z-10"></div>
      </div>

      <h3 className="text-lg font-semibold text-white mb-1.5">
        Welcome to Chatify
      </h3>
      <p className="text-sm text-slate-500 text-center max-w-[260px]">
        Select a conversation from the sidebar to start chatting
      </p>

      {/* Quick stats */}
      <div className="flex gap-3 mt-6">
        <div className="px-3 py-1.5 text-[11px] font-medium rounded-full bg-slate-800/40 text-slate-400 border border-slate-700/20">
          End-to-end encrypted
        </div>
        <div className="px-3 py-1.5 text-[11px] font-medium rounded-full bg-slate-800/40 text-slate-400 border border-slate-700/20">
          Real-time messaging
        </div>
      </div>
    </div>
  );
}

export default NoChatSelected;

import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
// import { io } from "socket.io-client"; // UNCOMMENT once socket.io-client is installed

const BASE_URL = "http://localhost:3000"; // Ensure this matches your backend URL

export const useSocketStore = create((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: () => {
    const { authUser } = useAuthStore.getState();
    if (!authUser || get().socket?.connected) return;

    console.log("Socket connection logic is prepared. Install socket.io-client and uncomment the connection code in useSocketStore.js");

    /* // --- UNCOMMENT AFTER INSTALLING socket.io-client ---
    const socket = io(BASE_URL, {
      query: { userId: authUser._id }
    });
    
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
    */
  },

  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
      set({ socket: null });
    }
  },
}));

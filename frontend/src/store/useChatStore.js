import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";



export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    unreadMessages: {},
    activeTab: "chat",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (selectedUser) => {
        set({selectedUser});
        // Clear unread messages for this user when selected
        if (selectedUser) {
            const { unreadMessages } = get();
            if (unreadMessages[selectedUser._id]) {
                const newUnread = { ...unreadMessages };
                delete newUnread[selectedUser._id];
                set({ unreadMessages: newUnread });
            }
        }
    },

    getAllContacts: async() => {
        set({isUsersLoading: true});
        try {
            const allContacts = await axiosInstance.get("/messages/contacts");
            set({allContacts: allContacts.data});
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading: false})
        }
    },
    getMyChatPartners: async() => {
        set({isUsersLoading: true});
        try {
            const chatPartners = await axiosInstance.get("/messages/chats");
            set({chats: chatPartners.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading: false})
        }
    },

    getMessagesByUserId: async(userId) => {
        set({isMessagesLoading: true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading: false})
        }   
    },

    sendMessage: async(messageData) => {
        const { selectedUser, messages } = get();
       
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            set({messages: [...messages, res.data]});
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
        }
    },

    subscribeToMessage: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        
        // Remove existing listener to prevent duplicates
        socket.off("newMessage");

        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === get().selectedUser?._id;
            
            if(get().isSoundEnabled){
                const notificationSound = new Audio("/sounds/notification.mp3");
                notificationSound.currentTime = 0; //reset to start 
                notificationSound.play().catch((e) => console.log("Audio play failed:", e));
            }

            if(isMessageSentFromSelectedUser) {
                const currentMessages = get().messages;
                set({messages: [...currentMessages, newMessage]});
            } else {
                // Add to unread messages
                const { unreadMessages } = get();
                const count = unreadMessages[newMessage.senderId] || 0;
                set({ unreadMessages: { ...unreadMessages, [newMessage.senderId]: count + 1 } });
            }
        })
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) socket.off("newMessage");
    }


}))
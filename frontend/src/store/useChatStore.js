import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chat",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === true,

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({ isSoundEnabled: !get().isSoundEnabled })
    },

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (selectedUser) => set({selectedUser}),

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
    }

}))
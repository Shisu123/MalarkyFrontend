import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    usersLoading: false,
    messagesLoading: false,

    getUsers: async () => {
        set({ usersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            {/* Keep all previous messages, and add last one to end */}
            set({messages: [...messages, res.data]})
        } catch (error) {
            toast.error(error.response.data.messages);
        }
    },

    getMessages: async (userId) => {
        set({ messagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data);
        } finally {
            set({ messagesLoading: false });
        }
    },

    listenToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        // Connect socket to server & listen for new messages
        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (newMessage) => {
            // If message is not from selected user, do nothing
            if (!newMessage.senderId !== selectedUser._id) return;

            set({ messages: [...get().messages, newMessage] });
        });
    },

    unlistenMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => { set({ selectedUser }) }
}));
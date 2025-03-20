import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

// Allows us to destructure authUser so that 
// we can verify user is logged in & authenticated.
export const useAuthStore = create((set, get) => ({
    authUser: null,
    signingUp: false,   // Helps change "Create Account" button to "Signing up..."
    loggingIn: false,
    updatingProfile: false,

    isCheckingAuth: true,
    onlineUsers: [],

    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); // Builds on top of baseURL
            set({ authUser: res.data });

            // Connect socket to server
            get().connectSocket();
        } catch (error) {
            console.log("ERROR [useAuthStore.js]: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ signingUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data); // Redirects to signup page

            set({ authUser: res.data });
            toast.success("Account created successfully!");

            // Connect socket to server
            get().connectSocket();  
        } catch (error) {
            toast.error(error.response.data);
        } finally {
            set({ signingUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);    // Redirects to login page

            set({ authUser: res.data });
            toast.success("Logged in successfully");

            
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");    // Redirects to login page
            
            set({ authUser: null });
            toast.success("Logged out successfully!");

            // Disconnect socket from server
            get().disconnectSocket();
        } catch (error) {
            toast.error("ERROR [useAuthStore.js]: ", error.response.data);
        }
    },

    updateProfile: async (data) => {
        set({ updatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        const { authUser } = get();

        // If user is not logged in or socket is 
        // already connected, don't connect socket.
        if (!authUser || get().socket?.connected) return;

        // Connect socket to server
        const socket = io(baseUrl,  {
            query: {
                userId: authUser._id,    
            },
        });
        
        socket.connect();
        set({ socket:socket });

        socket.on("onlineUsers", (usersIds) => {
            set({ onlineUsers: usersIds });
        })
    },

    disconnectSocket: () => {
        // Disconnect socket from server
        if(get().socket?.connected) get().socket.disconnect();
    }
}));
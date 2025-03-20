import { useChatStore } from "../store/useChatStore";
import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, usersLoading } = useChatStore(); // Call useChatStore hook to access selectedUser

    {/* Call useAuthStore hook to access & display onlineUsers */ }
    const { onlineUsers } = useAuthStore()
    const [onlineOnly, setOnlineOnly] = useState(false);

    // Fetch users when the component mounts
    useEffect(() => {
        getUsers();
    }, [getUsers])

    {/* Filter users based on online status */ }
    const filteredUsers = onlineOnly ?
        users.filter(user => onlineUsers.includes(user._id))
        :
        users;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                {/* Display online status filter */}
                <div className="flex items-center gap-2 mt-3">
                    <div className="mt-3 hidden lg:flex items-center gap-2">
                        <label className="cursor-pointer flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={onlineOnly}
                                onChange={(e) => setOnlineOnly(e.target.checked)}
                                className="checkbox checkbox-sm"
                            />
                            <span className="text-sm">Show online only</span>
                        </label>
                        <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
                    </div>
                </div>
                <div className="overflow-y-auto w-full py-3">
                    {filteredUsers.map((user) => (
                        <button
                            key={user._id}
                            onClick={() => setSelectedUser(user)}   // Updates selectedUser state
                            className={`
                            w-full p-3 flex items-center gap-3
                            hover:bg-base-200 hover:rounded-lg transition-all duration-200
                            ${selectedUser?._id === user._id ? "bg-base-300 rounded-lg ring-1 ring-base-300" : ""}    
                            `}

                        >
                            <div className="relative mx-auto lg:mx-0">
                                <img
                                    src={user.profilePicture || "/vite.svg"}
                                    alt={user.name}
                                    className="rounded-full w-12 h-12"
                                />
                                {onlineUsers.includes(user._id) && (
                                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 
                                        rounded-full border-2 border-base-100"
                                    />
                                )}
                            </div>

                            {/* User info */}
                            <div className="hidden lg:block text-left min-w-0">
                                <div className="font-medium truncate">{user.fullName}</div>
                                <div className={`text-sm truncate ${onlineUsers.includes(user._id) ? "text-green-500" : "text-base-content/70"}`}>
                                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                                </div>
                            </div>

                        </button>

                    ))}

                    {filteredUsers.length === 0 && (
                        <div className="text-center text-base-300 mt-5">
                            No online users found
                        </div>
                    )}

                </div>
            </div>
        </aside>
    )
}
export default Sidebar;

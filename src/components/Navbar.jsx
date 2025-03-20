import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, User, MessageSquare } from "lucide-react";

const NavBar = () => {
    const { logout, authUser } = useAuthStore();
    const location = useLocation();
    const isProfilePage = location.pathname === "/profile";

    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-10 
        backdrop:-blur-lg bg-base-100/90">
            {/* container */}
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* left side */}
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-8">
                        <Link to="/" className="flex items-center gap-2">
                            <img 
                                src="/public/MalarkyLogo.png" 
                                alt="Malarky Logo" 
                                className="h-[125px] w-auto object-contain"
                            />
                        </Link>
                    </div>
                </div>
                {/* right side */}
                <div className="flex items-center gap-2">
                    {/* Profile/Chats toggle button */}
                    {authUser && (
                        <>
                            <Link 
                                to={isProfilePage ? "/" : "/profile"} 
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-base-200 transition-colors duration-200"
                            >
                                {isProfilePage ? (
                                    <>
                                        <MessageSquare className="size-5" />
                                        <span className="hidden sm:inline">Chats</span>
                                    </>
                                ) : (
                                    <>
                                        <User className="size-5" />
                                        <span className="hidden sm:inline">Profile</span>
                                    </>
                                )}
                            </Link>

                            {/* Logout button */}
                            <button 
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-base-200 transition-colors duration-200" 
                                onClick={logout}
                            >
                                <LogOut className="size-5" />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
};

export default NavBar;
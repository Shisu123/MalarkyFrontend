import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react"

const ProfilePage = () => {
    const { authUser, updatingProfile, updateProfile } = useAuthStore();
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async (e) => {
        console.log("[ProfilePage]: starting handleImageUpload");
        const file = e.target.files[0];
        if (!file) return;
    
        console.log("[ProfilePage]: Summoning Reader");
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onload = async () => {
          const base64Image = reader.result;
          setSelectedImage(base64Image);
          console.log("reader results: ", base64Image);
          console.log("[handleImageUpload]: UPDATING PROFILE PICTURE");
          await updateProfile({ profilePicture: base64Image });
        };
      };

    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">

                {/* Profile card (Grey box surrounding profile section) */}
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    {/* Profile section */}
                    <div className="text-center">
                        <h1 className="text-4xl font-semibold">Profile Info</h1>
                    </div>

                    {/* Avator upload section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImage || authUser.profilePicture || "/vite.svg"}
                                alt="Profile"
                                className="size-32 rounded-xl object-cover border-4 border-black "
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`
                                    absolute top-0 right-0 
                                    bg-base-content hover:scale-105
                                    p-2 rounded-full cursor-pointer group
                                    transition-all duration-200
                                    ${updatingProfile ? "animate-pulse pointer-events-none" : ""}
                                `}
                            >
                                {/* Tooltip */}
                                <div
                                    className="absolute -top-10 right-0 bg-gray-700 text-white text-xs px-3 py-1 rounded-md opacity-0 
                                        transition-opacity duration-200 group-hover:opacity-100 pointer-events-none"
                                >
                                    Change Picture
                                </div>
                                    
                                <Camera className="w-5 h-5 text-base-200" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={updatingProfile}
                                />
                            </label>
                        </div>

                        <div className="flex justify-between gap-8">

                            {/* Profile info */}
                            <div className="space-y-6">
                                {/* Full Name */}
                                <div className="space-y-1.5">
                                    <div className="text-lg text-zinc-400 flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        Full Name
                                    </div>
                                    <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser.fullName}</p>
                                </div>
                                {/* Email Address */}
                                <div className="space-y-1.5">
                                    <div className="text-lg text-zinc-400 flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        Email Address
                                    </div>
                                    <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
                                </div>
                            </div>

                            {/* Account Information */}
                            <div className="mt-6 bg-base-300 rounded-xl p-6">
                                <h2 className="text-lg font-medium mb-4">Account Information</h2>
                                <div className="space-y-3 text-lg">
                                    <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                        <span>Joined Since:</span>
                                        <span>{authUser.createdAt?.split("T")[0]}</span>
                                    </div>
                                    <div className="flex items-center justify-betwen py-2">
                                        <span>Account Status:</span>
                                        <span className="text-green-500">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProfilePage;

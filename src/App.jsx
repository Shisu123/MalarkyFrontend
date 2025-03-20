import NavBar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

//import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, checkingAuth, onlineUsers } = useAuthStore(); // Destructure authUser and checkAuth from useAuthStore
  useEffect(() => { checkAuth() }, [checkAuth]);  // Check if user is authenticated

  console.log({ onlineUsers });

  // If checkingAuth is true and authUser is false, display loading text
  if (checkingAuth && !authUser) {
    return <div className="flex justify-center items-center h-screen">Loading, please wait</div>
  }

  return (
    <div>
      <NavBar />  {/* Always render Navbar component */}

      {/* Defines routes to each page via react-router-dom */}
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      </Routes>

      <Toaster />
    </div>
  )
};
export default App;
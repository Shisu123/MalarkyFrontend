import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { signup, SigningUp } = useAuthStore();

    // Lets user know if they filled out form incorrectly
    const validateForm = () => {
        if (!formData.fullName.trim()) {
            return toast.error("Full name is required");
        }
        if (!formData.email.trim()) {
            return toast.error("Email is required");
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return toast.error("Email is invalid");
        }
        if (!formData.password.trim()) {
            return toast.error("Password is required");
        }
        if (formData.password.length < 3) {
            return toast.error("Password must be at least 6 characters");
        }

        return true;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const successful = validateForm();
        if (successful === true) signup(formData);
    };

    return <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Sign up form */}
        <h1 className="text-3xl font-bold">Welcome to Malarkey!</h1>
        <p className="text-gray-500">Create an account</p>
        <br />

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
                <label className="input input-bordered flex items-center gap-2">
                    Name
                    <input
                        type="text"
                        className={"grow"}
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                </label>
            </div>

            {/* Email */}
            <div className="form-control">
                <label className="input input-bordered flex items-center gap-2">
                    Email
                    <input
                        type="text"
                        className={"grow"}
                        placeholder="test@site.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </label>
            </div>

            {/* Password */}
            <div className="form-control">
                <label className="input input-bordered flex items-center gap-2">
                    Password
                    <input
                        type={showPassword ? "text" : "password"}
                        className="grow"
                        placeholder="******"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                    >

                    </button>
                </label>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={SigningUp}
            >
                {SigningUp ? "Signing up..." : "Sign up"}
            </button>
        </form>
        <div className="text-center">
            <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                    Log in
                </Link>
            </p>
        </div>
    </div >
};
export default SignupPage;
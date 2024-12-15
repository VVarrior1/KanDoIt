"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "signup",
          email,
          password,
          firstName,
          lastName,
          phoneNum,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // On success, navigate to the home page
        router.push("/home");
      } else {
        setErrorMessage(data.message || "An error occurred during signup.");
      }

      localStorage.setItem("email", email);

    } catch (error) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 sm:p-10">
        {/* Main Content Container */}
        <div className="flex flex-col space-y-6">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Email Input */}
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent transition-all"
                required
              />
            </div>

            {/* First Name */}
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                placeholder="Phone number"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative flex flex-col space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative flex flex-col space-y-2">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-sm text-center">{errorMessage}</div>
            )}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-xl 
                       hover:bg-blue-600 transition-colors focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Sign In Link */}
            <div className="text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link
                href="/signin"
                className="text-blue-500 hover:text-blue-600 transition-colors font-medium"
              >
                Sign in
              </Link>
            </div>
          </form>

          {/* Logo and Copyright */}
          <div className="flex flex-col items-center space-y-4 mt-8">
            <Link
              href="/"
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center
                       transition-all duration-200 ease-in-out
                       hover:bg-gray-200 hover:shadow-md
                       focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <span className="text-2xl font-bold">K</span>
            </Link>
            <p className="text-sm text-gray-500">© KanDoIt 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}


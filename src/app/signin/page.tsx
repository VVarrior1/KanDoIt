"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Login failed.");
        return;
      }

      const { token } = await response.json();
      localStorage.setItem("authToken", token);
      localStorage.setItem("email", email);

      router.push("/home");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 sm:p-10">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Email or phone number"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative flex flex-col space-y-2">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all"></div>
                </div>
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#4169E1] text-white font-medium rounded-full transition-all duration-200 hover:bg-[#3658c7]"
            >
              Sign in
            </button>
            <div className="text-center pt-2">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                href="/signup"
                className="text-[#4169E1] hover:text-[#3658c7] transition-colors font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
          <div className="flex flex-col items-center space-y-4 mt-8">
            <Link
              href="/"
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
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

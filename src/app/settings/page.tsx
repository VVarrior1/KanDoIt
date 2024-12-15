"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
  // State for managing user profile form fields and error handling
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  // Fetch user data 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userEmail =  localStorage.getItem("email"); 

        const response = await fetch(`/api/users?email=${userEmail}`);
        const data = await response.json();

        if (response.ok) {
          const { user } = data;
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setEmail(user.email);
          setPhoneNum(user.phoneNum);
        } else {
          setErrorMessage(data.message || "Failed to load user profile.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching user profile.");
      }
    };

    fetchUserProfile();
  }, []);

  // Handle password update 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMessage(""); 

    try {
      // API call to update password
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Password updated successfully.");
      } else {
        setErrorMessage(data.message || "Failed to update password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the password.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage(""); // Clear any previous error messages

    try {
      const response = await fetch("/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phoneNum,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully.");
        setIsEditing(false); // Exit edit mode after successful update
      } else {
        setErrorMessage(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 sm:p-10">
        {/* Main Content Container */}
        <div className="flex flex-col space-y-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

          {/* User Name Section */}
          <div className="flex flex-col space-y-2">
            <h2 className="text-2xl font-semibold text-gray-700">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </>
              ) : (
                <>
                  {firstName} {lastName}
                </>
              )}
            </h2>
            <p className="text-gray-500">{email}</p>
            <p className="text-gray-500">
              {isEditing ? (
                <input
                  type="text"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  placeholder="Phone number"
                  className="w-full px-4 py-2 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                phoneNum
              )}
            </p>
          </div>

          {/* Edit Profile Button */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
                className="w-full py-3 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
            >
                  {isEditing ? "Save Profile" : "Edit Profile"}

            </button>

            {/* Update Profile Form */}
            {isEditing && (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
                >
                  {loading ? "Updating..." : "Submit Update"}
                </button>
              </form>
            )}

            {/* Change Password Section */}
            <h3 className="text-lg text-gray-500 mt-8">Change Password</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* New Password Input */}
              <div className="relative flex flex-col space-y-2">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div className="relative flex flex-col space-y-2">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="text-red-500 text-sm text-center">{errorMessage}</div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-4"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>

          {/* Logo and Copyright */}
          <div className="flex flex-col items-center space-y-4 mt-auto pt-8">
            <Link
              href="/"
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-gray-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              {/* Logo */}
              <span className="text-2xl font-bold">K</span>
            </Link>
            <p className="text-sm text-gray-500">© KanDoIt 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
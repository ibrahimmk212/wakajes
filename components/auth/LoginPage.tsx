// src/components/auth/LoginPage.tsx
"use client";

import React, { useState } from "react";
import { logInUser } from "@/app/actions"; // Import the Server Action
import { User, Lock, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tab, setTab] = useState<"author" | "admin">("author");

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");

    // Add the user type to the form data before submission
    formData.append("userType", tab);

    // Call the Server Action
    const result = await logInUser(formData);

    if (result.success) {
      // 🎯 Success: Redirect user based on their role (handled by Server Action or subsequent redirect)
      window.location.href = result.redirectTo || "/dashboard";
    } else {
      setErrorMessage(
        result.message || "Login failed. Please check your credentials."
      );
    }

    setIsSubmitting(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border-t-4 border-blue-600">
        {/* Header */}
        <div className="p-8 text-center">
          <User size={36} className="text-blue-600 mx-auto mb-3" />
          <h1 className="text-3xl font-bold text-gray-800">Secure Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            Access your author, reviewer, or administrative portal.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setTab("author")}
            className={`flex-1 py-3 text-lg font-semibold transition ${
              tab === "author"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Author/Reviewer Login
          </button>
          <button
            onClick={() => setTab("admin")}
            className={`flex-1 py-3 text-lg font-semibold transition ${
              tab === "admin"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Admin Access
          </button>
        </div>

        <form action={handleSubmit} className="p-8 space-y-6">
          {errorMessage && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          {/* Email/Username Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email / Username
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                id="email"
                name="email"
                required
                placeholder="Enter your registered email"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isSubmitting ? "Verifying..." : "Log In"}
            <ArrowRight size={18} />
          </button>

          {/* Forgotten Password Link */}
          <div className="text-center text-sm">
            <a
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

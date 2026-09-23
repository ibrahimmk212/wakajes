import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string).trim().toLowerCase();
    const password = formData.get("password") as string;

    const targetAdminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

    try {
      // 1. Try Supabase Auth if configured
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!error && data.session) {
          localStorage.setItem("wakajes_admin_auth", "true");
          localStorage.setItem("wakajes_admin_email", email);
          navigate("/dashboard");
          return;
        }
      }

      // 2. Direct Admin Credential Verification (Default Editorial Board Access)
      const allowedEmails = ["wakajes1986@gmail.com", "admin@wakajes.com", "editor@wakajes.com", "admin"];
      const isAllowedEmail = allowedEmails.some((addr) => email.includes(addr));

      if (isAllowedEmail || password === targetAdminPassword || password === "wakajes2026" || password === "admin123") {
        localStorage.setItem("wakajes_admin_auth", "true");
        localStorage.setItem("wakajes_admin_email", email || "wakajes1986@gmail.com");
        navigate("/dashboard");
      } else {
        setErrorMessage("Invalid email or password. Please verify your administrative credentials.");
      }
    } catch (err: any) {
      setErrorMessage("Authentication error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 border-[#133e27]">
        {/* Header with WAKAJES Logo */}
        <div className="bg-[#133e27] p-8 text-center text-white relative">
          <img
            src="/images/logo.png"
            alt="WAKAJES Logo"
            className="w-20 h-20 mx-auto mb-3 object-contain drop-shadow-md bg-white/10 rounded-full p-2"
          />
          <span className="inline-block bg-[#d4af37] text-[#133e27] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
            Editorial Board & Staff Only
          </span>
          <h1 className="text-2xl font-extrabold text-white">WAKAJES Admin Portal</h1>
          <p className="text-emerald-100 text-xs mt-1">
            Waka Journal of Educational Studies • Vol. 4 No. 3
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-xl text-xs font-medium">
              {errorMessage}
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-950 space-y-1">
            <p className="font-bold text-amber-900 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#133e27]" /> Default Editorial Credentials:
            </p>
            <p>Email: <code className="font-mono text-[#133e27] bg-amber-100 px-1 rounded">wakajes1986@gmail.com</code></p>
            <p>Password: <code className="font-mono text-[#133e27] bg-amber-100 px-1 rounded">admin123</code> or <code className="font-mono text-[#133e27] bg-amber-100 px-1 rounded">wakajes2026</code></p>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                id="email"
                name="email"
                required
                defaultValue="wakajes1986@gmail.com"
                placeholder="wakajes1986@gmail.com"
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl text-sm focus:ring-[#133e27] focus:border-[#133e27]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
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
                defaultValue="admin123"
                placeholder="••••••••"
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl text-sm focus:ring-[#133e27] focus:border-[#133e27]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 bg-[#133e27] hover:bg-[#1e4d2b] text-white font-extrabold rounded-xl shadow-lg transition duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer text-sm"
          >
            <span>{isSubmitting ? "Authenticating..." : "Access Admin Dashboard"}</span>
            <ArrowRight size={18} />
          </button>

          <div className="text-center pt-2">
            <a href="/" className="text-xs text-[#133e27] hover:underline font-semibold">
              ← Return to WAKAJES Public Website
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}


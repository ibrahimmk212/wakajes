import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Banknote,
  Users,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("wakajes_admin_auth");
    localStorage.removeItem("wakajes_admin_email");
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "Submissions", href: "/dashboard/submissions", icon: FileText },
    { name: "Payment Verification", href: "/dashboard/payments", icon: Banknote },
    { name: "Board Management", href: "/dashboard/board", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-64 bg-[#133e27] text-white flex flex-col p-4 fixed h-full shadow-xl">
        <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-emerald-800">
          <img
            src="/images/logo.png"
            alt="WAKAJES Logo"
            className="w-10 h-10 object-contain bg-white/10 rounded-full p-1"
          />
          <div>
            <h1 className="text-base font-extrabold text-white leading-tight">WAKAJES</h1>
            <span className="text-[10px] text-amber-300 uppercase tracking-widest font-bold">
              Editorial Portal
            </span>
          </div>
        </div>

        <ul className="space-y-1.5 flex-grow">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.href}
                className="flex items-center p-3 rounded-xl hover:bg-[#1e4d2b] transition space-x-3 text-emerald-100 hover:text-white text-sm font-semibold"
              >
                <item.icon size={18} className="text-[#d4af37]" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="pt-4 border-t border-emerald-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-2.5 rounded-lg text-emerald-200 hover:bg-[#1e4d2b] transition space-x-2 text-xs font-medium"
          >
            <ExternalLink size={16} />
            <span>View Public Website</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center p-2.5 rounded-lg text-red-300 hover:bg-red-900/50 hover:text-white transition space-x-2 cursor-pointer w-full text-left text-xs font-semibold"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}


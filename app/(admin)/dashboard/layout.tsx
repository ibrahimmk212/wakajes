// app/(admin)/layout.tsx (The container for all admin views)
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Banknote,
  Users,
  LogOut,
} from "lucide-react";

const AdminSidebar = () => {
  const navItems = [
    { name: "Dashboard Home", href: "/dashboard", icon: LayoutDashboard },
    { name: "Submissions", href: "/dashboard/submissions", icon: FileText },
    { name: "Payments", href: "/dashboard/payments", icon: Banknote },
    { name: "Board Management", href: "/dashboard/board", icon: Users },
  ];

  return (
    <nav className="w-64 bg-gray-800 text-white flex flex-col p-4 fixed h-full">
      <h1 className="text-2xl font-bold mb-8 text-blue-400">IJASSW Admin</h1>
      <ul className="space-y-2 flex-grow">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition space-x-3"
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Logout functionality placeholder */}
      <button className="flex items-center p-3 rounded-lg text-red-400 hover:bg-gray-700 transition space-x-3">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  );
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {/* ml-64 shifts the content to the right, away from the fixed sidebar */}
        {children}
      </main>
    </div>
  );
}

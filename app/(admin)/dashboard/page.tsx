/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(admin)/dashboard/page.tsx (Server Component)
import { FileText, Banknote, Users, Clock } from "lucide-react";

const MetricCard = ({ title, value, icon: Icon, color }: any) => (
  <div
    className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-between border-l-4"
    style={{ borderColor: color }}
  >
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <Icon size={40} className={color} />
  </div>
);

export default async function AdminDashboardPage() {
  // 🎯 Fetching metrics securely on the server
  const metrics = {
    newSubmissions: 45,
    pendingPayments: 7500, // Total value in USD
    activeBoardMembers: 22,
    avgReviewTime: "8 days",
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="New Submissions"
          value={metrics.newSubmissions}
          icon={FileText}
          color="text-blue-500"
        />
        <MetricCard
          title="Pending Payments"
          value={`$${metrics.pendingPayments.toLocaleString()}`}
          icon={Banknote}
          color="text-yellow-500"
        />
        <MetricCard
          title="Active Board Members"
          value={metrics.activeBoardMembers}
          icon={Users}
          color="text-teal-500"
        />
        <MetricCard
          title="Avg. Review Time"
          value={metrics.avgReviewTime}
          icon={Clock}
          color="text-purple-500"
        />
      </div>

      {/* Quick Actions and Activity Logs (Placeholder) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Latest Submissions Awaiting Review
          </h2>
          {/* List of 5 latest submissions goes here */}
          <p className="text-gray-500">List populated via API call...</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Payment Verification Queue
          </h2>
          {/* List of 5 latest payments goes here */}
          <p className="text-gray-500">List populated via API call...</p>
        </div>
      </div>
    </div>
  );
}

// lib/admin-data.ts (Conceptual data fetching for the dashboard)
export async function getAdminDashboardMetrics() {
  // 🎯 Replace with actual database queries!
  return {
    newSubmissions: 45,
    pendingPayments: 7500, // Total value in USD
    activeBoardMembers: 22,
    avgReviewTime: "8 days",
  };
}

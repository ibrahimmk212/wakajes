/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/AnalyticsDashboard.tsx (Client Component)
"use client";

import React from "react";
import { JournalMetrics } from "../../lib/admin-data"; // Import type
import { FileText, CheckCircle, Clock, Users, Zap } from "lucide-react";

interface AnalyticsDashboardProps {
  metrics: {
    totalSubmissionsYTD: number;
    activeSubmissions: number;
    acceptedRate: number;
    averageReviewTimeDays: number;
    reviewersCount: number;
    submissionsByMonth: { month: string; count: number }[];
    statusDistribution: { status: string; count: number }[];
  };
}

// Simple Bar Chart Placeholder (In a real app, use Chart.js, Recharts, etc.)
const SubmissionsChart = ({ data }: any) => (
  <div className="p-4 bg-white rounded-xl shadow-inner">
    <h3 className="text-lg font-semibold mb-3 text-gray-800">
      Submissions Trend (Monthly)
    </h3>
    <div className="h-48 flex items-end space-x-2 border-l border-b border-gray-300 pl-1 pt-2">
      {data.map((item: { month: string; count: number }, index: number) => (
        <div
          key={index}
          className="flex flex-col items-center justify-end h-full"
        >
          <div
            title={`${item.month}: ${item.count}`}
            className="w-4 bg-blue-500 rounded-t-sm hover:bg-blue-600 transition"
            style={{ height: `${(item.count / 25) * 100}%` }}
          />
          <span className="text-xs mt-1 text-gray-500">{item.month}</span>
        </div>
      ))}
    </div>
    <p className="text-xs text-center pt-2 text-gray-500">
      Total YTD:{" "}
      {data.reduce(
        (sum: number, item: { count: number }) => sum + item.count,
        0
      )}
    </p>
  </div>
);

// Pie Chart Placeholder for Status Distribution
const StatusPieChart = ({ data }: any) => {
  const total = data.reduce(
    (sum: number, item: { count: number }) => sum + item.count,
    0
  );

  // Quick and dirty way to visualize distribution without a real library
  const getStatusColor = (status: string) => {
    if (status.includes("Review")) return "bg-yellow-500";
    if (status.includes("Accepted")) return "bg-green-600";
    if (status.includes("Rejected")) return "bg-red-600";
    return "bg-gray-400";
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-inner">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Submission Status Distribution (Active/YTD)
      </h3>
      <div className="space-y-3">
        {data.map((item: { status: string; count: number }, index: number) => (
          <div key={index}>
            <div className="flex justify-between text-sm">
              <span className="font-medium">{item.status}</span>
              <span>
                {item.count} ({((item.count / total) * 100).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className={`${getStatusColor(
                  item.status
                )} h-2 rounded-full transition-all duration-700`}
                style={{ width: `${(item.count / total) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-center pt-3 text-gray-500">
        Total tracked: {total}
      </p>
    </div>
  );
};

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ metrics }) => {
  return (
    <div className="space-y-8">
      {/* 1. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1: Total Submissions */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Total Submissions (YTD)
            </p>
            <FileText size={24} className="text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {metrics.totalSubmissionsYTD}
          </p>
        </div>

        {/* Card 2: Acceptance Rate */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Acceptance Rate (YTD)
            </p>
            <CheckCircle size={24} className="text-green-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {metrics.acceptedRate}%
          </p>
        </div>

        {/* Card 3: Avg Review Time */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Avg. Review Time
            </p>
            <Clock size={24} className="text-purple-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {metrics.averageReviewTimeDays} days
          </p>
        </div>

        {/* Card 4: Reviewers Count */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">
              Active Reviewers
            </p>
            <Users size={24} className="text-orange-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {metrics.reviewersCount}
          </p>
        </div>
      </div>

      {/* 2. Charts and Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SubmissionsChart data={metrics.submissionsByMonth} />
        <StatusPieChart data={metrics.statusDistribution} />
      </div>

      {/* 3. Actionable Insights */}
      <div className="p-6 bg-yellow-50 border-l-4 border-yellow-600 rounded-lg flex space-x-3 shadow-md">
        <Zap size={20} className="text-yellow-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-yellow-800">
            Actionable Insight
          </h3>
          <p className="text-sm text-yellow-700">
            The current **Acceptance Rate ({metrics.acceptedRate}%)** is within
            the target range of 25-35%. The **Average Review Time (
            {metrics.averageReviewTimeDays} days)** is above the target of 45
            days, indicating potential bottlenecks in the peer-review assignment
            process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

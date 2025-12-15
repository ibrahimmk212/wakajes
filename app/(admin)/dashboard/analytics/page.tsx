// app/(admin)/dashboard/analytics/page.tsx (Server Component)
// import { getJournalMetrics } from "@/lib/admin-data";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import { BarChart3, Clock, TrendingUp, Users } from "lucide-react";

// Conceptual Data Structure (Add to lib/admin-data.ts)
interface JournalMetrics {
  totalSubmissionsYTD: number;
  activeSubmissions: number;
  acceptedRate: number; // percentage, e.g., 25.5
  averageReviewTimeDays: number;
  reviewersCount: number;
  submissionsByMonth: { month: string; count: number }[];
  statusDistribution: { status: string; count: number }[];
}

export async function getJournalMetrics(): Promise<JournalMetrics> {
  // 🎯 Replace with actual secure database aggregation queries!
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    totalSubmissionsYTD: 185,
    activeSubmissions: 42,
    acceptedRate: 28.5,
    averageReviewTimeDays: 52,
    reviewersCount: 55,
    submissionsByMonth: [
      { month: "Jan", count: 12 },
      { month: "Feb", count: 15 },
      { month: "Mar", count: 20 },
      { month: "Apr", count: 18 },
      { month: "May", count: 17 },
      { month: "Jun", count: 22 },
      { month: "Jul", count: 15 },
      { month: "Aug", count: 16 },
      { month: "Sep", count: 10 },
      { month: "Oct", count: 20 },
      { month: "Nov", count: 15 },
      { month: "Dec", count: 5 }, // YTD total: 185
    ],
    statusDistribution: [
      { status: "In Review", count: 25 },
      { status: "Revision Requested", count: 8 },
      { status: "Awaiting Decision", count: 9 },
      { status: "Accepted (YTD)", count: 52 },
      { status: "Rejected (YTD)", count: 133 },
    ],
  };
}

export default async function AdminAnalyticsPage() {
  const metrics = await getJournalMetrics();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center">
        <BarChart3 size={28} className="mr-2 text-blue-600" /> Analytics &
        Reporting
      </h1>
      <p className="text-gray-600">
        Key metrics for journal performance, submission volume, and workflow
        efficiency.
      </p>

      <AnalyticsDashboard metrics={metrics} />
    </div>
  );
}

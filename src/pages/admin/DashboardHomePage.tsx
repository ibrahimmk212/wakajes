import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, CreditCard, Users, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../../lib/supabaseClient";

const MetricCard = ({ title, value, subtitle, icon: Icon, color }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-xl bg-emerald-50 text-[#133e27]`}>
        <Icon size={28} />
      </div>
    </div>
  </div>
);

export default function DashboardHomePage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSubmissions() {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from("submissions")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && Array.isArray(data)) {
          setSubmissions(data);
          setLoading(false);
          return;
        }
      }
      setSubmissions([]);
      setLoading(false);
    }
    loadSubmissions();
  }, []);

  const totalSubmissions = submissions.length;
  const pendingPayments = submissions.filter((s) => s.payment_status === "Pending").length;
  const activeBoardMembers = 5;

  return (
    <div className="space-y-8">
      <div>
        <span className="inline-block bg-[#d4af37] text-[#133e27] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
          WAKAJES Vol. 4 No. 3 Portal
        </span>
        <h1 className="text-3xl font-extrabold text-[#133e27]">Executive Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Waka Journal of Educational Studies • College of Education, Waka-Biu
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Submissions"
          value={totalSubmissions}
          subtitle="Vol. 4 No. 3 Edition"
          icon={FileText}
        />
        <MetricCard
          title="Pending Payments"
          value={pendingPayments}
          subtitle="₦10,000 Vetting Fee Queue"
          icon={CreditCard}
        />
        <MetricCard
          title="Editorial Board"
          value={activeBoardMembers}
          subtitle="Active Members"
          icon={Users}
        />
        <MetricCard
          title="Avg. Review Time"
          value="7–14 Days"
          subtitle="Standard Peer Review"
          icon={Clock}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions Panel */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-[#133e27]">
              Recent Manuscripts Awaiting Review
            </h2>
            <Link
              to="/dashboard/submissions"
              className="text-xs font-bold text-[#133e27] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <p className="text-xs text-gray-500 py-6 text-center">Loading submissions...</p>
          ) : submissions.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <CheckCircle2 size={32} className="mx-auto text-emerald-600 mb-2" />
              <p className="text-sm font-bold text-gray-700">No Manuscripts Submitted Yet</p>
              <p className="text-xs text-gray-500 max-w-sm mx-auto mt-1">
                New submissions from authors will automatically appear here once submitted.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {submissions.slice(0, 5).map((sub: any) => (
                <div key={sub.id} className="py-3 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#133e27] block">{sub.paper_ref}</span>
                    <p className="font-semibold text-gray-800 line-clamp-1">{sub.title}</p>
                    <p className="text-gray-500">by {sub.authors}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200 font-semibold rounded-full">
                    {sub.status || "New"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Payment Queue Panel */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <h2 className="text-lg font-bold text-[#133e27]">
              Payment Queue
            </h2>
            <Link
              to="/dashboard/payments"
              className="text-xs font-bold text-[#133e27] hover:underline flex items-center gap-1"
            >
              <span>Verify</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1 mb-4">
            <p className="font-bold text-amber-900">Official Vetting Account:</p>
            <p>UBA Account: <strong>1012453666</strong></p>
            <p>Fee per Paper: <strong>₦10,000</strong></p>
          </div>

          {submissions.filter((s) => s.payment_receipt_url).length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">No pending payment receipts in queue.</p>
          ) : (
            <div className="space-y-2">
              {submissions
                .filter((s) => s.payment_receipt_url)
                .slice(0, 4)
                .map((item: any) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-lg text-xs flex justify-between items-center">
                    <div>
                      <p className="font-mono font-bold text-[#133e27]">{item.paper_ref}</p>
                      <p className="text-gray-600 truncate max-w-[150px]">{item.authors}</p>
                    </div>
                    <span className="font-bold text-emerald-800">₦10,000</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


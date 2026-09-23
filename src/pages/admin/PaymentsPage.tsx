import React, { useEffect, useState } from "react";
import PaymentReviewTable from "../../../components/admin/PaymentReviewTable";
import { supabase, isSupabaseConfigured } from "../../../lib/supabaseClient";
import { CreditCard, CheckCircle, Clock, AlertCircle, RefreshCw } from "lucide-react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPayments = async () => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        const mapped = data.map((item: any, idx: number) => ({
          id: item.id || idx + 1,
          paperRef: item.paper_ref || `WAKAJES-2026-${idx + 100}`,
          refNumber: item.paper_ref || `WAKAJES-2026-${idx + 100}`,
          payerName: item.authors,
          title: item.title,
          email: item.email,
          mobileNumber: item.mobile_number,
          amount: 10000,
          slipUrl: item.payment_receipt_url || "",
          status: item.payment_status || "Pending",
          created_at: item.created_at,
        }));
        setPayments(mapped);
        setLoading(false);
        return;
      }
    }

    setPayments([]);
    setLoading(false);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  const totalPaymentsCount = payments.length;
  const verifiedCount = payments.filter((p) => p.status === "Verified" || p.status === "Approved").length;
  const pendingCount = payments.filter((p) => p.status === "Pending").length;
  const totalVerifiedRevenue = verifiedCount * 10000;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <span className="inline-block bg-[#d4af37] text-[#133e27] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
            Vetting Fee Management • Vol. 4 No. 3
          </span>
          <h1 className="text-3xl font-extrabold text-[#133e27]">Payment Verification</h1>
          <p className="text-gray-500 text-sm mt-1">
            Review, inspect transfer slips, and verify author ₦10,000 vetting fee payments.
          </p>
        </div>

        <button
          onClick={loadPayments}
          className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-[#133e27] font-bold px-4 py-2.5 rounded-xl border border-emerald-200 transition text-xs cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {/* Official Bank Info Notice */}
      <div className="bg-[#133e27] text-white p-6 rounded-2xl shadow-md flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#d4af37] text-[#133e27] rounded-xl">
            <CreditCard size={24} />
          </div>
          <div>
            <span className="text-[10px] text-amber-300 uppercase tracking-widest font-black block">
              Official Receiving Account
            </span>
            <p className="text-lg font-extrabold text-white">United Bank for Africa (UBA)</p>
            <p className="text-xs text-emerald-100">
              Account Name: <strong>WAKA JOURNAL OF EDUCATIONAL STUDIES</strong>
            </p>
          </div>
        </div>

        <div className="bg-white/10 px-5 py-3 rounded-xl border border-white/20 text-right">
          <span className="text-[10px] text-amber-200 uppercase tracking-widest block font-bold">
            Vetting Fee Rate
          </span>
          <span className="text-2xl font-black text-amber-300 font-mono">₦10,000</span>
          <span className="text-[10px] text-emerald-100 block">per manuscript</span>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Revenue Verified</p>
            <p className="text-2xl font-black text-emerald-800 mt-1 font-mono">
              ₦{totalVerifiedRevenue.toLocaleString()}
            </p>
            <p className="text-[11px] text-gray-400 mt-0.5">{verifiedCount} payments cleared</p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Verification</p>
            <p className="text-2xl font-black text-amber-900 mt-1 font-mono">{pendingCount}</p>
            <p className="text-[11px] text-amber-700 mt-0.5">Awaiting editorial review</p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-800 rounded-xl">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Receipts Logged</p>
            <p className="text-2xl font-black text-gray-900 mt-1 font-mono">{totalPaymentsCount}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">Vol. 4 No. 3 Edition</p>
          </div>
          <div className="p-3 bg-gray-100 text-gray-700 rounded-xl">
            <AlertCircle size={24} />
          </div>
        </div>
      </div>

      {/* Main Table */}
      <PaymentReviewTable initialPayments={payments} onRefresh={loadPayments} />
    </div>
  );
}


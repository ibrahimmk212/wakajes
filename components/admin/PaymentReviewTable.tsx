import React, { useState, useMemo } from "react";
import { Check, X, File, ExternalLink, Search, Eye, Download, ShieldCheck, ShieldAlert } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

interface PaymentReviewTableProps {
  initialPayments: any[];
  onRefresh?: () => void;
}

export default function PaymentReviewTable({ initialPayments, onRefresh }: PaymentReviewTableProps) {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [previewReceiptUrl, setPreviewReceiptUrl] = useState<string | null>(null);

  // Sync state if parent initialPayments changes
  React.useEffect(() => {
    setPayments(initialPayments);
  }, [initialPayments]);

  const handleStatusUpdate = async (id: string | number, newStatus: string) => {
    if (isSupabaseConfigured && supabase) {
      await supabase
        .from("submissions")
        .update({ payment_status: newStatus })
        .eq("id", id);
    }

    setPayments(
      payments.map((p: any) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    if (onRefresh) onRefresh();
  };

  const filteredPayments = useMemo(() => {
    return payments.filter((item: any) => {
      const matchesSearch =
        (item.paperRef || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.payerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.title || "").toLowerCase().includes(searchTerm.toLowerCase());

      const isVerified = item.status === "Verified" || item.status === "Approved";
      const matchesStatus =
        filterStatus === "All" ||
        (filterStatus === "Verified" && isVerified) ||
        (filterStatus === "Pending" && item.status === "Pending") ||
        (filterStatus === "Rejected" && item.status === "Rejected");

      return matchesSearch && matchesStatus;
    });
  }, [payments, searchTerm, filterStatus]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Search and Filters Header */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-1.5">
          {["All", "Pending", "Verified", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`py-1.5 px-3.5 rounded-full text-xs font-bold transition cursor-pointer ${
                filterStatus === status
                  ? "bg-[#133e27] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search Ref, Payer, or Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2.5 pl-9 border border-gray-300 rounded-xl text-xs focus:ring-[#133e27] focus:border-[#133e27]"
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#133e27] text-white">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Paper Ref
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Author / Payer
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Vetting Fee
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Proof Receipt
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3.5 text-center text-xs font-bold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-500 text-xs">
                  No payment receipts recorded in this queue yet.
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment: any) => {
                const isVerified = payment.status === "Approved" || payment.status === "Verified";
                const isRejected = payment.status === "Rejected";

                return (
                  <tr
                    key={payment.id}
                    className={
                      isVerified
                        ? "bg-emerald-50/40 hover:bg-emerald-50/70 transition"
                        : isRejected
                        ? "bg-red-50/30 hover:bg-red-50/50 transition"
                        : "hover:bg-amber-50/30 transition"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-[#133e27]">
                      {payment.paperRef}
                    </td>

                    <td className="px-6 py-4 text-gray-900 max-w-xs">
                      <p className="font-bold text-gray-800">{payment.payerName}</p>
                      {payment.title && (
                        <p className="text-xs text-gray-500 truncate" title={payment.title}>
                          {payment.title}
                        </p>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-bold text-emerald-800 font-mono">
                      ₦{(payment.amount || 10000).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.slipUrl && payment.slipUrl !== "#" ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setPreviewReceiptUrl(payment.slipUrl)}
                            className="inline-flex items-center gap-1 text-xs bg-emerald-100 hover:bg-emerald-200 text-[#133e27] font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
                          >
                            <Eye size={14} />
                            <span>Preview</span>
                          </button>
                          <a
                            href={payment.slipUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition"
                            title="Open in new tab"
                          >
                            <ExternalLink size={14} />
                          </a>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic flex items-center gap-1">
                          <File size={14} /> No receipt attached
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs font-extrabold rounded-full ${
                          isVerified
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : isRejected
                            ? "bg-red-100 text-red-800 border border-red-300"
                            : "bg-amber-100 text-amber-900 border border-amber-300"
                        }`}
                      >
                        {isVerified ? "Verified" : isRejected ? "Rejected" : "Pending"}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                      {!isVerified && (
                        <button
                          onClick={() => handleStatusUpdate(payment.id, "Verified")}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg transition cursor-pointer inline-flex items-center gap-1 shadow-sm"
                          title="Mark Payment as Verified"
                        >
                          <Check size={14} />
                          <span>Verify</span>
                        </button>
                      )}

                      {!isRejected && (
                        <button
                          onClick={() => handleStatusUpdate(payment.id, "Rejected")}
                          className="bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs px-3 py-1.5 rounded-lg transition cursor-pointer inline-flex items-center gap-1"
                          title="Reject Payment"
                        >
                          <X size={14} />
                          <span>Reject</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Receipt Lightbox Modal */}
      {previewReceiptUrl && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 relative border-t-4 border-[#133e27]">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-[#133e27] text-lg flex items-center gap-2">
                <File size={20} className="text-[#d4af37]" />
                Attached Payment Receipt Preview
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={previewReceiptUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-50 text-[#133e27] font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition inline-flex items-center gap-1"
                >
                  <Download size={14} /> Download
                </a>
                <button
                  onClick={() => setPreviewReceiptUrl(null)}
                  className="p-1.5 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="max-h-[70vh] overflow-y-auto flex justify-center bg-gray-900/5 p-4 rounded-xl border border-gray-200">
              {previewReceiptUrl.endsWith(".pdf") ? (
                <iframe
                  src={previewReceiptUrl}
                  className="w-full h-[500px] rounded-lg border-0"
                  title="Payment Receipt PDF"
                ></iframe>
              ) : (
                <img
                  src={previewReceiptUrl}
                  alt="Payment Receipt Slip"
                  className="max-w-full max-h-[500px] object-contain rounded-lg shadow-md"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



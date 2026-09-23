import React, { useState, useMemo } from "react";
import { Download, UserPlus, Edit, CheckCircle } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

const statusColors: { [key: string]: string } = {
  New: "bg-blue-100 text-blue-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Minor Revision": "bg-orange-100 text-orange-800",
  "Major Revision": "bg-red-100 text-red-800",
  Accepted: "bg-[#133e27] text-white",
  Rejected: "bg-gray-200 text-gray-700",
};

// Component for Reviewer Assignment
const ReviewerAssignmentModal = ({ paper, onClose, onAssign }: any) => {
  const [reviewerName, setReviewerName] = useState("");

  const availableReviewers = [
    "Dr. Mercy B. Wakawa (Editor-in-Chief)",
    "Dr. Mohammed Hamman Barka (Secretary Ag.)",
    "Dr. Habib Hassan (Editorial Member)",
    "Mr. Mohammed Y. Tong (Editorial Member)",
    "Mr. James B. Ayuba (Editorial Member)",
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (reviewerName) {
      onAssign(paper.id, reviewerName);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 border-t-4 border-[#133e27]">
        <h3 className="text-xl font-extrabold mb-2 text-[#133e27]">
          Assign Reviewer to {paper.paperRef}
        </h3>
        <p className="text-xs text-gray-600 mb-6 italic">&quot;{paper.title}&quot;</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Select WAKAJES Editorial Member
            </label>
            <select
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-xl text-sm bg-white"
            >
              <option value="">-- Choose Board Reviewer --</option>
              {availableReviewers.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 bg-[#133e27] text-white font-bold rounded-xl hover:bg-[#1e4d2b] transition text-sm cursor-pointer"
            >
              Assign Reviewer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SubmissionTable = ({ initialSubmissions }: any) => {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<any>(null);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub: any) => {
      const matchesStatus =
        filterStatus === "All" || sub.status === filterStatus;
      const matchesSearch =
        (sub.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.authorName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.paperRef || "").toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [submissions, filterStatus, searchTerm]);

  const handleAssignReviewer = async (paperId: any, reviewerName: any) => {
    if (isSupabaseConfigured && supabase) {
      await supabase
        .from("submissions")
        .update({ status: "Under Review" })
        .eq("id", paperId);
    }

    setSubmissions(
      submissions.map((sub: any) => {
        if (sub.id === paperId) {
          if (!sub.reviewer1)
            return { ...sub, reviewer1: reviewerName, status: "Under Review" };
          if (!sub.reviewer2)
            return { ...sub, reviewer2: reviewerName, status: "Under Review" };
        }
        return sub;
      })
    );
    setIsAssigning(false);
  };

  const handleStatusChange = async (paperId: any, newStatus: string) => {
    if (isSupabaseConfigured && supabase) {
      await supabase
        .from("submissions")
        .update({ status: newStatus })
        .eq("id", paperId);
    }

    setSubmissions(
      submissions.map((sub: any) =>
        sub.id === paperId ? { ...sub, status: newStatus } : sub
      )
    );
  };

  const StatusBadge = ({ status }: any) => (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
        statusColors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );

  const statusOptions = ["All", ...Object.keys(statusColors)];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6">
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-1.5">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`py-1.5 px-3 rounded-full text-xs font-bold transition cursor-pointer ${
                filterStatus === status
                  ? "bg-[#133e27] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by Ref, Title, or Author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2.5 border border-gray-300 rounded-xl text-xs w-full md:w-72 focus:ring-[#133e27] focus:border-[#133e27]"
        />
      </div>

      {/* Submissions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#133e27] text-white">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Ref Code
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Title / Author(s)
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Submission Date
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Reviewers
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
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((sub: any) => (
                <tr key={sub.id} className="hover:bg-emerald-50/40 transition">
                  <td className="px-6 py-4 whitespace-nowrap font-mono font-bold text-[#133e27]">
                    {sub.paperRef}
                  </td>
                  <td className="px-6 py-4 text-gray-900 max-w-xs">
                    <p className="font-semibold line-clamp-2" title={sub.title}>
                      {sub.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">by {sub.authorName}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {sub.submittedDate}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-700">
                    <p>
                      {sub.reviewer1 ? `1: ${sub.reviewer1}` : "1: Unassigned"}
                    </p>
                    <p className="text-gray-400 mt-0.5">
                      {sub.reviewer2 ? `2: ${sub.reviewer2}` : "2: Unassigned"}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    {sub.fileUrl && sub.fileUrl !== "#" ? (
                      <a
                        href={sub.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Download Manuscript"
                        className="text-[#133e27] hover:text-emerald-900 p-2 rounded-full hover:bg-emerald-100 inline-block"
                      >
                        <Download size={18} />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 italic">No File</span>
                    )}

                    {(!sub.reviewer1 || !sub.reviewer2) && (
                      <button
                        onClick={() => {
                          setSelectedPaper(sub);
                          setIsAssigning(true);
                        }}
                        title="Assign Board Reviewer"
                        className="text-amber-600 hover:text-amber-800 p-2 rounded-full hover:bg-amber-100 transition inline-block cursor-pointer"
                      >
                        <UserPlus size={18} />
                      </button>
                    )}

                    <select
                      value={sub.status}
                      onChange={(e) => handleStatusChange(sub.id, e.target.value)}
                      className="text-xs p-1 border rounded bg-gray-50 font-semibold cursor-pointer"
                    >
                      <option value="New">New</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Minor Revision">Minor Revision</option>
                      <option value="Major Revision">Major Revision</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500 text-xs">
                  No submissions recorded yet. New author submissions will automatically load here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isAssigning && selectedPaper && (
        <ReviewerAssignmentModal
          paper={selectedPaper}
          onClose={() => setIsAssigning(false)}
          onAssign={handleAssignReviewer}
        />
      )}
    </div>
  );
};
export default SubmissionTable;


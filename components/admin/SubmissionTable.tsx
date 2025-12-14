/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/SubmissionTable.tsx (Client Component)
"use client";

import React, { useState, useMemo } from "react";
import { Download, UserPlus, Edit } from "lucide-react";

const statusColors: { [key: string]: string } = {
  New: "bg-blue-100 text-blue-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Minor Revision": "bg-orange-100 text-orange-800",
  "Major Revision": "bg-red-100 text-red-800",
  Accepted: "bg-green-100 text-green-800",
  Rejected: "bg-gray-200 text-gray-700",
};

// Conceptual Component for Reviewer Assignment
const ReviewerAssignmentModal = ({ paper, onClose, onAssign }: any) => {
  const [reviewerName, setReviewerName] = useState("");

  const availableReviewers = [
    "Dr. Abdul",
    "Prof. Kim",
    "Dr. Rossi",
    "Dr. Velez",
    "Dr. Adams",
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (reviewerName) {
      // Note: In a real app, you would assign to reviewer1, then reviewer2, etc.
      onAssign(paper.id, reviewerName);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Assign Reviewer to {paper.paperRef}
        </h3>
        <p className="text-sm text-gray-600 mb-6">&quot;{paper.title}&quot;</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Reviewer
            </label>
            <select
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="">-- Choose Reviewer --</option>
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
              className="py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
  const [selectedPaper, setSelectedPaper] = useState(null);

  // --- Filtering Logic ---
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub: any) => {
      const matchesStatus =
        filterStatus === "All" || sub.status === filterStatus;
      const matchesSearch =
        sub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.paperRef.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [submissions, filterStatus, searchTerm]);

  // --- Action Handlers ---
  const handleAssignReviewer = (paperId: any, reviewerName: any) => {
    // 🎯 In a real app, call the Server Action here:
    // assignReviewer(paperId, reviewerName);

    // Optimistically update the UI:
    setSubmissions(
      submissions.map((sub: any) => {
        if (sub.id === paperId) {
          // Determine which reviewer slot to fill
          const newStatus = sub.status === "New" ? "Under Review" : sub.status;
          if (!sub.reviewer1)
            return { ...sub, reviewer1: reviewerName, status: newStatus };
          if (!sub.reviewer2)
            return { ...sub, reviewer2: reviewerName, status: newStatus };
        }
        return sub;
      })
    );
    setIsAssigning(false);
  };

  const StatusBadge = ({ status }: any) => (
    <span
      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
        statusColors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );

  const statusOptions = ["All", ...Object.keys(statusColors)];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`py-2 px-3 rounded-full text-xs font-medium transition ${
                filterStatus === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search by Title or Author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full md:w-64"
        />
      </div>

      {/* Submissions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ref ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title / Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reviewers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((sub: any) => (
                <tr key={sub.id} className="hover:bg-blue-50/50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">
                    {sub.paperRef}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-sm">
                    <p className="font-semibold truncate" title={sub.title}>
                      {sub.title}
                    </p>
                    <p className="text-xs text-gray-500">by {sub.authorName}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sub.submittedDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <p className="text-xs">
                      {sub.reviewer1 ? `1: ${sub.reviewer1}` : "1: Unassigned"}
                    </p>
                    <p className="text-xs">
                      {sub.reviewer2 ? `2: ${sub.reviewer2}` : "2: Unassigned"}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={sub.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-1">
                    <a
                      href={sub.fileUrl}
                      target="_blank"
                      title="Download Manuscript"
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 inline-block"
                    >
                      <Download size={18} />
                    </a>
                    {/* Show Assign button only if not fully assigned */}
                    {(!sub.reviewer1 || !sub.reviewer2) &&
                      sub.status !== "Accepted" &&
                      sub.status !== "Rejected" && (
                        <button
                          onClick={() => {
                            setSelectedPaper(sub);
                            setIsAssigning(true);
                          }}
                          title="Assign Reviewers"
                          className="text-teal-500 hover:text-teal-700 p-2 rounded-full hover:bg-teal-100 transition inline-block"
                        >
                          <UserPlus size={18} />
                        </button>
                      )}
                    <button
                      onClick={() => alert(`Status change for ${sub.paperRef}`)}
                      title="Change Status"
                      className="text-purple-500 hover:text-purple-700 p-2 rounded-full hover:bg-purple-100 transition inline-block"
                    >
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  No submissions match your current filter and search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Reviewer Assignment Modal/Form */}
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

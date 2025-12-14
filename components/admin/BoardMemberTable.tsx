/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/BoardMemberTable.tsx (Client Component)
"use client";

import React, { useState, useMemo } from "react";
import {
  UserPlus,
  Edit,
  Trash2,
  ShieldCheck,
  ShieldOff,
  Search,
  ChevronDown,
} from "lucide-react";

// Helper component for adding/editing a member
const MemberFormModal = ({ member, onClose, onSubmit }: any) => {
  const [formData, setFormData] = useState({
    name: member?.name || "",
    title: member?.title || "",
    email: member?.email || "",
    role: member?.role || "Reviewer",
    active: member?.active ?? true,
  });

  const roles = [
    "Editorial Chief",
    "Associate Editor",
    "Section Editor",
    "Reviewer",
  ];

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(member?.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
          {member ? "Edit Member" : "Add New Member"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Full Name *
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Title (e.g., Prof., Dr.) *
              </span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              />
            </label>
          </div>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Email *</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Role *</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg bg-white"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Account Active (Can log in)
            </span>
          </label>

          <div className="flex justify-end space-x-3 pt-6">
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
              {member ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function BoardMemberTable({ initialMembers }: any) {
  const [members, setMembers] = useState(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // --- Data Processing ---
  const roles = [
    "All",
    "Editorial Chief",
    "Associate Editor",
    "Section Editor",
    "Reviewer",
  ];

  const filteredMembers = useMemo(() => {
    return members
      .filter((member: any) => {
        const matchesSearch =
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "All" || member.role === filterRole;
        return matchesSearch && matchesRole;
      })
      .sort((a: any, b: any) => {
        // Sort by role precedence for display
        return roles.indexOf(a.role) - roles.indexOf(b.role);
      });
  }, [members, searchTerm, filterRole]);

  // --- Server Action Handlers (Placeholders) ---
  const handleAddEdit = async (id: any, data: any) => {
    // 🎯 Call Server Action: addOrUpdateBoardMember(id, data);
    console.log(`Submitting member data: ID=${id}, Data:`, data);

    if (id) {
      // Edit existing
      setMembers(
        members.map((m: any) => (m.id === id ? { ...m, ...data } : m))
      );
    } else {
      // Add new
      const newMember = {
        ...data,
        id: Date.now(),
        joinedDate: new Date().toISOString().split("T")[0],
      };
      setMembers([newMember, ...members]);
    }
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleToggleActive = async (id: any, currentStatus: any) => {
    // 🎯 Call Server Action: toggleMemberStatus(id, !currentStatus);
    setMembers(
      members.map((m: any) =>
        m.id === id ? { ...m, active: !currentStatus } : m
      )
    );
  };

  const handleDelete = async (id: any) => {
    if (
      !confirm("Are you sure you want to permanently delete this board member?")
    )
      return;
    // 🎯 Call Server Action: deleteBoardMember(id);
    setMembers(members.filter((m: any) => m.id !== id));
  };

  // --- Render Logic ---
  const RoleBadge = ({ role }: any) => (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${
        role.includes("Chief")
          ? "bg-red-100 text-red-800"
          : role.includes("Editor")
          ? "bg-purple-100 text-purple-800"
          : "bg-teal-100 text-teal-800"
      }`}
    >
      {role}
    </span>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Filter & Add Button */}
        <div className="flex space-x-3 w-full md:w-auto justify-end">
          <div className="relative">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <button
            onClick={() => {
              setEditingMember(null);
              setIsModalOpen(true);
            }}
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center space-x-2"
          >
            <UserPlus size={20} /> Add New
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name / Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
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
            {filteredMembers.map((member: any) => (
              <tr
                key={member.id}
                className={!member.active ? "bg-gray-50 opacity-80" : ""}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <p className="font-semibold">
                    {member.title}. {member.name}
                  </p>
                  <p className="text-xs text-blue-600">{member.email}</p>
                  <p className="text-xs text-gray-500">
                    Joined: {member.joinedDate}
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RoleBadge role={member.role} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      member.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setEditingMember(member);
                      setIsModalOpen(true);
                    }}
                    title="Edit Member Details"
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleToggleActive(member.id, member.active)}
                    title={
                      member.active ? "Deactivate Account" : "Activate Account"
                    }
                    className={`${
                      member.active
                        ? "text-orange-500 hover:text-orange-700 hover:bg-orange-100"
                        : "text-green-500 hover:text-green-700 hover:bg-green-100"
                    } p-2 rounded-full transition`}
                  >
                    {member.active ? (
                      <ShieldOff size={18} />
                    ) : (
                      <ShieldCheck size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    title="Delete Member"
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <MemberFormModal
          member={editingMember}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddEdit}
        />
      )}
    </div>
  );
}

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
    title: member?.title || "Dr.",
    email: member?.email || "",
    role: member?.role || "Editorial Member",
    active: member?.active ?? true,
  });

  const roles = [
    "Editor-in-Chief",
    "Secretary (Ag)",
    "Editorial Member",
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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 border-t-4 border-[#133e27]">
        <h3 className="text-xl font-extrabold mb-6 text-[#133e27]">
          {member ? "Edit Board Member" : "Add Board Member"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-3 gap-3">
            <label className="block">
              <span className="font-bold text-gray-700 uppercase tracking-wider">Title *</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Dr. / Prof. / Mr."
                className="w-full p-2.5 border rounded-xl"
              />
            </label>
            <label className="block col-span-2">
              <span className="font-bold text-gray-700 uppercase tracking-wider">Full Name *</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2.5 border rounded-xl"
              />
            </label>
          </div>
          <label className="block">
            <span className="font-bold text-gray-700 uppercase tracking-wider">Email Address *</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-xl"
            />
          </label>
          <label className="block">
            <span className="font-bold text-gray-700 uppercase tracking-wider">Board Role *</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full p-2.5 border rounded-xl bg-white"
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
              className="h-4 w-4 text-[#133e27] rounded"
            />
            <span className="font-bold text-gray-700">Active Editorial Status</span>
          </label>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-5 bg-[#133e27] text-white font-bold rounded-xl hover:bg-[#1e4d2b] transition"
            >
              {member ? "Save Member" : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function BoardMemberTable({ initialMembers }: any) {
  const [members, setMembers] = useState(initialMembers || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const roles = [
    "All",
    "Editor-in-Chief",
    "Secretary (Ag)",
    "Editorial Member",
    "Reviewer",
  ];

  const filteredMembers = useMemo(() => {
    return members.filter((member: any) => {
      const matchesSearch =
        (member.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.email || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "All" || member.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [members, searchTerm, filterRole]);

  const handleAddEdit = (id: any, data: any) => {
    if (id) {
      setMembers(members.map((m: any) => (m.id === id ? { ...m, ...data } : m)));
    } else {
      const newMember = {
        ...data,
        id: Date.now(),
        joinedDate: "2026-01-01",
      };
      setMembers([newMember, ...members]);
    }
    setIsModalOpen(false);
    setEditingMember(null);
  };

  const handleToggleActive = (id: any, currentStatus: any) => {
    setMembers(
      members.map((m: any) =>
        m.id === id ? { ...m, active: !currentStatus } : m
      )
    );
  };

  const handleDelete = (id: any) => {
    if (!confirm("Are you sure you want to remove this board member?")) return;
    setMembers(members.filter((m: any) => m.id !== id));
  };

  const RoleBadge = ({ role }: any) => (
    <span
      className={`px-3 py-1 text-xs font-bold rounded-full ${
        role.includes("Chief")
          ? "bg-[#133e27] text-white"
          : role.includes("Secretary")
          ? "bg-amber-100 text-amber-900 border border-amber-200"
          : "bg-emerald-100 text-[#133e27]"
      }`}
    >
      {role}
    </span>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
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
            className="w-full p-2.5 pl-10 border border-gray-300 rounded-xl text-xs focus:ring-[#133e27] focus:border-[#133e27]"
          />
        </div>

        <div className="flex space-x-3 w-full md:w-auto justify-end">
          <div className="relative">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="p-2.5 border border-gray-300 rounded-xl appearance-none bg-white pr-8 text-xs font-semibold"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
          <button
            onClick={() => {
              setEditingMember(null);
              setIsModalOpen(true);
            }}
            className="py-2.5 px-4 bg-[#133e27] text-white font-bold rounded-xl hover:bg-[#1e4d2b] transition flex items-center space-x-2 text-xs cursor-pointer shadow-md"
          >
            <UserPlus size={16} /> <span>Add Board Member</span>
          </button>
        </div>
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#133e27] text-white">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Member Name & Title
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                Board Position
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
            {filteredMembers.map((member: any) => (
              <tr
                key={member.id}
                className={!member.active ? "bg-gray-50 opacity-80" : "hover:bg-emerald-50/40 transition"}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  <p className="font-bold text-[#133e27]">
                    {member.title ? `${member.title} ` : ""}{member.name}
                  </p>
                  <p className="text-xs text-gray-600">{member.email}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RoleBadge role={member.role} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full ${
                      member.active
                        ? "bg-emerald-100 text-emerald-800"
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
                    className="text-[#133e27] hover:text-emerald-900 p-2 rounded-full hover:bg-emerald-100 transition cursor-pointer"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleToggleActive(member.id, member.active)}
                    title={member.active ? "Deactivate Account" : "Activate Account"}
                    className={`${
                      member.active
                        ? "text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                        : "text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100"
                    } p-2 rounded-full transition cursor-pointer`}
                  >
                    {member.active ? <ShieldOff size={18} /> : <ShieldCheck size={18} />}
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    title="Delete Member"
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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


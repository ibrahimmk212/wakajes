import React from "react";
import EditorialMemberCard from "../../components/EditorialMemberCard";
import PeerReviewSteps from "../../components/PeerReviewSteps";
import { Award, Mail, Phone } from "lucide-react";

export default function EditorialBoardPage() {
  const editorialMembers = [
    {
      name: "Dr. Mercy B. Wakawa",
      role: "Editor-in-Chief",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
      phone: "08063849486",
    },
    {
      name: "Dr. Mohammed Hamman Barka",
      role: "Secretary (Ag)",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
      phone: "08065486735 / 08024220267",
      email: "tanimubarka97@yahoo.com",
    },
    {
      name: "Dr. Habib Hassan",
      role: "Editorial Member",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
    },
    {
      name: "Mr. Mohammed Y. Tong",
      role: "Editorial Member",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
    },
    {
      name: "Mr. James B. Ayuba",
      role: "Editorial Member",
      affiliation: "College of Education, Waka-Biu",
      country: "Nigeria",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-8">
      <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#1e4d2b]">
        <h1 className="text-4xl font-extrabold text-[#133e27] mb-2">
          Editorial Board & Peer Review
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Waka Journal of Educational Studies (WAKAJES) — Upholding Rigorous Standards for Multidisciplinary Research
        </p>
      </div>

      {/* Primary Editorial Leadership */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-[#133e27] text-white p-6 rounded-2xl shadow-xl border-2 border-[#d4af37]">
          <div className="flex items-center space-x-3 mb-3">
            <Award size={28} className="text-[#d4af37]" />
            <div>
              <span className="text-xs text-[#d4af37] font-bold uppercase tracking-wider block">
                Editor-in-Chief
              </span>
              <h3 className="text-2xl font-bold">Dr. Mercy B. Wakawa</h3>
            </div>
          </div>
          <p className="text-sm text-gray-200">College of Education, Waka-Biu, Borno State, Nigeria</p>
          <div className="mt-4 pt-3 border-t border-[#1e4d2b] flex items-center text-xs text-[#d4af37]">
            <Phone size={14} className="mr-1.5" /> <span>08063849486</span>
          </div>
        </div>

        <div className="bg-[#133e27] text-white p-6 rounded-2xl shadow-xl border-2 border-[#d4af37]">
          <div className="flex items-center space-x-3 mb-3">
            <Award size={28} className="text-[#d4af37]" />
            <div>
              <span className="text-xs text-[#d4af37] font-bold uppercase tracking-wider block">
                Secretary (Ag)
              </span>
              <h3 className="text-2xl font-bold">Dr. Mohammed Hamman Barka</h3>
            </div>
          </div>
          <p className="text-sm text-gray-200">College of Education, Waka-Biu, Borno State, Nigeria</p>
          <div className="mt-4 pt-3 border-t border-[#1e4d2b] flex flex-wrap gap-4 text-xs text-[#d4af37]">
            <span className="flex items-center"><Phone size={14} className="mr-1" /> 08065486735 / 08024220267</span>
            <span className="flex items-center"><Mail size={14} className="mr-1" /> tanimubarka97@yahoo.com</span>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center text-[#133e27] mb-8">
        Peer Review Process
      </h2>
      <PeerReviewSteps />

      <h2 className="text-3xl font-bold text-center text-[#133e27] mt-16 mb-8">
        Editorial & Review Evaluation Board
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {editorialMembers.map((member, index) => (
          <EditorialMemberCard
            key={index}
            name={member.name}
            affiliation={member.affiliation}
            country={member.country}
          />
        ))}
      </div>
    </div>
  );
}

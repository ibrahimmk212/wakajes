import React from "react";
import { GraduationCap, Languages, Atom, Users } from "lucide-react";

export default function SubThemesScope() {
  const scopeCategories = [
    {
      title: "Education & Pedagogy",
      icon: GraduationCap,
      color: "bg-emerald-800 text-[#d4af37]",
      borderColor: "border-emerald-700",
      items: [
        "Digital transformation in teacher training",
        "Authentic assessment design & AI in learning",
        "TVET / entrepreneurship education",
        "Inclusive learning models & policy",
      ],
    },
    {
      title: "Language, Culture & Humanities",
      icon: Languages,
      color: "bg-emerald-900 text-[#d4af37]",
      borderColor: "border-emerald-800",
      items: [
        "Indigenous language preservation and digitization",
        "Morpho-syntactic and sociolinguistic studies",
        "Cultural heritage preservation",
        "Literature, arts, and humanistic inquiries",
      ],
    },
    {
      title: "Science, Tech & Renewable Energy",
      icon: Atom,
      color: "bg-emerald-800 text-[#d4af37]",
      borderColor: "border-emerald-700",
      items: [
        "Off-grid solar solutions & clean tech",
        "Climate-smart agriculture & environmental science",
        "Local flora / botanical applications",
        "Digital technologies & applied sciences",
      ],
    },
    {
      title: "Social Sciences & Development",
      icon: Users,
      color: "bg-emerald-900 text-[#d4af37]",
      borderColor: "border-emerald-800",
      items: [
        "Gender and community development",
        "Health equity & public policy",
        "Sustainable economic practices",
        "Governance, security, and social transformation",
      ],
    },
  ];

  return (
    <section className="py-14 bg-[#f8faf8]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1e4d2b] bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            Multidisciplinary Scope
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#133e27] mt-3">
            Sub-Themes & Academic Scope
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-2 text-sm md:text-base">
            We welcome original research submissions across all academic fields bridging local wisdom with modern innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scopeCategories.map((cat, index) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1"
              >
                <div className={`p-5 flex items-center space-x-3 ${cat.color}`}>
                  <IconComponent size={32} className="flex-shrink-0" />
                  <h3 className="font-bold text-lg text-white leading-snug">
                    {cat.title}
                  </h3>
                </div>

                <div className="p-5 flex-grow bg-white">
                  <ul className="space-y-2.5 text-xs md:text-sm text-gray-700">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#1e4d2b] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

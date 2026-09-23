import React from "react";
import { Calendar, CheckCircle2, Clock, BookCheck } from "lucide-react";

export default function ImportantDates() {
  const dates = [
    {
      title: "Abstract Submission Deadline",
      date: "October 25, 2026",
      icon: Clock,
      highlight: false,
    },
    {
      title: "Full Paper Submission Deadline",
      date: "November 30, 2026",
      icon: Calendar,
      highlight: true,
    },
    {
      title: "Peer Review Notification",
      date: "December 20, 2026",
      icon: CheckCircle2,
      highlight: false,
    },
    {
      title: "Publication Date",
      date: "January 2027",
      icon: BookCheck,
      highlight: false,
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#133e27]">
            Important Schedule & Deadlines
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            WAKAJES Vol. 4 No. 3 Publication Timeline
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dates.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`p-5 rounded-xl border-2 transition-all duration-300 flex items-start space-x-4 ${
                  item.highlight
                    ? "bg-[#fdf8e8] border-[#d4af37] shadow-lg scale-102"
                    : "bg-white border-gray-200 shadow-sm hover:border-[#1e4d2b]"
                }`}
              >
                <div
                  className={`p-3 rounded-xl flex-shrink-0 ${
                    item.highlight
                      ? "bg-[#d4af37] text-[#081c15]"
                      : "bg-emerald-100 text-[#1e4d2b]"
                  }`}
                >
                  <IconComponent size={24} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="text-lg font-bold text-[#133e27] mt-0.5">
                    {item.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

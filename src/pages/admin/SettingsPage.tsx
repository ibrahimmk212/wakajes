import React from "react";
import SystemSettingsForm from "../../../components/admin/SystemSettingsForm";

export default function SettingsPage() {
  const currentSettings = {
    journalName: "Waka Journal of Educational Studies",
    journalAcronym: "WAKAJES",
    currentVolume: 4,
    currentIssue: 3,
    issn: "1597-5118",
    submissionEmail: "wakajes1986@gmail.com",
    apcAmount: 10000,
    apcCurrency: "NGN",
    reviewDaysMax: 14,
  };

  return (
    <div className="space-y-6">
      <div>
        <span className="inline-block bg-[#d4af37] text-[#133e27] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
          WAKAJES Configuration
        </span>
        <h1 className="text-3xl font-extrabold text-[#133e27]">System Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Global journal settings, publication volume/issue numbers, and vetting fee controls.
        </p>
      </div>

      <SystemSettingsForm initialSettings={currentSettings} />
    </div>
  );
}


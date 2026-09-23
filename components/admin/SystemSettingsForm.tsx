import React, { useState } from "react";
import {
  Settings,
  CreditCard,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface SettingsData {
  journalName: string;
  journalAcronym: string;
  currentVolume: number;
  currentIssue: number;
  issn: string;
  apcAmount: number;
  apcCurrency: string;
  reviewDaysMax: number;
  submissionEmail: string;
}

interface SystemSettingsFormProps {
  initialSettings?: Partial<SettingsData>;
}

const defaultSettings: SettingsData = {
  journalName: "Waka Journal of Educational Studies",
  journalAcronym: "WAKAJES",
  currentVolume: 4,
  currentIssue: 3,
  issn: "1597-5118",
  apcAmount: 10000,
  apcCurrency: "NGN (₦)",
  reviewDaysMax: 14,
  submissionEmail: "wakajes1986@gmail.com",
};

export default function SystemSettingsForm({ initialSettings = {} }: SystemSettingsFormProps) {
  const [settings, setSettings] = useState<SettingsData>({
    ...defaultSettings,
    ...initialSettings,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ success: boolean; message: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage({
        success: true,
        message: "WAKAJES system settings saved successfully!",
      });
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-xl font-extrabold text-[#133e27] mb-6 flex items-center border-b pb-4">
        <Settings size={22} className="mr-2 text-[#d4af37]" /> Global Journal Settings
      </h2>

      {statusMessage && (
        <div
          className={`p-4 mb-6 border rounded-xl flex items-center space-x-3 text-sm font-semibold ${
            statusMessage.success
              ? "bg-emerald-50 border-emerald-300 text-emerald-800"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          {statusMessage.success ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span>{statusMessage.message}</span>
        </div>
      )}

      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-[#133e27] flex items-center">
            <BookOpen size={18} className="mr-2 text-[#d4af37]" /> Journal Identity
          </h3>

          <label className="block space-y-1">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Full Journal Name</span>
            <input
              type="text"
              name="journalName"
              value={settings.journalName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl text-sm"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block space-y-1">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Journal Acronym</span>
              <input
                type="text"
                name="journalAcronym"
                value={settings.journalAcronym}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl text-sm"
              />
            </label>

            <label className="block space-y-1">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">ISSN Code</span>
              <input
                type="text"
                name="issn"
                value={settings.issn}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl text-sm font-mono"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <label className="block space-y-1">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Current Volume</span>
              <input
                type="number"
                name="currentVolume"
                value={settings.currentVolume}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl text-sm font-bold text-[#133e27]"
                min="1"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Current Issue</span>
              <input
                type="number"
                name="currentIssue"
                value={settings.currentIssue}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl text-sm font-bold text-[#133e27]"
                min="1"
              />
            </label>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-base font-bold text-[#133e27] flex items-center">
            <CreditCard size={18} className="mr-2 text-emerald-600" /> Vetting Fee & Bank Settings
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <label className="block space-y-1">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Vetting Fee Amount (₦)</span>
              <input
                type="number"
                name="apcAmount"
                value={settings.apcAmount}
                onChange={handleChange}
                required
                className="w-full p-3 border rounded-xl text-sm font-bold text-[#133e27]"
                min="0"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Currency</span>
              <input
                type="text"
                name="apcCurrency"
                value={settings.apcCurrency}
                disabled
                className="w-full p-3 border rounded-xl text-sm bg-gray-50 font-semibold"
              />
            </label>
          </div>

          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <p className="font-bold text-amber-900">Official Bank Account Information:</p>
            <p>Bank Name: <strong>United Bank for Africa (UBA)</strong></p>
            <p>Account Name: <strong>WAKA JOURNAL OF EDUCATIONAL STUDIES</strong></p>
            <p>Account Number: <strong className="font-mono text-[#133e27]">1012453666</strong></p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-base font-bold text-[#133e27] flex items-center">
            <Clock size={18} className="mr-2 text-purple-600" /> Workflow & Contact Email
          </h3>

          <label className="block space-y-1">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Editorial Contact Email</span>
            <input
              type="email"
              name="submissionEmail"
              value={settings.submissionEmail}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl text-sm"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Target Peer Review Window (Days)</span>
            <input
              type="number"
              name="reviewDaysMax"
              value={settings.reviewDaysMax}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl text-sm font-bold text-[#133e27]"
              min="1"
              max="180"
            />
          </label>
        </div>
      </div>

      <div className="pt-8 border-t border-gray-100 mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-3.5 px-8 bg-[#133e27] hover:bg-[#1e4d2b] text-white font-extrabold rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer text-sm"
        >
          {isSubmitting ? "Saving..." : "Save WAKAJES Settings"}
        </button>
      </div>
    </form>
  );
}


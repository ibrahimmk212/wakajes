// src/components/admin/SystemSettingsForm.tsx
"use client";

import React, { useState } from "react";
import { Settings, DollarSign, BookOpen, Clock } from "lucide-react";
import { updateSystemSettings } from "@/app/actions"; // New Server Action

// Conceptual Settings Interface
interface SettingsData {
  journalName: string;
  journalAcronym: string;
  currentVolume: number;
  currentIssue: number;
  apcAmountUSD: number;
  apcCurrency: string;
  reviewDaysMax: number;
  submissionEmail: string;
}

// Initial/Mock Data (In a real app, this is fetched in the Server Component)
const initialSettings: SettingsData = {
  journalName: "International Journal of Arts and Social Sciences in the World",
  journalAcronym: "IJASSW",
  currentVolume: 9,
  currentIssue: 1,
  apcAmountUSD: 250,
  apcCurrency: "USD",
  reviewDaysMax: 45,
  submissionEmail: "submissions@ijassw.com",
};

// --- Main Component ---
export default function SystemSettingsForm() {
  const [settings, setSettings] = useState<SettingsData>(initialSettings);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ message: "", type: "" });

    // Create FormData object for the Server Action
    const formData = new FormData();
    Object.keys(settings).forEach((key) => {
      formData.append(key, settings[key].toString());
    });

    const result = await updateSystemSettings(formData);

    if (result.success) {
      setStatusMessage({
        message: "Settings updated successfully!",
        type: "success",
      });
    } else {
      setStatusMessage({
        message: result.message || "Failed to update settings.",
        type: "error",
      });
    }

    setIsSubmitting(false);
    // Clear message after a few seconds
    setTimeout(() => setStatusMessage({ message: "", type: "" }), 5000);
  };

  const StatusAlert = () => {
    if (!statusMessage.message) return null;
    return (
      <div
        className={`p-4 mb-6 border rounded-lg ${
          statusMessage.type === "success"
            ? "bg-green-100 border-green-400 text-green-700"
            : "bg-red-100 border-red-400 text-red-700"
        }`}
      >
        {statusMessage.message}
      </div>
    );
  };

  // --- Settings Group Components ---

  const JournalIdentitySettings = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <BookOpen size={20} className="mr-2 text-blue-500" /> Journal Identity
      </h3>

      <label className="block space-y-1">
        <span className="text-sm font-medium text-gray-700">
          Full Journal Name
        </span>
        <input
          type="text"
          name="journalName"
          value={settings.journalName}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium text-gray-700">
          Journal Acronym (e.g., IJASSW)
        </span>
        <input
          type="text"
          name="journalAcronym"
          value={settings.journalAcronym}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">
            Current Volume Number
          </span>
          <input
            type="number"
            name="currentVolume"
            value={settings.currentVolume}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
            min="1"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">
            Current Issue Number
          </span>
          <input
            type="number"
            name="currentIssue"
            value={settings.currentIssue}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
            min="1"
          />
        </label>
      </div>
    </div>
  );

  const FinancialSettings = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <DollarSign size={20} className="mr-2 text-green-500" /> Financial
        Settings
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">
            APC Amount (Article Processing Charge)
          </span>
          <input
            type="number"
            name="apcAmountUSD"
            value={settings.apcAmountUSD}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
            min="0"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">Currency</span>
          <select
            name="apcCurrency"
            value={settings.apcCurrency}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg bg-white"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </label>
      </div>
    </div>
  );

  const WorkflowSettings = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center">
        <Clock size={20} className="mr-2 text-purple-500" /> Workflow & Contact
      </h3>

      <label className="block space-y-1">
        <span className="text-sm font-medium text-gray-700">
          Submission Contact Email
        </span>
        <input
          type="email"
          name="submissionEmail"
          value={settings.submissionEmail}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
      </label>

      <label className="block space-y-1">
        <span className="text-sm font-medium text-gray-700">
          Maximum Review Days (Target)
        </span>
        <input
          type="number"
          name="reviewDaysMax"
          value={settings.reviewDaysMax}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
          min="1"
          max="180"
        />
      </label>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
        <Settings size={24} className="mr-2 text-blue-600" /> Global System
        Settings
      </h2>

      <StatusAlert />

      <div className="space-y-10">
        {/* Group 1: Journal Identity */}
        <JournalIdentitySettings />

        {/* Group 2: Financial Settings */}
        <FinancialSettings />

        {/* Group 3: Workflow Settings */}
        <WorkflowSettings />
      </div>

      <div className="pt-8 border-t mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isSubmitting ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </form>
  );
}

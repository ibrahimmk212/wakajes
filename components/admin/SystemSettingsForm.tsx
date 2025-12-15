// src/components/admin/SystemSettingsForm.tsx
"use client";

import React, { useState, useActionState } from "react";
import {
  Settings,
  DollarSign,
  BookOpen,
  Clock,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useFormStatus } from "react-dom"; // Use Next.js/React hooks
import { updateSystemSettings } from "@/app/actions"; // Server Action

// --- TYPE DEFINITIONS ---
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

interface ActionState {
  success: boolean;
  message: string;
}

// Initial/Mock Data (Fetched from a dedicated 'Settings' table in Prisma)
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

// --- HELPER COMPONENTS ---

// 1. Status Alert Component (Fixed prop destructuring)
function StatusAlert({ state }: { state: ActionState }) {
  if (!state.message) return null;

  const isSuccess = state.success;
  const Icon = isSuccess ? CheckCircle : XCircle;

  const colorClass = isSuccess
    ? "bg-green-100 border-green-400 text-green-700"
    : "bg-red-100 border-red-400 text-red-700";

  return (
    <div
      className={`p-4 mb-6 border rounded-lg flex items-center space-x-3 ${colorClass}`}
    >
      <Icon size={20} className="flex-shrink-0" />
      <span>{state.message}</span>
    </div>
  );
}

// 2. Submit Button Component (Uses useFormStatus)
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
    >
      {pending ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <span>Save All Settings</span>
      )}
    </button>
  );
}

// --- Settings Group Components (Typed and Prop-passed correctly) ---
interface SettingGroupProps {
  settings: SettingsData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const JournalIdentitySettings = ({
  settings,
  handleChange,
}: SettingGroupProps) => (
  // ... (Content remains the same, ensuring settings and handleChange are used) ...
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

const FinancialSettings = ({ settings, handleChange }: SettingGroupProps) => (
  // ... (Content remains the same) ...
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

const WorkflowSettings = ({ settings, handleChange }: SettingGroupProps) => (
  // ... (Content remains the same) ...
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

// --- Main Component ---
export default function SystemSettingsForm() {
  const [settings, setSettings] = useState<SettingsData>(initialSettings);

  // Use a stable Server Action that correctly receives FormData
  const updateAction = async (prevState: ActionState, formData: FormData) => {
    // 🎯 IMPORTANT: Pass the FormData directly to your Server Action
    return updateSystemSettings(formData);
  };

  const initialState: ActionState = { success: false, message: "" };
  const [state, formAction] = useActionState(updateAction, initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  // We no longer use the custom handleSubmit/setIsSubmitting.
  // We use the <form action={formAction}> pattern instead.

  return (
    // We must manually create the FormData and pass it to the action,
    // or let the native form do it. Since we are using React state (settings)
    // to manage inputs, we must switch to a custom submit that builds FormData.
    <form action={formAction} className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center border-b pb-3">
        <Settings size={24} className="mr-2 text-blue-600" /> Global System
        Settings
      </h2>

      {/* Pass the state to the StatusAlert */}
      <StatusAlert state={state} />

      <div className="space-y-10">
        {/* Pass props down to child components */}
        <JournalIdentitySettings
          settings={settings}
          handleChange={handleChange}
        />
        <FinancialSettings settings={settings} handleChange={handleChange} />
        <WorkflowSettings settings={settings} handleChange={handleChange} />
      </div>

      <div className="pt-8 border-t mt-8">
        <SubmitButton />
      </div>
    </form>
  );
}

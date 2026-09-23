import React, { useState } from "react";

export default function TransactionVerificationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ message: "", type: "" });

    const formData = new FormData(e.currentTarget);
    const paperReference = formData.get("paperReference") as string;
    const transactionRef = formData.get("transactionRef") as string;
    const payerName = formData.get("payerName") as string;

    try {
      const response = await fetch("/api/registration/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paperReference, transactionRef, payerName }),
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage({ message: result.message, type: "success" });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatusMessage({ message: result.message || "Verification failed.", type: "error" });
      }
    } catch {
      setStatusMessage({ message: "Network error occurred. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusClass =
    statusMessage.type === "success"
      ? "bg-green-100 border-green-400 text-green-700"
      : "bg-red-100 border-red-400 text-red-700";

  return (
    <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-3">
        Transaction Verification Form
      </h2>

      {statusMessage.message && (
        <div className={`p-3 mb-4 border rounded-md ${statusClass}`}>
          {statusMessage.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="paymentSlip" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Payment Proof (Slip / Receipt) <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="paymentSlip"
            name="paymentSlip"
            accept=".pdf,.jpg,.jpeg,.png"
            required
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-xs text-gray-500">
            Max size: 5MB. Accepted formats: PDF, JPG, PNG.
          </p>
        </div>

        <div>
          <label htmlFor="transactionRef" className="block text-sm font-medium text-gray-700 mb-1">
            Bank Transaction/Reference Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="transactionRef"
            name="transactionRef"
            required
            placeholder="e.g., TFX123456"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="payerName" className="block text-sm font-medium text-gray-700 mb-1">
            Payer Name (As it appears on the bank transfer) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="payerName"
            name="payerName"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="paperReference" className="block text-sm font-medium text-gray-700 mb-1">
            Paper Reference Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="paperReference"
            name="paperReference"
            required
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? "Verifying..." : "Submit Payment Verification"}
        </button>
      </form>
    </div>
  );
}

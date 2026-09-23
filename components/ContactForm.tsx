import React, { useState } from "react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ message: "", type: "" });

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage({ message: result.message, type: "success" });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatusMessage({ message: result.message || "Failed to send message.", type: "error" });
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
    <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl">
      <h3 className="text-2xl font-bold text-blue-900 mb-6">Send Us a Message</h3>

      {statusMessage.message && (
        <div className={`p-3 mb-4 border rounded-md ${statusClass}`}>
          {statusMessage.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject/Category
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">Select Category</option>
              <option value="Editorial Inquiry">Editorial/Paper Status Inquiry</option>
              <option value="Technical Support">Technical Support/Website Issues</option>
              <option value="Payment/Registration">Payment/Registration</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

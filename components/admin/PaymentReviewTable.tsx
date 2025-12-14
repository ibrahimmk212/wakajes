/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/admin/PaymentReviewTable.tsx (Client Component)
"use client";

import React, { useState } from "react";
import { Check, X, File, Clock } from "lucide-react";
// import useSWR from 'swr'; // For real-time updates

export default function PaymentReviewTable({ initialPayments }: any) {
  const [payments, setPayments] = useState(initialPayments);

  // Placeholder function for the Server Action called by the client
  const handleStatusUpdate = async (id: number, newStatus: string) => {
    // 🎯 Replace with a call to a dedicated Server Action:
    // const result = await updatePaymentStatus(id, newStatus);

    // Optimistic UI Update:
    setPayments(
      payments.map((p: any) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reference
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payer / Paper ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Proof
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment: any) => (
            <tr
              key={payment.id}
              className={payment.status === "Approved" ? "bg-green-50" : ""}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {payment.refNumber}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {payment.payerName}
                <br />
                <span className="font-mono text-xs text-blue-600">
                  {payment.paperRef}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">
                ${payment.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <a
                  href={payment.slipUrl}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <File size={16} className="mr-1" /> View Slip
                </a>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payment.status === "Approved"
                      ? "bg-green-100 text-green-800"
                      : payment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {payment.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                {payment.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleStatusUpdate(payment.id, "Approved")}
                      className="text-green-600 hover:text-green-900 p-2 rounded-full hover:bg-green-100 transition"
                      title="Approve Payment"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(payment.id, "Rejected")}
                      className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition"
                      title="Reject Payment"
                    >
                      <X size={20} />
                    </button>
                  </>
                )}
                {payment.status !== "Pending" && (
                  <span className="text-gray-400">Action Complete</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

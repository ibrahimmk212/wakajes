// app/registration/page.tsx (Server Component)
import React from "react";
import TransactionVerificationForm from "@/components/TransactionVerificationForm";
import { Handshake, Banknote, Clock } from "lucide-react";

interface RegistrationPageProps {
  searchParams: {
    ref?: string; // Expecting a paper reference ID in the URL
  };
}

export default function RegistrationPage({
  searchParams,
}: RegistrationPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
            Paper Registration & Payment
          </h1>
          <p className="text-lg text-gray-600">
            Complete your registration by submitting the publication fee and
            verifying your transaction.
          </p>
          {/* <div className="mt-4 text-sm font-medium bg-yellow-100 p-2 border border-yellow-300 rounded-md inline-block">
            Your Paper Reference ID:{" "}
            <span className="font-bold text-red-600">{paperReference}</span>
          </div> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Account Details (Display) */}
          <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg h-full">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 border-b pb-3">
              Payment Details (Bank Transfer)
            </h2>

            <div className="space-y-6">
              {/* Bank Name */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                <Banknote size={24} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Bank Name</p>
                  <p className="font-semibold text-gray-800">
                    United Bank for Africa (UBA)
                  </p>
                </div>
              </div>

              {/* Account Name */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                <Handshake size={24} className="text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Account Name</p>
                  <p className="font-semibold text-gray-800">
                    Academic Staff Union COEASU Waka-Biu
                  </p>
                </div>
              </div>

              {/* Account Number */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Account Number</p>
                <p className="text-2xl font-extrabold text-blue-700">
                  1012453666
                </p>
              </div>

              {/* SWIFT/IBAN */}
              {/* <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">
                  SWIFT/BIC Code (International)
                </p>
                <p className="font-mono text-gray-800">FGBANC001</p>
              </div> */}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="font-bold text-red-600 flex items-center">
                {/* Naira */}
                <Clock size={20} className="mr-2" /> Registration Fee: ₦20,000
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Please ensure the exact fee is transferred and keep the proof of
                payment ready for upload.
              </p>
            </div>
          </div>

          {/* Card 2: Transaction Verification Form (Interactive) */}
          <TransactionVerificationForm />
        </div>
      </div>
    </div>
  );
}

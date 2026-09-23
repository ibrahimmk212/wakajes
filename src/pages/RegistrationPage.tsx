import React from "react";
import TransactionVerificationForm from "../../components/TransactionVerificationForm";
import { Handshake, Banknote, Clock, ShieldCheck } from "lucide-react";

export default function RegistrationPage() {
  return (
    <div className="min-h-screen bg-[#f8faf8] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-md border-t-4 border-[#1e4d2b]">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#133e27] mb-2">
            Publication Fees & Payment Verification
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            WAKAJES Vol. 4 No. 3 Vetting Fee and Bank Transfer Verification Details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Bank Transfer Details */}
          <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-lg h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#133e27] mb-6 border-b-2 border-[#d4af37] pb-3 flex items-center">
                <Banknote size={26} className="mr-2 text-[#d4af37]" />
                Official Payment Details (Bank Transfer)
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <Banknote size={24} className="text-[#1e4d2b]" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Bank Name</p>
                    <p className="font-bold text-gray-900 text-lg">
                      United Bank for Africa (UBA)
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <Handshake size={24} className="text-[#1e4d2b]" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Account Name</p>
                    <p className="font-bold text-gray-900 text-base">
                      Academic Staff Union COE Waka-Biu
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-[#133e27] text-white rounded-xl border-2 border-[#d4af37] text-center">
                  <p className="text-xs text-[#d4af37] uppercase tracking-wider font-bold">Account Number</p>
                  <p className="text-3xl font-black text-white tracking-widest mt-1">
                    1012453666
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 flex items-center">
                  <Clock size={18} className="mr-2 text-[#1e4d2b]" /> Vetting Fee Amount:
                </span>
                <span className="text-2xl font-black text-red-600">
                  ₦10,000
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                Note: Authors must ensure the cover page includes paper title, author name(s), institutional affiliation, and primary contact email/phone number.
              </p>
            </div>
          </div>

          {/* Card 2: Transaction Verification Form */}
          <TransactionVerificationForm />
        </div>
      </div>
    </div>
  );
}

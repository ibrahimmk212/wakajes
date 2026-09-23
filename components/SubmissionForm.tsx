import React, { useState } from "react";
import { Loader2, XCircle, CheckCircle, UploadCloud, FileText, Check, CreditCard, Send, ShieldAlert, Image as ImageIcon } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

import InputText from "./forms/InputText";
import Textarea from "./forms/TextArea";

export default function SubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ success: boolean; message: string } | null>(null);
  const [submittedData, setSubmittedData] = useState<{ ref: string; title: string; paymentReceiptAttached: boolean } | null>(null);
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [paymentReceiptFile, setPaymentReceiptFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData(e.currentTarget);
    const paperTitle = formData.get("paperTitle") as string;
    const authors = formData.get("authors") as string;
    const email = formData.get("email") as string;
    const abstract = formData.get("abstract") as string;
    const mobileNumber = formData.get("mobileNumber") as string;

    const paperRef = `WAKAJES-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    let manuscriptUrl = "#";
    let paymentReceiptUrl = "";

    try {
      if (isSupabaseConfigured && supabase) {
        // 1. Upload Manuscript File to 'manuscripts' bucket
        if (selectedFile) {
          const fileExt = selectedFile.name.split(".").pop();
          const fileName = `${paperRef}_manuscript_${Date.now()}.${fileExt}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from("manuscripts")
            .upload(fileName, selectedFile);

          if (uploadError) {
            throw new Error(`Manuscript upload failed: ${uploadError.message}`);
          }

          if (uploadData) {
            const { data: publicUrlData } = supabase.storage
              .from("manuscripts")
              .getPublicUrl(fileName);
            manuscriptUrl = publicUrlData.publicUrl;
          }
        }

        // 2. Upload Proof of Payment File to 'receipts' bucket
        if (paymentReceiptFile) {
          const receiptExt = paymentReceiptFile.name.split(".").pop();
          const receiptFileName = `${paperRef}_receipt_${Date.now()}.${receiptExt}`;
          const { data: receiptUploadData, error: receiptError } = await supabase.storage
            .from("receipts")
            .upload(receiptFileName, paymentReceiptFile);

          if (!receiptError && receiptUploadData) {
            const { data: receiptPublicUrlData } = supabase.storage
              .from("receipts")
              .getPublicUrl(receiptFileName);
            paymentReceiptUrl = receiptPublicUrlData.publicUrl;
          }
        }

        // 3. Insert record into Supabase Database Table
        const { error: dbError } = await supabase.from("submissions").insert([
          {
            paper_ref: paperRef,
            title: paperTitle,
            abstract,
            authors,
            email,
            mobile_number: mobileNumber,
            manuscript_url: manuscriptUrl,
            payment_receipt_url: paymentReceiptUrl,
            payment_status: paymentReceiptUrl ? "Pending" : "Pending",
            status: "New",
          },
        ]);

        if (dbError) {
          throw new Error(`Submission record error: ${dbError.message}`);
        }
      } else {
        // Fallback for demo mode
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setSubmittedData({
        ref: paperRef,
        title: paperTitle,
        paymentReceiptAttached: Boolean(paymentReceiptFile),
      });
    } catch (err: any) {
      setStatusMessage({
        success: false,
        message: err.message || "An error occurred while submitting your paper. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedData) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-2xl text-center space-y-6 border-t-4 border-[#133e27]">
        <CheckCircle size={64} className="mx-auto text-emerald-600" />
        <h2 className="text-3xl font-extrabold text-[#133e27]">Manuscript Submitted!</h2>
        <p className="text-gray-600 text-sm">
          Thank you for submitting your manuscript <strong>"{submittedData.title}"</strong> to WAKAJES.
        </p>

        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-5 inline-block w-full">
          <p className="text-xs text-emerald-800 font-semibold uppercase tracking-wider mb-1">
            Official Paper Reference Code
          </p>
          <span className="text-2xl text-[#133e27] font-mono font-black block tracking-wider">
            {submittedData.ref}
          </span>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-left text-xs text-amber-950 space-y-2">
          <p className="font-bold flex items-center gap-1.5 text-amber-900">
            <CreditCard size={16} /> Vetting Fee (₦10,000) Payment Details
          </p>
          <p>
            Bank: <strong>United Bank for Africa (UBA)</strong> | Account: <strong>1012453666</strong> | Name: <strong>WAKA JOURNAL OF EDUCATIONAL STUDIES</strong>
          </p>
          {submittedData.paymentReceiptAttached ? (
            <p className="text-emerald-800 font-semibold flex items-center gap-1 pt-1 border-t border-amber-200">
              <Check size={14} /> Your proof of payment receipt has been received and attached to your submission.
            </p>
          ) : (
            <p className="pt-1 border-t border-amber-200">
              If you haven't uploaded your payment receipt yet, please email it with your tracking code <strong>{submittedData.ref}</strong> to <strong>wakajes1986@gmail.com</strong>.
            </p>
          )}
        </div>

        <button
          onClick={() => {
            setSubmittedData(null);
            setStatusMessage(null);
            setSelectedFile(null);
            setPaymentReceiptFile(null);
          }}
          className="bg-[#133e27] hover:bg-[#1e4d2b] text-white font-bold py-3 px-8 rounded-xl shadow-md transition cursor-pointer text-sm"
        >
          Submit Another Manuscript
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl border-t-4 border-[#133e27]">
      <div className="mb-6 border-b border-gray-100 pb-6">
        <span className="inline-block bg-[#d4af37] text-[#133e27] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          WAKAJES Online Submission System
        </span>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#133e27]">
          Submit Your Research Manuscript
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Waka Journal of Educational Studies (Vol. 4 No. 3) • ISSN: 1597-5118
        </p>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-3 text-xs text-amber-900">
          <ShieldAlert size={20} className="text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Vercel Setup Note:</strong> Connect your free Supabase project by adding <code className="bg-amber-100 text-amber-950 font-mono px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and <code className="bg-amber-100 text-amber-950 font-mono px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code> to your Vercel Environment Variables.
          </div>
        </div>
      )}

      {/* Guidelines Accordion / Box */}
      <div className="mb-8 bg-[#fdf8e8] border-l-4 border-[#d4af37] p-5 rounded-r-xl">
        <h3 className="font-bold text-[#133e27] text-sm uppercase tracking-wide flex items-center mb-2">
          <FileText size={18} className="mr-2 text-[#d4af37]" /> Official Submission Guidelines
        </h3>
        <ul className="space-y-1.5 text-xs text-gray-700">
          <li className="flex items-start space-x-1.5">
            <Check size={14} className="text-emerald-700 mt-0.5 flex-shrink-0" />
            <span><strong>Length:</strong> 4,000 to 8,000 words (including references & abstract).</span>
          </li>
          <li className="flex items-start space-x-1.5">
            <Check size={14} className="text-emerald-700 mt-0.5 flex-shrink-0" />
            <span><strong>Abstract:</strong> 150–250 words accompanied by 4–6 keywords.</span>
          </li>
          <li className="flex items-start space-x-1.5">
            <Check size={14} className="text-emerald-700 mt-0.5 flex-shrink-0" />
            <span><strong>Formatting:</strong> Double-spaced, 12pt Times New Roman, APA 7th ed guidelines.</span>
          </li>
          <li className="flex items-start space-x-1.5">
            <Check size={14} className="text-emerald-700 mt-0.5 flex-shrink-0" />
            <span><strong>Vetting Fee:</strong> ₦10,000 payable to UBA Account: <strong>1012453666</strong>.</span>
          </li>
        </ul>
      </div>

      {statusMessage && !statusMessage.success && (
        <div className="p-4 mb-6 border rounded-xl flex items-start space-x-3 bg-red-50 text-red-800 border-red-300 text-sm">
          <XCircle size={20} className="flex-shrink-0 mt-0.5 text-red-600" />
          <div>
            <p className="font-semibold">Submission Error</p>
            <p className="text-xs mt-1">{statusMessage.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-lg font-bold text-[#133e27] border-b border-gray-100 pb-2">
          1. Manuscript Information
        </h2>

        <InputText
          label="Paper Title"
          name="paperTitle"
          required
          placeholder="e.g. Assessment of Modern Pedagogical Strategies in Higher Education"
          helperText="Maximum 200 characters. Exactly as it should appear on your publication certificate."
        />

        <Textarea
          label="Abstract & Keywords"
          name="abstract"
          required
          placeholder="Enter structured abstract (150-250 words) and 4-6 keywords..."
          rows={5}
        />

        <h2 className="text-lg font-bold text-[#133e27] border-b border-gray-100 pb-2 pt-2">
          2. Authors & Institutional Contact Details
        </h2>

        <InputText
          label="Author(s) & Institutional Affiliation"
          name="authors"
          required
          placeholder="e.g. Dr. Jane Doe (Dept of Education, COE Waka-Biu), Prof. John Smith"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputText
            label="Corresponding Author Email"
            name="email"
            type="email"
            required
            placeholder="author@example.com"
          />

          <InputText
            label="Mobile Phone Number"
            name="mobileNumber"
            type="tel"
            required
            placeholder="08012345678"
          />
        </div>

        <h2 className="text-lg font-bold text-[#133e27] border-b border-gray-100 pb-2 pt-2">
          3. Upload Manuscript Document
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Attach Research File (DOC, DOCX, or PDF) <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 hover:border-[#133e27] rounded-xl p-6 text-center bg-gray-50 transition cursor-pointer">
            <input
              type="file"
              name="manuscriptFile"
              accept=".doc,.docx,.pdf"
              required
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#133e27] file:text-white hover:file:bg-[#1e4d2b] cursor-pointer"
            />
            {selectedFile && (
              <p className="mt-2 text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1">
                <Check size={14} /> Selected Manuscript: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            )}
          </div>
        </div>

        <h2 className="text-lg font-bold text-[#133e27] border-b border-gray-100 pb-2 pt-2">
          4. Proof of Vetting Fee Payment (₦10,000)
        </h2>

        <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-xl text-xs text-amber-950 space-y-1 mb-3">
          <p className="font-bold text-amber-900 flex items-center gap-1.5">
            <CreditCard size={16} /> Payment Account Details:
          </p>
          <p>Bank: <strong>United Bank for Africa (UBA)</strong> | Account Number: <strong className="font-mono text-[#133e27]">1012453666</strong></p>
          <p>Account Name: <strong>WAKA JOURNAL OF EDUCATIONAL STUDIES</strong></p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Attach Payment Receipt / Transfer Slip (Image or PDF)
          </label>
          <div className="border-2 border-dashed border-amber-300 hover:border-[#133e27] rounded-xl p-5 text-center bg-amber-50/40 transition cursor-pointer">
            <input
              type="file"
              name="paymentReceiptFile"
              accept="image/*,.pdf"
              onChange={(e) => setPaymentReceiptFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#d4af37] file:text-[#133e27] hover:file:bg-[#c29f2e] cursor-pointer"
            />
            {paymentReceiptFile ? (
              <p className="mt-2 text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1">
                <ImageIcon size={14} /> Selected Receipt: {paymentReceiptFile.name} ({(paymentReceiptFile.size / (1024 * 1024)).toFixed(2)} MB)
              </p>
            ) : (
              <p className="mt-1 text-[11px] text-gray-500 italic">
                * Upload your payment transfer receipt here, or email it later to wakajes1986@gmail.com with your reference code.
              </p>
            )}
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start space-x-3 text-xs font-medium text-gray-700">
            <input
              type="checkbox"
              name="terms"
              required
              className="mt-0.5 w-4 h-4 text-[#133e27] border-gray-300 rounded focus:ring-[#133e27]"
            />
            <span>
              I confirm that this manuscript is original, has not been published elsewhere, and complies with WAKAJES publication ethics. <span className="text-red-500">*</span>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#133e27] hover:bg-[#1e4d2b] text-white font-extrabold py-3.5 rounded-xl shadow-lg transition duration-200 disabled:opacity-50 flex items-center justify-center space-x-2 cursor-pointer text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Submitting Manuscript & Receipt...</span>
            </>
          ) : (
            <>
              <UploadCloud size={20} />
              <span>Submit Manuscript to WAKAJES</span>
            </>
          )}
        </button>

        <div className="text-center text-xs text-gray-500 pt-2 flex items-center justify-center gap-2">
          <Send size={14} className="text-[#133e27]" />
          <span>Email inquiries: <strong>wakajes1986@gmail.com</strong> | Call <strong>08065486735 / 08026367332</strong></span>
        </div>
      </form>
    </div>
  );
}




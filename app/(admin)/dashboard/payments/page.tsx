// app/(admin)/dashboard/payments/page.tsx (This component will fetch data on the server)
import PaymentReviewTable from "@/components/admin/PaymentReviewTable";
// Conceptual Data Fetching (Server Component)
async function getPendingPayments() {
  // 🎯 Securely fetch sensitive payment data from your database
  return [
    {
      id: 101,
      paperRef: "IJASSW-2025-045",
      payerName: "Sarah J. Davies",
      amount: 250,
      refNumber: "BTRF7781",
      status: "Pending",
      slipUrl: "/admin/slips/slip-101.pdf",
      submittedAt: "2025-12-12",
    },
    {
      id: 102,
      paperRef: "IJASSW-2025-046",
      payerName: "Prof. L. Sharma",
      amount: 250,
      refNumber: "TFX12345",
      status: "Pending",
      slipUrl: "/admin/slips/slip-102.jpg",
      submittedAt: "2025-12-13",
    },
    // ... more payments
  ];
}

export default async function AdminPaymentsPage() {
  const payments = await getPendingPayments();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">Payment Verification</h1>
      <p className="text-gray-600">
        Review submitted payment proofs and update the registration status for
        authors.
      </p>

      <PaymentReviewTable initialPayments={payments} />
    </div>
  );
}

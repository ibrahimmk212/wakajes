// src/components/PaymentStripe.tsx
import Link from "next/link";

export default function PaymentStripe() {
  const fees = [50, 40, 30]; // Example fees in USD

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        Pay Online via Debit/Credit Card
      </h2>
      <p className="text-gray-600 mb-4">Using Stripe Payment Gateway:</p>

      <div className="flex flex-wrap gap-4">
        {fees.map((fee) => (
          // In a real application, this link would trigger a server-side function
          <Link
            key={fee}
            href={`/api/checkout?amount=${fee}&currency=USD`}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 text-center"
          >
            Pay USD ${fee}
          </Link>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-500 italic">
        Note: For online payment, you will be redirected to the gateway website.
      </p>
    </section>
  );
}

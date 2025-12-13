// src/components/PaymentBankTransfer.tsx

export default function PaymentBankTransfer() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        Direct Bank Transfer
      </h2>
      <p className="text-gray-600 mb-3">
        In very few countries (Australia / South Africa / Nigeria / India)
        payment via Bank Transfer is also supported. You can mail us at{" "}
        <a
          href="mailto:globalscientificjournal@gmail.com"
          className="text-blue-600 hover:underline"
        >
          globalscientificjournal@gmail.com
        </a>
        .
      </p>
      <p className="text-gray-600">
        **Western Union / MoneyGram** option is available for all the countries,
        please contact us for details.
      </p>
      {/* You would add bank account details here, likely hidden behind a secure login or button in a real system. */}
    </section>
  );
}

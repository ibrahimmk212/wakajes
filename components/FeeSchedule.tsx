// src/components/FeeSchedule.tsx

export default function FeeSchedule() {
  const charges = [
    { region: "US/Canada", fee: "USD $50" },
    { region: "Europe", fee: "USD $40" },
    {
      region:
        "Asia/Africa (Iraq, Ethiopia, Philippines, Indonesia, and all other Asian/African countries)",
      fee: "USD $30",
    },
    { region: "India", fee: "INR ₹500" },
  ];

  return (
    <section className="border border-gray-200 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Publication Charges
      </h2>
      <div className="space-y-3">
        {charges.map((item) => (
          <p key={item.region} className="text-lg">
            <span className="font-medium text-gray-800">{item.region}:</span>{" "}
            <span className="text-xl font-bold text-green-600">{item.fee}</span>
          </p>
        ))}
      </div>
    </section>
  );
}

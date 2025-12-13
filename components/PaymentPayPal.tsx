// src/components/PaymentPayPal.tsx
import InputText from "./forms/InputText"; // Reusing the InputText component

export default function PaymentPayPal() {
  const paypalOptions = [30, 40, 50]; // Example fees

  const handlePayPalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Initiating PayPal payment (Placeholder).");
    // Actual implementation involves submitting a hidden form to PayPal or calling a server action.
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        Payment via PayPal
      </h2>

      <div className="flex flex-wrap gap-6">
        {paypalOptions.map((fee) => (
          <form
            key={fee}
            onSubmit={handlePayPalSubmit}
            className="border p-4 rounded-lg shadow-sm w-full sm:w-60"
          >
            <h3 className="text-xl font-bold text-center mb-3">
              Pay USD ${fee}
            </h3>

            <InputText
              label="Paper ID"
              name={`paperId-${fee}`}
              required={true}
              helperText=""
              placeholder=""
            />
            <InputText
              label="Author Email ID"
              name={`emailId-${fee}`}
              type="email"
              required={true}
              helperText=""
              placeholder=""
            />

            <button
              type="submit"
              className="w-full mt-4 bg-yellow-500 text-black font-bold py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Pay Now
            </button>
          </form>
        ))}
      </div>
    </section>
  );
}

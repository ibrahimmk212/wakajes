// src/components/ImportantDates.tsx

export default function ImportantDates() {
  const submissionDeadline = "December 31st, 2025";

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Important Dates
        </h2>
        <div className="bg-blue-600 text-white p-6 rounded-lg shadow-xl inline-block">
          <p className="text-lg uppercase">Paper Submission Deadline</p>
          <p className="text-4xl font-extrabold mt-1">{submissionDeadline}</p>
        </div>
      </div>
    </section>
  );
}

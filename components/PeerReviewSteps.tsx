// src/components/PeerReviewSteps.tsx
export default function PeerReviewSteps() {
  const steps = [
    {
      title: "1. Submission & Initial Review",
      description:
        "Authors submit manuscripts to the editor, who forwards them to subject experts for evaluation.",
    },
    {
      title: "2. Evaluation & Feedback",
      description:
        "The paper undergoes a rigorous peer-review process where experts assess its quality, originality, and validity.",
    },
    {
      title: "3. Acceptance or Rejection",
      description:
        "The final decision is communicated to the author, along with feedback for revision if necessary.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {steps.map((step) => (
        <div
          key={step.title}
          className="p-4 border border-gray-200 rounded-lg shadow-sm"
        >
          <h3 className="text-xl font-semibold text-blue-700">{step.title}</h3>
          <p className="mt-1 text-gray-700">{step.description}</p>
        </div>
      ))}
      <div className="mt-6 text-center text-sm text-gray-500 italic">
        For inquiries about the peer-review process, contact us at{" "}
        <a
          href="mailto:editor@globalscientificjournal.com"
          className="text-blue-500 hover:underline"
        >
          ijassworld@gmail.com
        </a>
      </div>
    </div>
  );
}

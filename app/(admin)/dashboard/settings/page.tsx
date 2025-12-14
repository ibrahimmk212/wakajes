// app/(admin)/dashboard/settings/page.tsx (Server Component)
import SystemSettingsForm from "@/components/admin/SystemSettingsForm";

export default function AdminSettingsPage() {
  // 🎯 In a real application, you would fetch initial settings here
  // const initialSettings = await getSystemSettingsFromDB();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">System Configuration</h1>
      <p className="text-gray-600">
        Modify global parameters that control the journal&apos;s identity,
        current publication cycle, and financial details.
      </p>

      {/* Note: The form component currently uses mock initial data. 
                In a production app, you would pass the fetched data as props. */}
      <SystemSettingsForm />
    </div>
  );
}

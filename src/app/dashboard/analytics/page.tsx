import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">Track your business performance and trends.</p>
      <Card>
        <CardHeader><CardTitle>Analytics Dashboard</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Consultations", "Conversion Rate", "Revenue"].map((metric) => (
              <div key={metric} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{metric}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">--</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

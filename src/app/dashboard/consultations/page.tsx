import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function ConsultationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Consultations</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">Review all AI consultation conversations.</p>
      <Card>
        <CardHeader><CardTitle>Consultation History</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-gray-500 dark:text-gray-400">No consultations yet. Embed your widget to start collecting leads.</p></CardContent>
      </Card>
    </div>
  );
}

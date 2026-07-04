import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences.</p>
      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4 max-w-md">
          <Input label="Business Name" placeholder="Your Business Name" />
          <Input label="Email" type="email" placeholder="you@example.com" />
          <Input label="Phone" placeholder="(555) 123-4567" />
          <Button>Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}

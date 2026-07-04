import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Check } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your subscription and billing information.</p>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Current Plan</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Starter</span>
              <Badge variant="success">Active</Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">$29/month · 500 consultations/mo</p>
            <ul className="space-y-2">
              {["Single location", "500 consultations/mo", "Basic AI", "Standard branding"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Check className="size-4 text-emerald-500" />{f}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-4">Manage Subscription</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Professional</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">$79</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Up to 3 locations · 2,000 consultations/mo</p>
            <ul className="space-y-2">
              {["Up to 3 locations", "2,000 consultations/mo", "Custom branding", "Advanced analytics"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Check className="size-4 text-emerald-500" />{f}
                </li>
              ))}
            </ul>
            <Button className="mt-4">Upgrade to Professional</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

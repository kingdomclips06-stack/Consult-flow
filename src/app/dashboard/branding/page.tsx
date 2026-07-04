"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function BrandingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Branding</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize your widget appearance and AI personality.</p>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input label="Primary Color" placeholder="#2563eb" />
            <Input label="Secondary Color" placeholder="#7c3aed" />
            <Input label="Widget Title" placeholder="Chat with us" />
            <Input label="Widget Subtitle" placeholder="Hi! How can we help you today?" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>AI Personality</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Input label="AI Name" placeholder="Alex" />
            <div>
              <label className="text-sm font-medium text-gray-900 dark:text-white">Personality Instructions</label>
              <textarea className="mt-1 flex min-h-[100px] w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2 text-sm" placeholder="Describe how the AI should talk to customers..." />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

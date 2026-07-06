"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfileAction, updateProfileAction } from "../actions";

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getProfileAction().then((org) => {
      if (org) setBusinessName(org.name || "");
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfileAction({ name: businessName });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences.</p>
      <form onSubmit={handleSave}>
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <Input label="Business Name" placeholder="Your Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
            <Button type="submit" disabled={saving}>
              {saving ? <Loader2 className="size-4 mr-1.5 animate-spin" /> : saved ? <Check className="size-4 mr-1.5" /> : null}
              {saving ? "Saving..." : saved ? "Saved!" : "Save Settings"}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Loader2, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { getBrandingAction, saveBrandingAction } from "../actions";

export default function BrandingPage() {
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [secondaryColor, setSecondaryColor] = useState("#7c3aed");
  const [widgetTitle, setWidgetTitle] = useState("Chat with us");
  const [widgetSubtitle, setWidgetSubtitle] = useState("Hi! How can we help you today?");
  const [aiName, setAiName] = useState("Alex");
  const [aiPersonality, setAiPersonality] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getBrandingAction().then((b) => {
      if (b) {
        if (b.primaryColor) setPrimaryColor(b.primaryColor);
        if (b.secondaryColor) setSecondaryColor(b.secondaryColor);
        if (b.widgetTitle) setWidgetTitle(b.widgetTitle);
        if (b.widgetSubtitle) setWidgetSubtitle(b.widgetSubtitle);
        if (b.aiName) setAiName(b.aiName);
        if (b.aiPersonality) setAiPersonality(b.aiPersonality);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await saveBrandingAction({
        primaryColor,
        secondaryColor,
        widgetTitle,
        widgetSubtitle,
        aiName,
        aiPersonality,
      });
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Branding</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Customize your widget appearance and AI personality.</p>
      <form onSubmit={handleSave}>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Input label="Primary Color" placeholder="#2563eb" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                </div>
                <div className="size-10 rounded-lg border border-gray-200 dark:border-gray-700 mb-1" style={{ backgroundColor: primaryColor }} />
              </div>
              <div className="flex gap-3 items-end">
                <div className="flex-1">
                  <Input label="Secondary Color" placeholder="#7c3aed" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                </div>
                <div className="size-10 rounded-lg border border-gray-200 dark:border-gray-700 mb-1" style={{ backgroundColor: secondaryColor }} />
              </div>
              <Input label="Widget Title" placeholder="Chat with us" value={widgetTitle} onChange={(e) => setWidgetTitle(e.target.value)} />
              <Input label="Widget Subtitle" placeholder="Hi! How can we help you today?" value={widgetSubtitle} onChange={(e) => setWidgetSubtitle(e.target.value)} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>AI Personality</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input label="AI Name" placeholder="Alex" value={aiName} onChange={(e) => setAiName(e.target.value)} />
              <div>
                <label className="text-sm font-medium text-gray-900 dark:text-white">Personality Instructions</label>
                <textarea
                  className="mt-1 flex min-h-[120px] w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe how the AI should talk to customers..."
                  value={aiPersonality}
                  onChange={(e) => setAiPersonality(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? <Loader2 className="size-4 mr-1.5 animate-spin" /> : saved ? <Check className="size-4 mr-1.5" /> : null}
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

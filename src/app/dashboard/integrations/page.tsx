"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Copy, Check, Link as LinkIcon, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getBookingLinkAction, saveBookingLinkAction } from "../actions";

export default function IntegrationsPage() {
  const [copied, setCopied] = useState(false);
  const [bookingLink, setBookingLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookingLinkAction().then((url) => {
      if (url) setBookingLink(url);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(
        '<script src="https://consultflow.online/widget.js" data-business="your-slug" defer></script>'
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const saveBookingLink = async () => {
    setSaving(true);
    try {
      await saveBookingLinkAction(bookingLink);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><div className="size-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Embed your AI consultation widget on your website.</p>

      {/* Embed Code */}
      <Card>
        <CardHeader><CardTitle>Embed Code</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm text-gray-600 dark:text-gray-400 break-all select-all">
            &lt;script src=&quot;https://consultflow.online/widget.js&quot; data-business=&quot;your-slug&quot; defer&gt;&lt;/script&gt;
          </div>
          <Button variant="secondary" onClick={copyCode}>
            {copied ? <Check className="size-4 mr-1.5" /> : <Copy className="size-4 mr-1.5" />}
            {copied ? "Copied!" : "Copy Code"}
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Paste this code just before the closing &lt;/body&gt; tag on your website. The widget will appear as a floating chat bubble.
          </p>
        </CardContent>
      </Card>

      {/* Booking Link */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="size-4" />
            Booking Link
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Paste your Square (or other) booking page URL here. When customers finish an AI consultation, they&apos;ll be sent here to book.
          </p>
          <div className="flex gap-3">
            <Input
              placeholder="https://squareup.com/appointments/..."
              value={bookingLink}
              onChange={(e) => setBookingLink(e.target.value)}
              className="flex-1"
            />
            <Button onClick={saveBookingLink} disabled={saving}>
              {saving ? "Saving..." : saved ? "Saved!" : "Save"}
            </Button>
          </div>
          {bookingLink && (
            <a href={bookingLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
              <ExternalLink className="size-3" /> Test your booking link
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

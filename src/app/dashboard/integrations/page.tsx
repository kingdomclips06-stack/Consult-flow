import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Copy } from "lucide-react";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Embed your AI consultation widget on your website.</p>
      <Card>
        <CardHeader>
          <CardTitle>Embed Code</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm text-gray-600 dark:text-gray-400 break-all">
            &lt;script src=&quot;https://consultflow.ai/widget.js&quot; data-business=&quot;your-slug&quot; defer&gt;&lt;/script&gt;
          </div>
          <Button variant="secondary">
            <Copy className="size-4" /> Copy Code
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Paste this code just before the closing &lt;/body&gt; tag on your website. The widget will appear as a floating chat bubble.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

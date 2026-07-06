"use client";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getConsultationsAction } from "../actions";
type Consultation = { id: string; customerName: string | null; status: string; estimatedPrice: string | null; bookedAppointment: boolean; createdAt: Date };
export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getConsultationsAction().then(d => { setConsultations(d); setLoading(false); }).catch(() => setLoading(false)); }, []);
  if (loading) return <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>;
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Consultations</h1><p className="text-sm text-muted-foreground mt-1">Review all AI consultation conversations.</p></div>
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" /><Input className="pl-9" placeholder="Search consultations..." /></div>
      {consultations.length === 0 ? (
        <div className="py-20 text-center text-sm text-muted-foreground">No consultations yet. Embed your widget to start collecting leads.</div>
      ) : (
        consultations.map(c => (
          <div key={c.id} className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-sm font-medium">{c.customerName?.charAt(0) || "?"}</div>
              <div><p className="text-sm font-medium text-foreground">{c.customerName || "Anonymous"}</p><p className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()} &middot; {c.status}</p></div>
            </div>
            <Badge variant={c.bookedAppointment ? "success" : "default"}>{c.bookedAppointment ? "Booked" : c.status}</Badge>
          </div>
        ))
      )}
    </div>
  );
}

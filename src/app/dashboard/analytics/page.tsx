"use client";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardStatsAction } from "../actions";
export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getDashboardStatsAction().then(d => { setStats(d); setLoading(false); }).catch(() => setLoading(false)); }, []);
  if (loading) return <div className="flex justify-center py-20"><Loader2 className="size-6 animate-spin text-muted-foreground" /></div>;
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
      <p className="text-sm text-muted-foreground mt-1">Track your business performance and trends.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Consultations</p><p className="text-2xl font-bold text-foreground">{stats?.consultationsCount || 0}</p></div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Today</p><p className="text-2xl font-bold text-foreground">{stats?.todayCount || 0}</p></div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Booked</p><p className="text-2xl font-bold text-foreground">{stats?.bookedCount || 0}</p></div></CardContent></Card>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card><CardContent className="p-5"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Services</p><p className="text-2xl font-bold text-foreground">{stats?.servicesCount || 0}</p></div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Employees</p><p className="text-2xl font-bold text-foreground">{stats?.employeesCount || 0}</p></div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="space-y-1"><p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Conversion Rate</p><p className="text-2xl font-bold text-foreground">{stats?.consultationsCount ? Math.round((stats.bookedCount / stats.consultationsCount) * 100) : 0}%</p></div></CardContent></Card>
      </div>
    </div>
  );
}

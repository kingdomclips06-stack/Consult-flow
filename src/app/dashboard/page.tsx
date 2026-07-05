"use client";

import { MessageSquare, Calendar, DollarSign, TrendingUp, Scissors, ArrowUpRight, Loader2 } from "lucide-react";
import { StatsCard } from "~/components/dashboard/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDashboardStatsAction, getConsultationsAction } from "~/app/dashboard/actions";

type Consultation = {
  id: string;
  customerName: string | null;
  status: string;
  estimatedPrice: string | null;
  bookedAppointment: boolean;
  createdAt: Date;
};

type DashboardStats = {
  consultationsCount: number;
  todayCount: number;
  bookedCount: number;
  servicesCount: number;
  services: { id: string; name: string; price: string }[];
  employeesCount: number;
};

function formatTimeAgo(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function getInitials(name: string | null) {
  if (!name) return "?";
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [statsData, consultationsData] = await Promise.all([
          getDashboardStatsAction(),
          getConsultationsAction(),
        ]);
        setStats(statsData);
        setConsultations(consultationsData);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="size-6 animate-spin text-gray-400" />
      </div>
    );
  }

  const conversionRate = stats && stats.consultationsCount > 0
    ? Math.round((stats.bookedCount / stats.consultationsCount) * 100)
    : 0;

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Your AI consultation hub
          </p>
        </div>
        <Button size="sm">
          <MessageSquare className="size-4" />
          <span className="hidden sm:inline ml-1.5">New Consultation</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <StatsCard title="Today" value={stats?.todayCount ?? 0} change={0} trend="up" icon={MessageSquare} subtitle="Consultations" />
        <StatsCard title="Total" value={stats?.consultationsCount ?? 0} icon={Calendar} subtitle="All time" />
        <StatsCard title="Booked" value={stats?.bookedCount ?? 0} icon={DollarSign} subtitle="Appointments" />
        <StatsCard title="Conversion" value={`${conversionRate}%`} change={conversionRate > 50 ? 5 : -5} trend={conversionRate > 50 ? "up" : "down"} icon={TrendingUp} subtitle="Booking rate" />
        <StatsCard title="Services" value={stats?.servicesCount ?? 0} icon={Scissors} subtitle="Active" />
      </div>

      {/* Recent Consultations & Appointments */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Consultations</CardTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Latest AI-powered consultations</p>
            </div>
            <Link href="/dashboard/consultations">
              <Button variant="ghost" size="sm">
                View all <ArrowUpRight className="size-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {consultations.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <MessageSquare className="size-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No consultations yet</p>
                <p className="text-xs mt-1">They&apos;ll appear here once customers start using your widget</p>
              </div>
            ) : (
              <div className="space-y-2">
                {consultations.slice(0, 5).map((c) => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg p-2.5 md:p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium">
                        {getInitials(c.customerName)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {c.customerName || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTimeAgo(c.createdAt)} &middot; {c.status.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {c.estimatedPrice && (
                        <span className="text-sm font-medium text-gray-900 dark:text-white hidden sm:block">
                          ${parseFloat(c.estimatedPrice).toFixed(0)}
                        </span>
                      )}
                      <Badge variant={c.bookedAppointment ? "success" : c.status === "completed" ? "success" : "warning"}>
                        {c.bookedAppointment ? "Booked" : c.status === "completed" ? "Done" : "Open"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Services</CardTitle>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Quick overview of what you offer</p>
          </CardHeader>
          <CardContent>
            {stats && stats.services.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <Scissors className="size-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No services added yet</p>
                <Link href="/dashboard/services">
                  <Button variant="outline" size="sm" className="mt-3">
                    Add your first service
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {stats?.services.slice(0, 5).map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg p-2.5 md:p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex size-8 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                        <Scissors className="size-4" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{s.name}</p>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">${parseFloat(s.price).toFixed(0)}</span>
                  </div>
                ))}
                {stats && stats.services.length > 5 && (
                  <Link href="/dashboard/services" className="block text-center text-sm text-blue-600 hover:text-blue-700 pt-2">
                    View all {stats.services.length} services
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

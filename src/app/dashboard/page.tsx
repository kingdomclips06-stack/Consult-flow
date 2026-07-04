"use client";

import { MessageSquare, Calendar, DollarSign, TrendingUp, Scissors, ArrowUpRight } from "lucide-react";
import { StatsCard } from "~/components/dashboard/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const recentConsultations = [
  { id: "1", name: "Alex Johnson", service: "Haircut & Styling", time: "10 min ago", status: "completed", price: "$85" },
  { id: "2", name: "Sam Martinez", service: "Beard Trim", time: "25 min ago", status: "completed", price: "$35" },
  { id: "3", name: "Jordan Lee", service: "Full Color", time: "1 hour ago", status: "in-progress", price: "$150" },
  { id: "4", name: "Taylor Smith", service: "Hot Towel Shave", time: "2 hours ago", status: "completed", price: "$65" },
  { id: "5", name: "Morgan Wu", service: "Hair Treatment", time: "3 hours ago", status: "completed", price: "$95" },
];

const upcomingAppointments = [
  { id: "1", name: "Casey Brown", service: "Haircut", time: "2:30 PM", employee: "Mike", status: "confirmed" },
  { id: "2", name: "Riley Davis", service: "Color & Cut", time: "3:00 PM", employee: "Sarah", status: "confirmed" },
  { id: "3", name: "Quinn Wilson", service: "Beard Trim", time: "4:15 PM", employee: "Mike", status: "pending" },
];

const popularServices = [
  { name: "Classic Haircut", bookings: 42, revenue: "$3,570" },
  { name: "Beard Trim", bookings: 28, revenue: "$980" },
  { name: "Full Color", bookings: 18, revenue: "$2,700" },
  { name: "Hot Towel Shave", bookings: 15, revenue: "$975" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <Button>
          <MessageSquare className="size-4" />
          New Consultation
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatsCard title="Today's Consultations" value="12" change={8} trend="up" icon={MessageSquare} subtitle="vs. yesterday" />
        <StatsCard title="Upcoming" value="8" change={3} trend="up" icon={Calendar} subtitle="Next 24 hours" />
        <StatsCard title="Revenue" value="$1,280" change={12} trend="up" icon={DollarSign} subtitle="Today" />
        <StatsCard title="Conversion Rate" value="74%" change={5} trend="up" icon={TrendingUp} subtitle="Consultation to Booking" />
        <StatsCard title="Active Services" value="14" icon={Scissors} subtitle="4 categories" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Consultations</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Latest AI-powered consultations</p>
            </div>
            <Link href="/dashboard/consultations">
              <Button variant="ghost" size="sm">
                View all <ArrowUpRight className="size-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentConsultations.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      {c.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{c.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{c.service} &middot; {c.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={c.status === "completed" ? "success" : "warning"}>
                      {c.status === "completed" ? "Completed" : "In Progress"}
                    </Badge>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{c.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Appointments</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Scheduled for today</p>
            </div>
            <Button variant="ghost" size="sm">View all <ArrowUpRight className="size-3" /></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingAppointments.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                      {a.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{a.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{a.service} &middot; with {a.employee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{a.time}</span>
                    <Badge variant={a.status === "confirmed" ? "success" : "warning"}>{a.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Services</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Top performing services this month</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularServices.map((service) => (
              <div key={service.name} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{service.name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{service.bookings} bookings</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{service.revenue}</span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${(service.bookings / 42) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
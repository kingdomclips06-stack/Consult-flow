"use client";

import { Sidebar } from "~/components/layout/Sidebar";
import { Navbar } from "~/components/layout/Navbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-60">
        <Navbar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
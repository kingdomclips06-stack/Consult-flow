"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Scissors,
  Users,
  HelpCircle,
  Palette,
  Settings,
  CreditCard,
  Code2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: MessageSquare, label: "Consultations", href: "/dashboard/consultations" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Scissors, label: "Services", href: "/dashboard/services" },
  { icon: Users, label: "Employees", href: "/dashboard/employees" },
  { icon: HelpCircle, label: "FAQs", href: "/dashboard/faqs" },
  { icon: Palette, label: "Branding", href: "/dashboard/branding" },
  { icon: Code2, label: "Integrations", href: "/dashboard/integrations" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-dvh flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-gray-200 dark:border-gray-800 px-4">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
          <span className="text-sm font-bold text-white">CF</span>
        </div>
        {!collapsed && (
          <span className="text-sm font-semibold text-gray-900 dark:text-white">ConsultFlow</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        </button>
      </div>
    </aside>
  );
}
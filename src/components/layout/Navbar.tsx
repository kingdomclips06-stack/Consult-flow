"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { useEffect, useState } from "react";

export function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl px-4 md:px-6">
      {/* Mobile hamburger */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="md:hidden"
        aria-label="Open menu"
      >
        <Menu className="size-5 text-gray-500 dark:text-gray-400" />
      </Button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label="Toggle theme"
      >
        {mounted && resolvedTheme === "dark" ? (
          <Sun className="size-4 text-gray-500 dark:text-gray-400" />
        ) : (
          <Moon className="size-4 text-gray-500 dark:text-gray-400" />
        )}
      </Button>

      {/* Notifications */}
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell className="size-4 text-gray-500 dark:text-gray-400" />
      </Button>

      {/* User avatar */}
      <Avatar className="size-8 cursor-pointer">
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </header>
  );
}

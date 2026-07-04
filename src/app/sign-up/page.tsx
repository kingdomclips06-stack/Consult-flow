"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with Supabase auth
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-[#0b0f1a] dark:via-blue-950/10 dark:to-[#0b0f1a] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/25">
            <span className="text-sm font-bold text-white">CF</span>
          </div>
          <span className="text-lg font-bold text-foreground">ConsultFlow</span>
        </Link>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription>Start converting more bookings today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Business Name"
                type="text"
                placeholder="Your Barbershop"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                helperText="At least 8 characters"
              />
              <Button type="submit" className="w-full shadow-lg shadow-blue-600/25">
                Start Free Trial
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Already have an account?{" "}
                <Link href="/sign-in" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          No credit card required &middot; 14-day free trial
        </p>
      </div>
    </div>
  );
}
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } }
    });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/sign-in?verified=true");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Start your 14-day free trial</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <Input label="Full Name" placeholder="Marcus Johnson" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Business Name" placeholder="Marcus Barber Shop" value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
            <Input label="Email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Password" type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating account..." : "Get Started"}</Button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">Already have an account? <a href="/sign-in" className="text-blue-600 hover:underline">Sign in</a></p>
        </CardContent>
      </Card>
    </div>
  );
}

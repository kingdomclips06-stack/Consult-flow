import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  MessageSquare,
  Sparkles,
  Camera,
  Palette,
  Code2,
  Check,
  Star,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-[#0b0f1a] dark:via-blue-950/10 dark:to-[#0b0f1a]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/25">
                <span className="text-sm font-bold text-white">CF</span>
              </div>
              <span className="text-lg font-bold text-foreground">ConsultFlow</span>
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/sign-in" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-blue-100/60 via-transparent to-transparent dark:from-blue-900/20" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6 animate-fade-in">
              <Sparkles className="size-3.5 text-blue-500" />
              AI-Powered Barber Consultation Engine
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance animate-fade-in-up">
              Your AI Barber Consultant.
              <br />
              <span className="gradient-text">Convert more bookings.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Replace static booking forms with an intelligent chat widget that recommends the perfect service,
              collects photos, and drives bookings — all while making your barbershop look premium.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Link href="/sign-up">
                <Button size="xl" className="text-base px-8 shadow-lg shadow-blue-600/25">
                  Start Free Trial
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="xl" className="text-base px-8">
                  See How It Works
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "0.3s" }}>
              No credit card required &middot; 14-day free trial &middot; Set up in 3 minutes
            </p>
          </div>

          {/* Widget Preview */}
          <div className="mt-16 mx-auto max-w-3xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-500" />
                  <div className="size-3 rounded-full bg-yellow-500" />
                  <div className="size-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-2 text-xs text-muted-foreground">yourbarbershop.com</span>
              </div>
              <div className="p-6 sm:p-8 text-left">
                <div className="flex gap-3 sm:gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-xs font-bold text-white shadow-lg">
                    AI
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="rounded-2xl rounded-tl-none bg-muted px-4 py-3">
                      <p className="text-sm font-medium text-foreground">Hey! I&apos;m your AI consultant. 👋</p>
                      <p className="text-sm text-muted-foreground mt-1">What kind of cut are you looking for today?</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground hover:bg-muted cursor-pointer transition-colors">Classic Cut ✂️</span>
                      <span className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground hover:bg-muted cursor-pointer transition-colors">Beard Trim 🪒</span>
                      <span className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground hover:bg-muted cursor-pointer transition-colors">Hot Towel 🔥</span>
                      <span className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground hover:bg-muted cursor-pointer transition-colors">Full Service 💈</span>
                    </div>
                    <div className="rounded-2xl rounded-tl-none bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 px-4 py-3">
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">✨ Recommended Service</p>
                      <p className="text-sm text-blue-600/70 dark:text-blue-400/70 mt-1">
                        Classic Haircut + Hot Towel Shave &mdash; $55 &middot; 45 min
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ["3x", "Higher Conversion"],
              ["60%", "Faster Booking"],
              ["24/7", "AI Availability"],
              ["99.9%", "Uptime"],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text">{value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
              <Sparkles className="size-3.5 text-blue-500" />
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Everything you need to <span className="gradient-text">grow your barbershop</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              From AI consultations to powerful analytics, we give you the tools to convert more visitors into loyal customers.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: "AI Consultation Bot",
                desc: "Engage customers in natural conversations. Qualify leads, recommend services, and collect photos — no receptionist needed.",
                color: "from-blue-600 to-indigo-600",
              },
              {
                icon: Sparkles,
                title: "Smart Recommendations",
                desc: "AI matches customer needs to your exact services and pricing. Naturally upsells and increases average ticket value.",
                color: "from-purple-600 to-pink-600",
              },
              {
                icon: Camera,
                title: "Photo Collection",
                desc: "Customers can upload reference photos during the consultation. Get exactly what they want, every time.",
                color: "from-emerald-600 to-teal-600",
              },
              {
                icon: Palette,
                title: "White-Label Branding",
                desc: "Your logo, your colors, your AI personality. The widget looks like it's part of your barbershop website.",
                color: "from-orange-600 to-rose-600",
              },
              {
                icon: Code2,
                title: "Easy Embed",
                desc: "One line of code. Works with any website. Your AI consultant is live in under 3 minutes.",
                color: "from-cyan-600 to-blue-600",
              },
              {
                icon: Star,
                title: "Conversion Analytics",
                desc: "Track consultations, bookings, popular services, and revenue. Know exactly what's working.",
                color: "from-violet-600 to-purple-600",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className={`inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg mb-4`}>
                  <feature.icon className="size-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 sm:py-28 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Get started in <span className="gradient-text">3 simple steps</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              From setup to your first booking in minutes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Add Your Services",
                desc: "Import your menu, pricing, and barber availability. The AI learns your entire catalog in seconds.",
              },
              {
                step: "02",
                title: "Customize Your AI",
                desc: "Set your brand colors, logo, and AI personality. Your widget matches your barbershop perfectly.",
              },
              {
                step: "03",
                title: "Embed & Convert",
                desc: "Copy one line of code. Your AI consultant is live on your site, booking appointments 24/7.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center p-8">
                <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-xl font-bold shadow-lg shadow-blue-600/25">
                  {item.step}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground mb-4">
              Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Simple, transparent <span className="gradient-text">pricing</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Start free, upgrade when you grow. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Plan */}
            <div className="relative rounded-2xl border border-border bg-card p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Starter</h3>
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Most popular</span>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Perfect for solo barbers getting started.</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Single location",
                  "500 consultations/mo",
                  "Basic AI consultant",
                  "Standard branding",
                  "Email support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="size-4 text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up">
                <Button className="w-full">Start Free Trial</Button>
              </Link>
            </div>

            {/* Professional Plan */}
            <div className="relative rounded-2xl border-2 border-blue-500/30 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent p-8 shadow-lg shadow-blue-600/10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 text-xs font-medium text-white shadow-lg">
                  <Sparkles className="size-3" />
                  Best Value
                </span>
              </div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <h3 className="text-xl font-bold text-foreground">Professional</h3>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-foreground">$79</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">For growing barbershops and teams.</p>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to 3 locations",
                  "2,000 consultations/mo",
                  "Advanced AI with personality",
                  "Custom white-label branding",
                  "Analytics dashboard",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                    <Check className="size-4 text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up">
                <Button className="w-full shadow-lg shadow-blue-600/25">Start Free Trial</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to turn browsers into <span className="gradient-text">booked appointments?</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Join barbershops using ConsultFlow AI to convert more visitors into loyal customers. No credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="xl" className="text-base px-8 shadow-lg shadow-blue-600/25">
                  Start Your Free Trial
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" size="xl" className="text-base px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
                <span className="text-xs font-bold text-white">CF</span>
              </div>
              <span className="text-sm font-semibold text-foreground">ConsultFlow AI</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="/sign-in" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Sign In
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ConsultFlow AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
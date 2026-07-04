import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ConsultFlow AI — AI Booking Consultant for Barbers",
  description:
    "Your AI Barber Consultant. Convert more bookings with an intelligent chat widget that recommends the perfect service. White-label, embeddable, and built for barbershops.",
  keywords: [
    "AI booking assistant",
    "barber shop AI consultant",
    "hair salon booking widget",
    "appointment scheduling AI",
    "barber consultation AI",
    "service business automation",
    "white label booking widget",
  ],
  openGraph: {
    title: "ConsultFlow AI — AI Booking Consultant for Barbers",
    description:
      "Your AI Barber Consultant. Convert more bookings with an intelligent chat widget that recommends the perfect service.",
    type: "website",
    siteName: "ConsultFlow AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ConsultFlow AI — AI Booking Consultant for Barbers",
    description:
      "Your AI Barber Consultant. Convert more bookings with an intelligent chat widget that recommends the perfect service.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
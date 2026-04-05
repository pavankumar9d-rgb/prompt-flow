import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prompt-Flow — Elite Engineering Intelligence System",
    template: "%s | Prompt-Flow",
  },
  description:
    "The specialized engineering layer for Bun, Next.js, and TypeScript. Eliminate trial-and-error debugging with deterministic, high-quality AI outputs for senior engineers.",
  keywords: ["bun.js", "typescript", "engineering prompts", "deterministic ai", "developer tools", "drizzle", "elysia"],
  authors: [{ name: "Prompt-Flow" }],
  openGraph: {
    type: "website",
    title: "Prompt-Flow — Elite Engineering Intelligence System",
    description: "Eliminate guesswork in Bun/TypeScript development. High-fidelity AI engineering prompts.",
    siteName: "Prompt-Flow",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prompt-Flow",
    description: "Elite Engineering Intelligence System for senior devs.",
  },
  robots: { index: true, follow: true },
};

import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#09090B] text-[#FAFAFA] min-h-screen`}
      >
        {children}
        <Toaster closeButton theme="dark" position="top-center" richColors />
      </body>
    </html>
  );
}

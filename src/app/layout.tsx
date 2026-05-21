import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { AuthPanel } from "@/components/AuthPanel";
import { InitialLoader } from "@/components/InitialLoader";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const siteUrl = getSiteUrl();
const siteTitle = "2026 Soccer World Cup";
const siteDescription =
  "World Cup history, data, 2026 score predictions, and fan stories. Built for North America 2026.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | World Cup Soccer" },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <InitialLoader />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-pitch focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-neon focus:shadow-neon"
        >
          Skip to main content
        </a>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-pitch/90 px-4 py-3 backdrop-blur-md md:px-8">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="text-sm font-semibold text-white transition hover:text-neon"
            >
              World Cup Soccer
            </Link>
            <AuthPanel />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

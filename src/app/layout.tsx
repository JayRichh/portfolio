import React from "react";
import { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
import { RouteTransition } from "../components/route-transition";
import { PageContainer } from "../components/page-container";
import { SiteHeader } from "../components/site-header";
import { Analytics } from "@vercel/analytics/next";
import { GitHubDataProvider } from "../components/github-data-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jayden Richardson | Full Stack Developer",
    template: "%s | Jayden Richardson",
  },
  description:
    "Full Stack Web Developer with a background in Industrial Electrical Engineering",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: { url: "/apple-touch-icon.png", type: "image/png" },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GitHubDataProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">
                <RouteTransition>
                  <PageContainer>{children}</PageContainer>
                </RouteTransition>
              </main>
            </div>
          </GitHubDataProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

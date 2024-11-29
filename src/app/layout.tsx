import React from "react";
import { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
import { RouteTransition } from "../components/route-transition";
import { PageContainer } from "../components/page-container";
import { SiteHeader } from "../components/site-header";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Jayden Richardson | Full Stack Developer",
    template: "%s | Jayden Richardson",
  },
  description:
    "Full Stack Web Developer with a background in Industrial Electrical Engineering",
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
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <RouteTransition>
                <PageContainer>{children}</PageContainer>
              </RouteTransition>
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

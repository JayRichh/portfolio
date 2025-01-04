import React from "react";
import { ThemeProvider } from "../components/theme-provider";
import { RouteTransition } from "../components/route-transition";
import { PageContainer } from "../components/page-container";
import { SiteHeader } from "../components/site-header";
import { Analytics } from "@vercel/analytics/next";
import { GitHubDataProvider } from "../components/github-data-provider";
import "./globals.css";

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

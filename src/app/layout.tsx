import type { Metadata } from "next";
import React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import { RouteTransition } from "../components/route-transition";
import { PageContainer } from "../components/page-container";
import { SiteHeader } from "../components/site-header";
import { Analytics } from "@vercel/analytics/next";
import { GitHubDataProvider } from "../components/github-data-provider";
import "./globals.css";

export { metadata } from "./metadata";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "sans-serif"],
});

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full`}>
      <head>
        <link rel="preconnect" href="https://jayrich.dev" />
        <link rel="dns-prefetch" href="https://jayrich.dev" />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <meta 
          name="msvalidate.01" 
          content={process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION} 
        />
        <meta
          name="yandex-verification"
          content={process.env.NEXT_PUBLIC_YANDEX_SITE_VERIFICATION}
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased min-h-full flex flex-col">
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

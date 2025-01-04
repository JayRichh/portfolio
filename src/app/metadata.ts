import { Metadata } from "next";

const metadataBase = new URL("https://jayrich.dev");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Jayden Richardson | Web Developer",
    template: "%s | Jayden Richardson",
  },
  description: "Web developer working with React, TypeScript, and modern web technologies",
  applicationName: "Jayden Richardson Portfolio",
  keywords: [
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Frontend Development",
    "Web Applications",
    "UI Development",
  ],
  authors: [{ name: "Jayden Richardson", url: "https://github.com/jayrich88" }],
  creator: "Jayden Richardson",
  publisher: "Jayden Richardson",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Jayden Richardson",
    locale: "en_US",
    url: "https://jayrich.dev",
    title: {
      default: "Jayden Richardson | Web Developer",
      template: "%s | Jayden Richardson",
    },
    description: "Web developer working with React, TypeScript, and modern web technologies",
    images: [
      {
        url: "/images/main1.png",
        width: 1200,
        height: 630,
        alt: "Jayden Richardson Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Jayden Richardson | Web Developer",
      template: "%s | Jayden Richardson",
    },
    description: "Web developer working with React, TypeScript, and modern web technologies",
    images: ["/images/main1.png"],
    creator: "@jayrich88",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "google-site-verification-code", // Add your verification code
  },
};

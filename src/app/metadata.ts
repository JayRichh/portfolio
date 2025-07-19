import { Metadata } from "next";

const metadataBase = new URL("https://jayrich.dev");

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Jayden Richardson | Full Stack Web Developer",
    template: "%s | Jayden Richardson",
  },
  description:
    "Full Stack Web Developer specializing in React, TypeScript, and modern web technologies. Explore my portfolio of interactive web applications, development tools, and technical resources.",
  applicationName: "Jayden Richardson Portfolio",
  keywords: [
    // Core Skills
    "Web Development",
    "Full Stack Development",
    "React Development",
    "TypeScript Programming",
    "JavaScript Development",
    "Next.js Applications",
    "Frontend Development",
    "Backend Development",

    // Technical Expertise
    "Web Applications",
    "UI Development",
    "API Integration",
    "Cloud Services",
    "DevOps Practices",
    "Web Performance",
    "Responsive Design",
    "Web Accessibility",

    // Portfolio Sections
    "Developer Portfolio",
    "Code Examples",
    "Project Showcase",
    "Technical Blog",
    "Learning Resources",
    "Development Tools",
    "Interactive Demos",
    "Web Development Projects",

    // Technologies
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "TailwindCSS",
    "REST APIs",
    "GraphQL",

    // Industry Terms
    "Software Engineering",
    "Web Development Services",
    "Technical Consulting",
    "Code Quality",
    "Best Practices",
    "Modern Web Development",
    "Professional Developer",
    "Technical Solutions",
  ],
  authors: [{ name: "Jayden Richardson", url: "https://github.com/jayrichh" }],
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
    siteName: "Jayden Richardson Portfolio",
    locale: "en_US",
    url: "https://jayrich.dev",
    title: {
      default: "Jayden Richardson | Full Stack Web Developer",
      template: "%s | Jayden Richardson",
    },
    description:
      "Full Stack Web Developer specializing in React, TypeScript, and modern web technologies. Explore my portfolio of interactive web applications, development tools, and technical resources.",
    images: [
      {
        url: "/JRLOGO.png",
        width: 512,
        height: 512,
        alt: "JR - Jayden Richardson Logo",
        type: "image/png",
      },
      {
        url: "/logo_bg_remove.png",
        width: 1200,
        height: 630,
        alt: "Jayden Richardson Portfolio - Featured Projects",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Jayden Richardson | Full Stack Web Developer",
      template: "%s | Jayden Richardson",
    },
    description:
      "Full Stack Web Developer specializing in React, TypeScript, and modern web technologies. Explore my portfolio of interactive web applications, development tools, and technical resources.",
    images: ["/JRLOGO.png", "/logo_bg_remove.png"],
    creator: "@jayrich88",
    site: "@jayrich88",
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

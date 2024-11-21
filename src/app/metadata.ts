import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Jayden Richardson | Full Stack Developer",
    template: "%s | Jayden Richardson",
  },
  description:
    "Full Stack Web Developer with a background in Industrial Electrical Engineering",
  keywords: [
    "Full Stack Developer",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
  ],
  authors: [{ name: "Jayden Richardson" }],
  creator: "Jayden Richardson",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jayrich.dev",
    title: "Jayden Richardson | Full Stack Developer",
    description:
      "Full Stack Web Developer with a background in Industrial Electrical Engineering",
    siteName: "Jayden Richardson Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayden Richardson | Full Stack Developer",
    description:
      "Full Stack Web Developer with a background in Industrial Electrical Engineering",
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
};

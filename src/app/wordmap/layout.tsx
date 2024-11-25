import React from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-montserrat",
});

export default function WordMapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`relative w-full ${montserrat.variable}`}>{children}</div>
  );
}

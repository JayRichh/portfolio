import React from "react";
import { cn } from "../../../utils/cn";

interface TechTagProps {
  children: React.ReactNode;
}

export function TechTag({ children }: TechTagProps) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 sm:px-3 md:px-4 py-1.5 md:py-2 rounded-full",
        "text-sm md:text-base tracking-[0.03em] font-medium",
        "bg-gray-100 dark:bg-white/15",
        "text-gray-800 dark:text-white/95",
        "hover:bg-gray-200 dark:hover:bg-white/25",
        "mr-2 mb-2 md:mr-3 md:mb-3 transition-all",
        "border border-gray-200 dark:border-white/30",
        "backdrop-blur-sm",
        "[text-rendering:geometricPrecision]",
        "[-webkit-font-smoothing:antialiased]",
      )}
    >
      {children}
    </span>
  );
}

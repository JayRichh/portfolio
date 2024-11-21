"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./darkmode-toggle";
import { ANIMATION_CONFIG } from "../app/code/_constants";
import { SiteNavigationItem } from "./site-navigation-item";
import { cn } from "../utils";

const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/code", label: "Code" },
  { href: "/about", label: "About" },
  { href: "/learnings", label: "Learnings" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: ANIMATION_CONFIG.DURATION,
        ease: "easeOut",
      }}
    >
      <div className={cn(
        "container flex h-16 items-center justify-between",
        "px-4 md:px-6 lg:px-8",
        "transition-all duration-200 ease-in-out"
      )}>
        <nav className="flex items-center space-x-1">
          {NAVIGATION_ITEMS.map(({ href, label }) => (
            <SiteNavigationItem key={href} path={href}>
              {label}
            </SiteNavigationItem>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </motion.header>
  );
}

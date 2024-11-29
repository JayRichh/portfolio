"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ANIMATION_CONFIG } from "../app/code/_constants";
import { SiteNavigation } from "./site-navigation";
import { cn } from "../utils";
import { useDialogStore } from "../lib/dialog-store";

export function SiteHeader() {
  const pathname = usePathname();
  const isDialogOpen = useDialogStore((state) => state.isOpen);
  const isCodeRoute = pathname?.startsWith("/code");
  const shouldHide = isCodeRoute && isDialogOpen;

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-[100] w-full",
        "border-b border-border/40",
        "bg-background/80 backdrop-blur-md",
        "shadow-sm shadow-foreground/5",
        "supports-[backdrop-filter]:bg-background/60",
        shouldHide && "hidden"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: ANIMATION_CONFIG.DURATION,
        ease: "easeOut",
      }}
    >
      <div
        className={cn(
          "container flex h-16 items-center",
          "px-4 md:px-6 lg:px-8",
          "transition-all duration-200 ease-in-out",
        )}
      >
        <SiteNavigation />
      </div>
    </motion.header>
  );
}

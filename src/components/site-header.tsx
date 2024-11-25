"use client";

import React from "react";
import { motion } from "framer-motion";
import { ANIMATION_CONFIG } from "../app/code/_constants";
import { SiteNavigation } from "./site-navigation";
import { cn } from "../utils";

export function SiteHeader() {
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

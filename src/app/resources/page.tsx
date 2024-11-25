"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Card = ({ href, title, description }: { href: string; title: string; description: string }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link 
      href={href}
      className={cn(
        "group relative overflow-hidden rounded-xl p-8",
        "border border-border/50",
        "bg-background/30 backdrop-blur-sm",
        "transition-all duration-300 hover:scale-[1.02]",
        "hover:border-primary/50 hover:bg-background/50"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-2xl font-bold text-primary">{title}</h2>
        <p className={cn(
          "text-lg",
          mounted && (theme === "dark" ? "text-gray-300" : "text-gray-600")
        )}>
          {description}
        </p>
      </motion.div>
    </Link>
  );
};

export default function ResourcesPage() {
  return (
    <div className="relative">
      <div className="container relative mx-auto h-full px-4 py-16">
        <div className="grid h-full place-items-center gap-8 md:grid-cols-2">
          <Card 
            href="/resources/wordmap"
            title="Tech Stack Visualization"
            description="Interactive word cloud visualization of my tech stack, with size indicating usage frequency and colors representing different categories"
          />
          <Card 
            href="/resources/learnings"
            title="Learning Journey"
            description="Structured overview of my programming knowledge, organized as an interactive mindmap with different categories and importance levels"
          />
        </div>
      </div>
    </div>
  );
}

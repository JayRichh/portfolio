"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useProgress } from "../../lib/github";

interface ProgressLoaderProps {
  onComplete?: () => void;
  className?: string;
  isDataReady?: boolean;
}

export function ProgressLoader({ onComplete, className, isDataReady }: ProgressLoaderProps) {
  const progress = useProgress();

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        onComplete?.();
      }, 100); // Small delay before transition
    }
  }, [progress, onComplete]);

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative h-2 w-64 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <motion.div
          className="absolute inset-y-0 left-0 bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
        />
      </div>
      <motion.div
        className="text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Loading contribution data... {Math.round(progress)}%
      </motion.div>
    </div>
  );
}

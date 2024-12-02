"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import { useGitHubStore } from "../../lib/github";

interface ProgressLoaderProps {
  onComplete?: () => void;
  className?: string;
  isDataReady?: boolean;
  compact?: boolean;
}

export function ProgressLoader({
  onComplete,
  className,
  isDataReady,
  compact = false,
}: ProgressLoaderProps) {
  const progress = useGitHubStore((state) => state.progress);
  const error = useGitHubStore((state) => state.error);

  useEffect(() => {
    if (progress === 100 && isDataReady) {
      onComplete?.();
    }
  }, [progress, isDataReady, onComplete]);

  const getLoadingMessage = () => {
    if (error) return "Error loading data";
    if (progress < 25) return "Initializing...";
    if (progress < 50) return "Loading contribution data...";
    if (progress < 75) return "Loading language statistics...";
    if (progress < 100) return "Processing data...";
    return "Complete";
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="text-xs text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <div className="relative h-2 w-64 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <motion.div
          className={cn(
            "absolute inset-y-0 left-0",
            error ? "bg-destructive" : "bg-primary",
          )}
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
      <motion.div
        className={cn(
          "text-sm",
          error ? "text-destructive" : "text-muted-foreground",
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {getLoadingMessage()} {!error && `(${Math.round(progress)}%)`}
      </motion.div>
      {error && (
        <motion.div
          className="text-xs text-destructive mt-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}

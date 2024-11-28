"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface ProjectButtonsProps {
  liveUrl?: string;
  codeUrl?: string;
}

export function ProjectButtons({ liveUrl, codeUrl }: ProjectButtonsProps) {
  return (
    <div className="flex gap-4 mt-6">
      {liveUrl && (
        <Link href={liveUrl} target="_blank" rel="noopener noreferrer">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm"
          >
            <ExternalLink size={16} />
            View Live
          </motion.button>
        </Link>
      )}
      {codeUrl && (
        <Link href={codeUrl} target="_blank" rel="noopener noreferrer">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground font-medium text-sm"
          >
            <Github size={16} />
            View Code
          </motion.button>
        </Link>
      )}
    </div>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "../../../components/ui/button";
import { techIcons } from "../../../lib/techIcons";
import { cn } from "../../../utils/cn";

interface TechBadgeProps {
  tech: string;
  isActive?: boolean;
  isClickable?: boolean;
  onClick?: (tech: string) => void;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  tech,
  isActive = false,
  isClickable = true,
  onClick,
}) => {
  const Icon = techIcons[tech]?.icon;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClickable && onClick) {
      onClick(tech);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={cn(
        "group relative h-7 items-center justify-start rounded-full px-3 py-1 text-xs font-medium transition-all",
        "bg-primary/5 dark:bg-primary/10 text-primary border border-primary/10 dark:border-primary/20",
        "hover:bg-primary/10 dark:hover:bg-primary/20 hover:border-primary/20 dark:hover:border-primary/30",
        {
          "w-full text-left": !isActive,
          "inline-flex": isActive,
          "cursor-default": !isClickable,
        }
      )}
      variant="ghost"
      disabled={!isClickable}
    >
      <motion.span
        className="flex items-center gap-1.5"
        layout
        initial={false}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {Icon && (
          <span className="flex-shrink-0">
            <Icon size={12} />
          </span>
        )}
        <span className="truncate">{tech}</span>
      </motion.span>
    </Button>
  );
};

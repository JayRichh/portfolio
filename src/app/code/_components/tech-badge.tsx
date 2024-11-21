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
        "group relative h-7 items-center justify-start rounded-md px-3 py-1 text-sm transition-colors",
        "hover:shadow-sm",
        {
          "w-full text-left": !isActive,
          "inline-flex": isActive,
          "dark:text-primary-light bg-primary/10 text-primary dark:bg-primary/20": isActive,
          "dark:hover:text-primary-light hover:bg-primary/5 hover:text-primary dark:hover:bg-primary/10": !isActive,
          "cursor-default": !isClickable,
        }
      )}
      variant={isActive ? "secondary" : "ghost"}
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
            <Icon size={14} />
          </span>
        )}
        <span className="truncate">{tech}</span>
      </motion.span>
    </Button>
  );
};

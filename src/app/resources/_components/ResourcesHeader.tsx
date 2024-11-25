"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

const links = [
  { label: "Tech Stack", path: "/resources/wordmap" },
  { label: "Learning Journey", path: "/resources/learnings" },
  { label: "GitHub Activity", path: "/resources/github" },
];

const NavItem = ({ label, path }: { label: string; path: string }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative"
    >
      <Link
        href={path}
        className={cn(
          "text-sm transition-colors",
          "inline-flex w-max items-center rounded-md px-2.5 py-1.5",
          "hover:text-primary hover:bg-primary/5",
          {
            "text-primary/80 bg-primary/5": isActive,
            "text-muted-foreground": !isActive,
          },
        )}
      >
        <motion.span
          initial={false}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10,
          }}
        >
          {label}
        </motion.span>
      </Link>
    </motion.div>
  );
};

export function ResourcesHeader() {
  const pathname = usePathname();
  
  // Hide the header on the root resources page
  if (pathname === "/resources") {
    return null;
  }

  return (
    <div className="w-full">
      <motion.header
        className="fixed top-16 z-40 w-full border-b bg-background/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
      >
        <nav className="container flex h-12 items-center px-4 md:px-6 lg:px-8">
          <div className="flex items-center space-x-1 ml-0">
            {links.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
        </nav>
      </motion.header>
    </div>
  );
}
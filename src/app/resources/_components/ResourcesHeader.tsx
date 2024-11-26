"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "../../../utils/cn";

const links = [
  { label: "Tech Stack", path: "/resources/wordmap" },
  { label: "Learning Journey", path: "/resources/learnings" },
  { label: "GitHub Activity", path: "/resources/github" },
];

const useScreenSize = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateSize(); 
    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return isMobile;
};

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
          }
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
  const isMobile = useScreenSize();

  if (pathname === "/resources") {
    return null;
  }

  return (
    <motion.header
      className="sticky top-16 z-40 w-full border-b bg-background/80 backdrop-blur-sm -mb-16"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex h-12 items-center">
          <div className="flex items-center space-x-1">
            {links
              .filter((item, index) => !isMobile || index === 2)
              .map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}

"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "../utils";
import { isRouteActive } from "../utils/is-route-active";
import { PageTransitionLink } from "./route-transition";

interface SiteNavigationItemProps {
  path: string;
  children: React.ReactNode;
}

export function SiteNavigationItem({ path, children }: SiteNavigationItemProps) {
  const currentPathName = usePathname();
  const router = useRouter();
  const isActive = isRouteActive(path, currentPathName);

  // Prefetch the route
  React.useEffect(() => {
    if (!isActive) {
      router.prefetch(path);
    }
  }, [router, path, isActive]);

  return (
    <PageTransitionLink
      href={path}
      className={cn(
        "text-sm font-medium transition-colors",
        "inline-flex w-max relative px-3 py-2 rounded-md",
        "hover:text-primary hover:bg-primary/5",
        {
          "text-primary bg-primary/10 shadow-sm": isActive,
          "text-foreground": !isActive,
          'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300':
            !isActive,
          "hover:after:scale-x-100": !isActive,
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
        {children}
      </motion.span>
    </PageTransitionLink>
  );
}

"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "../utils";
import { isRouteActive } from "../utils/is-route-active";
import { PageTransitionLink } from "./route-transition";
import { Button } from "./ui/button";
import { WorkDropdown } from "./ui/work-dropdown";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";

const ModeToggle = dynamic(
  () => import("./darkmode-toggle").then((mod) => mod.ModeToggle),
  { ssr: false },
);

const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Code", path: "/code" },
];

const NavItem = ({ label, path }: { label: string; path: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = isRouteActive(path, pathname, true);

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
        "inline-flex items-center rounded-md px-3 py-2",
        "hover:text-primary hover:bg-primary/5",
        {
          "text-primary bg-primary/10": isActive,
          "text-foreground": !isActive,
        },
      )}
    >
      {label}
    </PageTransitionLink>
  );
};

export function SiteNavigation(): JSX.Element {
  const pathname = usePathname();
  const isWorkActive = isRouteActive("/work", pathname, false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const mobileMenuRef = React.useRef<HTMLDivElement>(null);

  // Close mobile menu on route change
  React.useEffect(() => {
    const handleRouteChange = () => setIsMobileMenuOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  // Close mobile menu on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-1">
            {links.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
            <WorkDropdown isActive={isWorkActive} />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex md:hidden">
        <div className="relative" ref={mobileMenuRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn({
              "text-primary bg-primary/10": isMobileMenuOpen,
              "text-foreground": !isMobileMenuOpen,
            })}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border bg-background/95 backdrop-blur-sm p-1 shadow-md max-h-[calc(100vh-5rem)] overflow-y-auto"
              >
                {links.map((item) => {
                  const isActive = isRouteActive(item.path, pathname, true);
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PageTransitionLink
                        href={item.path}
                        className={cn(
                          "block w-full px-3 py-2 text-sm font-medium transition-colors rounded-sm",
                          "hover:text-primary hover:bg-primary/5",
                          {
                            "text-primary bg-primary/10": isActive,
                            "text-foreground": !isActive,
                          },
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </PageTransitionLink>
                    </motion.div>
                  );
                })}
                <WorkDropdown isActive={isWorkActive} isMobile />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}

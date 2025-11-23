"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./button";
import { cn } from "../../utils/cn";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface WorkDropdownProps {
  isActive: boolean;
  isMobile?: boolean;
}

const workItems = [
  {
    label: "Projects",
    items: [
      { label: "Riddlit", path: "/work#riddlit" },
      { label: "CSS Battle", path: "/work#cssbattle" },
      { label: "Encompass Tours", path: "/work#encompasstours" },
      { label: "Trekk", path: "/work#trekk" },
      { label: "Elite Garage Screens", path: "/work#elitescreens" },
      { label: "Next.js Template", path: "/work#nextjstemplate" },
      { label: "Golf2Go", path: "/work#golf2go" },
      { label: "POE2 Tools", path: "/work#poe2tools" },
      { label: "SteamShare", path: "/work#steamshare" },
      { label: "Checkpoint", path: "/work#checkpoint" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "GitHub Activity", path: "/resources/github" },
      { label: "Word Map", path: "/resources/wordmap" },
      { label: "Learning Journey", path: "/resources/learnings" },
    ],
  },
];

export function WorkDropdown({ isActive, isMobile }: WorkDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const scrollToHash = React.useCallback(
    (hash: string, attempts = 10, delay = 100) => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts > 0) {
        setTimeout(() => scrollToHash(hash, attempts - 1, delay), delay);
      }
    },
    [],
  );

  const handleNavigation = React.useCallback(
    (path: string) => {
      const [basePath, hash] = path.split("#");
      const targetPath = basePath || "/";

      if (pathname === targetPath) {
        // Same page navigation
        if (hash) {
          scrollToHash(hash);
          // Update URL without reloading
          window.history.pushState(null, "", `#${hash}`);
        }
        setIsOpen(false);
      } else {
        // Cross-page navigation
        setIsOpen(false);
        router.push(path); // Pushes the path including the hash

        if (hash) {
          // After navigation, attempt to scroll to element
          setTimeout(() => {
            scrollToHash(hash);
          }, 300);
        }
      }
    },
    [pathname, router, scrollToHash],
  );

  // Close dropdown on route change
  React.useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // Close dropdown on escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  if (isMobile) {
    return (
      <div className="w-full">
        <Link href="/work">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5",
              {
                "text-primary bg-primary/10": isActive,
                "text-foreground": !isActive,
              },
            )}
          >
            Work
          </Button>
        </Link>
        <AnimatePresence>
          {workItems.map((section) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 pl-3 overflow-hidden"
            >
              <div className="px-3 py-2 text-sm font-medium text-muted-foreground">
                {section.label}
              </div>
              {section.items.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => handleNavigation(item.path)}
                  className="w-full justify-start px-6 py-2 font-normal text-foreground hover:text-primary hover:bg-primary/5"
                >
                  {item.label}
                </Button>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <Link href="/work">
        <Button
          variant="ghost"
          className={cn(
            "px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5",
            {
              "text-primary bg-primary/10": isActive,
              "text-foreground": !isActive,
            },
          )}
        >
          Work
        </Button>
      </Link>

      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center px-1.5 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 ",
          {
            "text-primary bg-primary/10": isActive && isOpen,
            "text-foreground": !isActive || !isOpen,
          },
        )}
      >
        <ChevronDown
          className={cn(
            "h-4 w-8 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          )}
        />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full z-50 mt-1 w-[200px] rounded-md border bg-background/95 backdrop-blur-sm p-1 shadow-md"
          >
            {workItems.map((section, index) => (
              <div key={section.label}>
                {index > 0 && <div className="my-1 h-px bg-border" />}
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                  {section.label}
                </div>
                {section.items.map((item) => (
                  <motion.button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:text-primary hover:bg-primary/5"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

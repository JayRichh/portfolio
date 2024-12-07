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
      { label: "SteamShare", path: "/work#steamshare" },
      { label: "CSS Battle", path: "/work#cssbattle" },
      { label: "Encompass Tours", path: "/work#encompasstours" },
      { label: "PomoDev", path: "/work#pomodev" },
      { label: "The Work Waka", path: "/work#theworkwaka" },
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

export function WorkDropdown({
  isActive,
  isMobile,
}: WorkDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [pendingScroll, setPendingScroll] = React.useState<string | null>(null);

  // Handle scroll to element after navigation
  React.useEffect(() => {
    if (pendingScroll && pathname === "/work") {
      const scrollToElement = () => {
        const element = document.getElementById(pendingScroll);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: "smooth",
          });
        }
        setPendingScroll(null);
      };

      // Wait for page content to be fully rendered
      const timer = setTimeout(scrollToElement, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, pendingScroll]);

  const handleNavigation = async (path: string) => {
    setIsOpen(false);

    if (path.includes("#")) {
      const id = path.split("#")[1];

      if (pathname === "/work") {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        setPendingScroll(id);
        router.push("/work");
      }
    } else {
      router.push(path);
    }
  };

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

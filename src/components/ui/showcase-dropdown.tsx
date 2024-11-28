"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { cn } from "../../utils/cn";

interface ShowcaseDropdownProps {
  isActive: boolean;
  isMobile?: boolean;
}

const showcaseItems = [
  {
    label: "Projects",
    items: [
      { label: "SteamShare", path: "/showcase#steamshare" },
      { label: "CSS Battle", path: "/showcase#cssbattle" },
      { label: "Encompass Tours", path: "/showcase#encompasstours" },
      { label: "PomoDev", path: "/showcase#pomodev" },
      { label: "The Work Waka", path: "/showcase#theworkwaka" },
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

export function ShowcaseDropdown({ isActive, isMobile }: ShowcaseDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleNavigation = async (path: string) => {
    setIsOpen(false);
    
    if (path.includes('#')) {
      const id = path.split('#')[1];
      
      // If we're already on the showcase page
      if (window.location.pathname === '/showcase') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        // If we're navigating from a different page
        await router.push('/showcase');
        // Wait for page to load and then scroll
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            window.scrollTo({
              top: element.offsetTop - 80, // Account for header height
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    } else {
      router.push(path);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isMobile) {
    return (
      <div className="w-full">
        {showcaseItems.map((section) => (
          <div key={section.label} className="space-y-1">
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
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5",
          {
            "text-primary bg-primary/10": isActive,
            "text-foreground": !isActive,
          }
        )}
      >
        Showcase
        <ChevronDown className={cn("h-4 w-4", isOpen ? "rotate-180" : "")} />
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-[200px] rounded-md border bg-background p-1 shadow-md">
          {showcaseItems.map((section, index) => (
            <div key={section.label}>
              {index > 0 && <div className="my-1 h-px bg-border" />}
              <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                {section.label}
              </div>
              {section.items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full rounded-sm px-2 py-1.5 text-left text-sm hover:text-primary hover:bg-primary/5"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "../utils";
import { isRouteActive } from "../utils/is-route-active";
import { Button } from "./ui/button";
import { WorkDropdown } from "./ui/work-dropdown";
import { FullscreenMenu } from "./ui/fullscreen-menu";

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
    <Link
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
    </Link>
  );
};

export function SiteNavigation(): JSX.Element {
  const pathname = usePathname();
  const isWorkActive = isRouteActive("/work", pathname, false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // Handle menu state
  const handleMenuToggle = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClose = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <nav className="relative z-50 flex w-full items-center justify-between">
      {/* Desktop Navigation */}
      <div className="hidden md:flex md:items-center md:space-x-1">
        {links.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
        <WorkDropdown isActive={isWorkActive} />
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMenuToggle}
          className={cn("hover:bg-primary/5", {
            "text-primary bg-primary/10": isMenuOpen,
            "text-foreground": !isMenuOpen,
          })}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Menu Button (Desktop) */}
      <div className="hidden md:block ml-auto">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleMenuToggle}
          className={cn("hover:bg-primary/5", {
            "text-primary bg-primary/10": isMenuOpen,
            "text-foreground": !isMenuOpen,
          })}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Fullscreen Menu */}
      <FullscreenMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </nav>
  );
}

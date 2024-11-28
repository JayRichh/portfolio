"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "../utils";
import { isRouteActive } from "../utils/is-route-active";
import { PageTransitionLink } from "./route-transition";
import { Button } from "./ui/button";
import { ShowcaseDropdown } from "./ui/showcase-dropdown";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../components/ui/navigation-menu";

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
  const isShowcaseActive = isRouteActive("/showcase", pathname, false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-1">
            {links.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
            <ShowcaseDropdown isActive={isShowcaseActive} />
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex md:hidden">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          {isMobileMenuOpen && (
            <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-md border bg-background p-1 shadow-md">
              {links.map((item) => {
                const isActive = isRouteActive(item.path, pathname, true);
                return (
                  <PageTransitionLink
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "block w-full px-3 py-2 text-sm font-medium transition-colors",
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
                );
              })}
              <ShowcaseDropdown isActive={isShowcaseActive} isMobile />
            </div>
          )}
        </div>
      </div>

      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}

"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { cn } from "../utils";
import { isRouteActive } from "../utils/is-route-active";
import { PageTransitionLink } from "./route-transition";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
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
  { label: "Code", path: "/code" },
  { label: "About", path: "/about" },
  { label: "Resources", path: "/resources", matchSubpaths: true },
];

const NavItem: React.FC<{
  label: string;
  path: string;
  matchSubpaths?: boolean;
}> = ({ label, path, matchSubpaths }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = isRouteActive(path, pathname, !matchSubpaths);

  // Prefetch the route
  React.useEffect(() => {
    if (!isActive) {
      router.prefetch(path);
    }
  }, [router, path, isActive]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative"
    >
      <PageTransitionLink
        href={path}
        className={cn(
          "text-sm font-medium transition-colors",
          "inline-flex w-max items-center rounded-md px-3 py-2",
          "hover:text-primary hover:bg-primary/5",
          {
            "text-primary bg-primary/10": isActive,
            "text-foreground": !isActive,
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
      </PageTransitionLink>
    </motion.div>
  );
};

export function SiteNavigation(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="flex w-full items-center justify-between">
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-1">
            <AnimatePresence initial={false}>
              {links.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
            </AnimatePresence>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex md:hidden">
        <MobileMenu currentPath={pathname} />
      </div>

      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}

function MobileMenu({ currentPath }: { currentPath: string }): JSX.Element {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open Menu"
        className="rounded-md p-2 text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
      >
        <Menu className="h-5 w-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-48 rounded-lg bg-background"
      >
        {links.map((item) => {
          const isActive = isRouteActive(
            item.path,
            currentPath,
            !item.matchSubpaths,
          );
          return (
            <DropdownMenuItem key={item.path} asChild>
              <PageTransitionLink
                href={item.path}
                className={cn(
                  "flex w-full items-center px-3 py-2 text-sm transition-colors",
                  {
                    "bg-primary/10 text-primary": isActive,
                    "text-foreground hover:bg-primary/5 hover:text-primary":
                      !isActive,
                  },
                )}
              >
                {item.label}
              </PageTransitionLink>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

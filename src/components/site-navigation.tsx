"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "../utils";
import { isRouteActive } from "../utils/is-route-active";
import { PageTransitionLink } from "./route-transition";
import { EnhancedDropdown } from "./ui/enhanced-dropdown";
import { ShowcaseDropdown } from "./ui/showcase-dropdown";
import {
  NavigationMenu,
  NavigationMenuList,
} from "../components/ui/navigation-menu";

const ModeToggle = dynamic(
  () => import("./darkmode-toggle").then((mod) => mod.ModeToggle),
  { ssr: false },
);

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false },
);

const MotionSpan = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.span),
  { ssr: false },
);

const AnimatePresenceComponent = dynamic(
  () => import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false },
);

const links = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Code", path: "/code" },
];

const NavItem: React.FC<{
  label: string;
  path: string;
  matchSubpaths?: boolean;
}> = ({ label, path, matchSubpaths }) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = isRouteActive(path, pathname, !matchSubpaths);

  React.useEffect(() => {
    if (!isActive) {
      router.prefetch(path);
    }
  }, [router, path, isActive]);

  return (
    <MotionDiv
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
        <MotionSpan
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
        </MotionSpan>
      </PageTransitionLink>
    </MotionDiv>
  );
};

export function SiteNavigation(): JSX.Element {
  const pathname = usePathname();
  const isShowcaseActive = isRouteActive("/showcase", pathname, false);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-1">
            <AnimatePresenceComponent initial={false}>
              {links.map((item) => (
                <NavItem key={item.path} {...item} />
              ))}
              <MotionDiv
                layout
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative"
              >
                <ShowcaseDropdown isActive={isShowcaseActive} />
              </MotionDiv>
            </AnimatePresenceComponent>
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
  const isShowcaseActive = isRouteActive("/showcase", currentPath, false);

  return (
    <EnhancedDropdown
      trigger={<Menu className="h-6 w-6" />}
      align="start"
    >
      {links.map((item) => {
        const isActive = isRouteActive(
          item.path,
          currentPath,
          true,
        );
        return (
          <PageTransitionLink
            key={item.path}
            href={item.path}
            className={cn(
              "flex w-full items-center transition-colors",
              {
                "text-primary": isActive,
                "text-foreground": !isActive,
              },
            )}
          >
            {item.label}
          </PageTransitionLink>
        );
      })}
      <ShowcaseDropdown isActive={isShowcaseActive} isMobile />
    </EnhancedDropdown>
  );
}

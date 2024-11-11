import React from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import { Code, LucideProps, Menu } from "lucide-react";

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

type NavLink = {
  label: string;
  path: string;
  icon?: React.ComponentType<LucideProps>;
};

const links: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Code", path: "/code", icon: Code },
  { label: "About", path: "/about" },
  { label: "Learnings", path: "/learnings" },
];

const NavItem: React.FC<NavLink & { isActive: boolean }> = ({
  label,
  path,
  icon: Icon,
  isActive,
}) => {
  const isCode = path === "/code";
  const pathname = usePathname();
  const showIcon = isCode && pathname === "/";

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
        className={`flex items-center rounded-md px-4 py-3 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          isActive
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-primary/5 hover:text-primary"
        }`}
      >
        {showIcon && Icon && (
          <Icon
            className="mr-2 h-5 w-5 transition-all duration-300 ease-in-out"
            color={isActive ? "hsl(var(--primary))" : "currentColor"}
            style={{
              stroke: isActive ? "hsl(var(--primary))" : "currentColor",
            }}
            size={20}
          />
        )}
        <span className="font-semibold tracking-wide">{label}</span>
      </Link>
    </motion.div>
  );
};

const LastNavItem: React.FC = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative"
    >
      <ModeToggle className="rounded-md px-4 py-3 text-sm font-medium text-foreground transition-all duration-300 ease-in-out hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
    </motion.div>
  );
};

export function SiteNavigation(): JSX.Element {
  const pathname = usePathname();
  const filteredLinks =
    pathname === "/" ? links.filter((link) => link.path !== "/") : links;

  return (
    <>
      <div className="hidden items-center justify-center md:flex">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-1">
            <AnimatePresence initial={false}>
              {filteredLinks.map((item) => (
                <NavItem
                  key={item.path}
                  {...item}
                  isActive={pathname === item.path}
                />
              ))}
              <LastNavItem />
            </AnimatePresence>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex justify-end sm:items-center md:hidden">
        <MobileDropdown currentPath={pathname} />
      </div>
    </>
  );
}

type MobileDropdownProps = {
  currentPath: string;
};

function MobileDropdown({ currentPath }: MobileDropdownProps): JSX.Element {
  const filteredLinks =
    currentPath === "/" ? links.filter((link) => link.path !== "/") : links;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Open Menu"
        className="rounded-md text-foreground transition-all duration-300 ease-in-out hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <Menu className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rounded-lg border border-primary/10 bg-background shadow-lg transition-all duration-300 ease-in-out">
        <AnimatePresence initial={false}>
          {filteredLinks.map((item) => (
            <motion.div
              key={item.path}
              layout
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <DropdownMenuItem asChild>
                <Link
                  className={`flex w-full items-center px-4 py-3 text-sm transition-all duration-300 ease-in-out ${
                    currentPath === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-primary/5 hover:text-primary"
                  }`}
                  href={item.path}
                >
                  {item.icon &&
                    item.path === "/code" &&
                    currentPath === "/" && (
                      <item.icon
                        className="mr-2 h-5 w-5 transition-all duration-300 ease-in-out"
                        color="currentColor"
                        style={{
                          stroke: "currentColor",
                          fill: "none",
                        }}
                        size={20}
                      />
                    )}
                  <span className="font-semibold tracking-wide">
                    {item.label}
                  </span>
                </Link>
              </DropdownMenuItem>
            </motion.div>
          ))}
        </AnimatePresence>
        <DropdownMenuItem asChild>
          <div className="px-4 py-3">
            <ModeToggle className="w-full text-sm transition-all duration-300 ease-in-out hover:text-primary" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

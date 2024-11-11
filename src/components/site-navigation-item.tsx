"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NavigationMenuItem } from "./ui/navigation-menu";
import { cn, isRouteActive } from "../utils";
import React from "react";

const getClassName = (path: string, currentPathName: string) => {
  const isActive = isRouteActive(path, currentPathName);

  return cn(
    "text-sm font-medium transition-all duration-300 inline-flex w-max relative px-3 py-2 rounded-md",
    {
      "text-primary bg-primary/10 shadow-sm": isActive,
      "text-foreground hover:text-primary hover:bg-primary/5": !isActive,
      'after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300':
        !isActive,
      "hover:after:scale-x-100": !isActive,
    },
  );
};

export function SiteNavigationItem({
  path,
  children,
}: React.PropsWithChildren<{
  path: string;
}>) {
  const currentPathName = usePathname();
  const className = getClassName(path, currentPathName);

  return (
    <NavigationMenuItem key={path}>
      <Link className={className} href={path}>
        {children}
      </Link>
    </NavigationMenuItem>
  );
}

"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "../utils";

interface RouteTransitionProps {
  children: React.ReactNode;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Prefetch all routes including work routes
  useEffect(() => {
    const routes = [
      "/",
      "/code",
      "/about",
      "/wordmap",
      "/learnings",
      "/work",
      "/work/github",
      "/work/wordmap",
      "/work/learnings",
    ];
    routes.forEach((route) => {
      if (route !== pathname) {
        router.prefetch(route);
      }
    });
  }, [router, pathname]);

  return children;
};

interface PageTransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const PageTransitionLink = React.forwardRef<
  HTMLAnchorElement,
  PageTransitionLinkProps
>(({ href, children, className, asChild = false, onClick, ...props }, ref) => {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }

    // Always attempt to navigate
    try {
      await router.push(href);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement;
    return React.cloneElement(child, {
      onClick: handleClick,
      className: cn(child.props.className, className),
      ref,
      ...props,
    });
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      ref={ref}
      {...props}
    >
      {children}
    </Link>
  );
});

PageTransitionLink.displayName = "PageTransitionLink";

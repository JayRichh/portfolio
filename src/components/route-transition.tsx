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

  // Prefetch all routes
  useEffect(() => {
    const routes = ["/", "/code", "/about", "/learnings"];
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
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === href) return;

    if (onClick) {
      onClick(e);
    }

    router.push(href);
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

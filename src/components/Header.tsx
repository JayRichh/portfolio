import { forwardRef } from "react";
import { cn } from "../utils/cn";
import React from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  isVisible: boolean;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  function HeaderComponent(
    { className, logo, navigation, actions, isVisible, ...props },
    ref,
  ) {
    return (
      <header
        ref={ref}
        role="banner"
        className={cn(
          "site-header fixed top-0 z-[100] h-[64px] w-full bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-background/75",
          isVisible ? "translate-y-0" : "-translate-y-full",
          className,
        )}
        {...props}
      >
        <div className="container relative">
          {/* Mobile Layout */}
          <div className="flex h-14 items-center justify-between md:hidden">
            <div className="flex items-center">
              {navigation}
            </div>
            <div className="flex flex-1 justify-center">
              {logo}
            </div>
            <div className="flex items-center justify-end space-x-1">
              {actions}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden h-14 grid-cols-3 items-center md:grid">
            <div className="flex items-center">
              {logo}
            </div>
            <nav className="order-first md:order-none">
              {navigation}
            </nav>
            <div className="flex items-center justify-end space-x-1">
              {actions}
            </div>
          </div>
        </div>
      </header>
    );
  },
);

Header.displayName = "Header";

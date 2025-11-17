"use client";

import React from "react";
import { AppLogo } from "./app-logo";
import { cn } from "../utils";
import Link from "next/link";

export function SiteFooter(): JSX.Element {
  return (
    <footer
      className={cn(
        "mt-auto border-t border-border/40",
        "bg-background/80 backdrop-blur-md",
        "px-4 py-6 md:px-6 lg:px-8",
      )}
    >
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Logo and Name */}
          <div className="flex items-center gap-3">
            <AppLogo />
            <div className="text-sm text-foreground/80">
              <Link
                href="/"
                className="font-medium hover:text-foreground transition-colors"
              >
                Jayden Richardson
              </Link>
              <p className="text-xs text-foreground/60">ello</p>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-foreground/60">
            © {new Date().getFullYear()} Jayden Richardson. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

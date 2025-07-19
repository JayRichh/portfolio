import Image from "next/image";
import Link from "next/link";

import { cn } from "../utils";
import React from "react";

function LogoImage({
  className,
  width = 105,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <div
      className={cn(
        "relative h-[40px] w-[40px] lg:h-[48px] lg:w-[48px]",
        className,
      )}
    >
      <Image
        src="/JRLOGO.png"
        alt="JR Logo - Jayden Richardson"
        fill
        className="object-contain transition-all duration-200 dark:invert dark:brightness-110"
      />
    </div>
  );
}

export function AppLogo({
  href,
  label,
  className,
}: {
  href?: string;
  className?: string;
  label?: string;
}) {
  return (
    <Link
      aria-label={label ?? "Jayden Richardson - Home Page"}
      href={href ?? "/"}
      className="transition-transform duration-200 hover:scale-105"
    >
      <LogoImage className={className} />
    </Link>
  );
}

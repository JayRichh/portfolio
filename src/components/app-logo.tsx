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
        "relative h-[56px] w-[56px] lg:h-[56px] lg:w-[56px]",
        className,
      )}
    >
      <Image
        src="/images/pomodev-logo.png"
        alt="DevMap Logo"
        fill
        className="object-contain dark:brightness-110 dark:invert-0 dark:saturate-200"
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
    <Link aria-label={label ?? "Home Page"} href={href ?? "/"}>
      <LogoImage className={className} />
    </Link>
  );
}

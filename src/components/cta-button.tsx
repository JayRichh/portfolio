import React from "react";
import { cn } from "../utils/cn";

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  className?: string;
}

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background",
          "shadow-lg hover:shadow-xl active:shadow-md",
          "transform hover:scale-[1.02] active:scale-[0.98]",
          "backdrop-blur-sm",

          // Variant-specific styles
          variant === "default" && [
            "bg-primary/90 text-primary-foreground hover:bg-primary",
            "focus:ring-primary",
            "border border-primary/10",
          ],
          variant === "outline" && [
            "bg-background/50 text-primary hover:bg-primary/10",
            "focus:ring-primary/50",
            "border border-primary/20 hover:border-primary/30",
          ],

          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

CtaButton.displayName = "CtaButton";

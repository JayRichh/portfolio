"use client";

import * as React from "react";
import { Menu, MenuButton, MenuItem, useMenuStore } from "@ariakit/react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../utils/cn";

const menuVariants = {
  closed: {
    scale: 0.95,
    opacity: 0,
    y: -4,
    transition: {
      duration: 0.15,
    },
  },
  open: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.15,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      mass: 0.5,
    },
  },
};

interface EnhancedDropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  className?: string;
}

export function EnhancedDropdown({
  trigger,
  children,
  align = "start",
  className,
}: EnhancedDropdownProps) {
  const menu = useMenuStore({
    placement:
      align === "start"
        ? "bottom-start"
        : align === "end"
          ? "bottom-end"
          : "bottom",
    animated: true,
  });
  const mounted = menu.useState("mounted");

  return (
    <>
      <MenuButton
        store={menu}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-3 text-foreground transition-colors",
          "hover:bg-primary/5 hover:text-primary",
          "touch-manipulation select-none",
          "md:p-2",
          className,
        )}
      >
        {trigger}
      </MenuButton>
      <AnimatePresence>
        {mounted && (
          <Menu
            store={menu}
            portal
            gutter={8}
            className={cn(
              "z-50 min-w-[12rem] overflow-hidden rounded-lg border bg-popover shadow-lg outline-none",
              "touch-manipulation",
              "md:min-w-[8rem] md:rounded-md",
            )}
            render={
              <motion.div
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.y) > 100) {
                    menu.hide();
                  }
                }}
              />
            }
          >
            <div className="p-1.5 md:p-1">
              {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return null;
                return (
                  <MenuItem
                    className={cn(
                      "relative flex w-full cursor-default select-none items-center rounded-md px-3 py-2.5 text-base outline-none",
                      "transition-colors hover:bg-primary/5 hover:text-primary",
                      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                      "touch-manipulation",
                      "md:rounded-sm md:px-2 md:py-1.5 md:text-sm",
                      child.props.className,
                    )}
                    render={
                      <motion.div
                        variants={itemVariants}
                        transition={{ opacity: { duration: 0.2 } }}
                      />
                    }
                  >
                    {child.props.children}
                  </MenuItem>
                );
              })}
            </div>
          </Menu>
        )}
      </AnimatePresence>
    </>
  );
}

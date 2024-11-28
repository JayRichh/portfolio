"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { cn } from "../../utils/cn";

interface ShowcaseDropdownProps {
  isActive: boolean;
  isMobile?: boolean;
}

const showcaseItems = [
  { label: "GitHub", path: "/showcase/github" },
  { label: "Word Map", path: "/showcase/wordmap" },
  { label: "Learnings", path: "/showcase/learnings" },
];

export function ShowcaseDropdown({ isActive, isMobile }: ShowcaseDropdownProps) {
  const router = useRouter();

  if (isMobile) {
    return (
      <div className="flex w-full flex-col space-y-1">
        <Button
          variant="ghost"
          onClick={() => router.push("/showcase")}
          className={cn(
            "justify-start px-2 font-normal transition-colors hover:text-primary hover:bg-primary/5",
            {
              "text-primary bg-primary/10": isActive,
              "text-foreground": !isActive,
            }
          )}
        >
          Showcase
        </Button>
        {showcaseItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            onClick={() => router.push(item.path)}
            className="justify-start pl-4 font-normal text-foreground transition-colors hover:text-primary hover:bg-primary/5"
          >
            {item.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center -space-x-px">
      <Button
        variant="ghost"
        onClick={() => router.push("/showcase")}
        className={cn(
          "rounded-r-none px-3 py-2 transition-colors hover:text-primary hover:bg-primary/5",
          {
            "text-primary bg-primary/10": isActive,
            "text-foreground": !isActive,
          }
        )}
      >
        Showcase
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              "rounded-l-none border-l border-transparent px-2 py-2 transition-colors hover:text-primary hover:bg-primary/5",
              {
                "text-primary border-l-primary/10": isActive,
                "text-foreground hover:border-l-primary/10": !isActive,
              }
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {showcaseItems.map((item) => (
            <DropdownMenuItem
              key={item.path}
              onClick={() => router.push(item.path)}
              className="transition-colors hover:text-primary hover:bg-primary/5"
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

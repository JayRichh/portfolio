"use client";

import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Layers, Pencil, Star } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useSidebarState } from "./SidebarStateContext";

const SpinningPen: React.FC = () => {
  const controls = useAnimation();
  const [isHovering, setIsHovering] = useState(false);

  const rotate = useMotionValue(0);
  const skewX = useMotionValue(0);
  const skewY = useMotionValue(0);

  const scale = useTransform(rotate, [0, 180, 360], [1, 0.9, 1]);
  const x = useTransform(rotate, [0, 90, 180, 270, 360], [0, 5, 0, -5, 0]);
  const y = useTransform(rotate, [0, 90, 180, 270, 360], [0, -5, 0, 5, 0]);

  const startAnimation = () => {
    setIsHovering(true);
    controls.start({
      rotate: [0, 360],
      skewX: [0, 15, -15, 0],
      skewY: [0, -10, 10, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "loop",
        ease: [0.45, 0.05, 0.55, 0.95],
      },
    });
  };

  const stopAnimation = () => {
    setIsHovering(false);
    controls.stop();
    controls.start({
      rotate: 0,
      skewX: 0,
      skewY: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  };

  return (
    <motion.a
      href="/resources/learnings"
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors duration-200 hover:text-primary/80"
      onMouseEnter={startAnimation}
      onMouseLeave={stopAnimation}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        animate={controls}
        style={{
          rotate,
          skewX,
          skewY,
          scale,
          x,
          y,
          transformOrigin: "center center",
          display: "inline-block",
        }}
      >
        <Pencil
          size={24}
          className="text-primary"
          style={{
            filter: isHovering
              ? "drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.7))"
              : "none",
          }}
        />
      </motion.div>
      {isHovering && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      )}
    </motion.a>
  );
};

export const LearningsSidebar: React.FC = () => {
  const {
    isCollapsed,
    toggleSidebar,
    highlightedGroups,
    toggleHighlightedGroup,
    highlightedImportance,
    toggleHighlightedImportance,
    resetHighlights,
  } = useSidebarState();

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  const groups = ["language", "framework", "tool", "concept", "activity"];
  const importanceLevels = [1, 2, 3, 4, 5];

  return (
    <motion.div
      initial={false}
      animate={{
        width: isCollapsed ? 60 : 250,
      }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] flex-col border-r border-border bg-background text-foreground"
    >
      <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-border px-4">
        <SpinningPen />
        <button
          onClick={toggleSidebar}
          className="px-2 text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto py-4">
        <AnimatePresence mode="wait">
          {isCollapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-4 px-2"
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={toggleSidebar}
              >
                <Layers size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={toggleSidebar}
              >
                <Star size={20} />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 px-4"
            >
              <div>
                <h3 className="mb-2 text-sm font-semibold">Groups</h3>
                <div className="space-y-2">
                  {groups.map((group) => (
                    <Button
                      key={group}
                      variant={
                        highlightedGroups.includes(group)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      className="w-full justify-start capitalize"
                      onClick={() => toggleHighlightedGroup(group)}
                    >
                      {group}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold">Importance Level</h3>
                <div className="grid grid-cols-5 gap-1">
                  {importanceLevels.map((level) => (
                    <Button
                      key={level}
                      variant={
                        highlightedImportance.includes(level)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleHighlightedImportance(level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={resetHighlights}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    mass: 0.5,
  });

  return (
    <>
      {/* Background track */}
      <div
        className="fixed top-[64px] left-0 right-0 h-[2px] bg-muted/20"
        style={{ zIndex: 49 }}
      />
      {/* Progress bar with glow */}
      <motion.div
        className="fixed top-[64px] left-0 right-0 h-[2px] bg-gradient-to-r from-primary via-primary/80 to-primary/50 origin-[0%] will-change-transform"
        style={{
          scaleX,
          zIndex: 49,
          transformOrigin: "0%",
          backfaceVisibility: "hidden",
          boxShadow: "0px 0px 8px 2px rgba(72, 209, 204, 0.8)", // Add glow effect
        }}
      >
        {/* Glow layer */}
        <div
          className="absolute inset-0 h-full bg-gradient-to-r from-primary via-primary/80 to-primary/50 blur-md opacity-60"
        ></div>
      </motion.div>
    </>
  );
}

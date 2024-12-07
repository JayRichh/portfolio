"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { processWords } from "../../wordmap/_components/wordUtils";

export function WordMapPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerRef.current.clientWidth * dpr;
    canvas.height = containerRef.current.clientHeight * dpr;
    canvas.style.width = `${containerRef.current.clientWidth}px`;
    canvas.style.height = `${containerRef.current.clientHeight}px`;
    ctx.scale(dpr, dpr);

    const width = canvas.width;
    const height = canvas.height;

    // Create background gradient
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.max(width, height) / 1.6,
    );

    if (isDark) {
      gradient.addColorStop(0, "rgba(17, 24, 39, 1)");
      gradient.addColorStop(1, "rgba(17, 24, 39, 0.95)");
    } else {
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(1, "rgba(243, 244, 246, 0.95)");
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Get words and sort by importance
    const words = processWords("balanced")
      .slice(0, 15)
      .sort((a, b) => b.importance - a.importance);

    // Calculate positions for words
    const usedPositions: Array<{ x: number; y: number; radius: number }> = [];
    const centerX = width / 2;
    const centerY = height / 2;

    words.forEach((word) => {
      const size = Math.max(12, Math.min(24, word.importance * 4));
      let x, y;
      let attempts = 0;
      const maxAttempts = 100;

      // Try to find a position that doesn't overlap
      while (attempts < maxAttempts) {
        // More important words are placed closer to center
        const angle = Math.random() * Math.PI * 2;
        const distance =
          ((1 - word.importance / 10) * Math.min(width, height)) / 3;
        x = centerX + Math.cos(angle) * distance;
        y = centerY + Math.sin(angle) * distance;

        // Check for overlap
        const overlap = usedPositions.some((pos) => {
          const dx = pos.x - x;
          const dy = pos.y - y;
          return Math.sqrt(dx * dx + dy * dy) < pos.radius + size;
        });

        if (
          !overlap &&
          x > size &&
          x < width - size &&
          y > size &&
          y < height - size
        ) {
          usedPositions.push({ x, y, radius: size });
          break;
        }
        attempts++;
      }

      if (attempts < maxAttempts) {
        // Draw word
        ctx.font = `${size}px Montserrat`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Get color based on group
        const colors: { [key: string]: { color: string } } = {
          language: { color: "rgba(99, 102, 241, 0.85)" },
          framework: { color: "rgba(16, 185, 129, 0.85)" },
          tool: { color: "rgba(239, 68, 68, 0.85)" },
          concept: { color: "rgba(59, 130, 246, 0.85)" },
          project: { color: "rgba(168, 85, 247, 0.85)" },
        };

        const category = colors[word.group] || {
          color: "rgba(107, 114, 128, 0.85)",
        };

        // Draw text with glow for important words
        if (word.importance > 4) {
          ctx.shadowColor = category.color;
          ctx.shadowBlur = 15;
          ctx.globalAlpha = 0.3;
          ctx.fillStyle = category.color;
          ctx.fillText(word.text, x!, y!);
          ctx.shadowBlur = 0;
        }

        // Draw main text
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = category.color;
        ctx.fillText(word.text, x!, y!);
      }
    });
  }, [isDark]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

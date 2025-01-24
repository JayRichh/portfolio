import { createLucideIcon } from "lucide-react";

export const CodePenIcon = createLucideIcon("CodePen", [
  // Outer Hexagon
  [
    "polygon",
    { points: "12 2 22 8 22 16 12 22 2 16 2 8 12 2", key: "hexagon" },
  ],

  // Inner lines
  ["line", { x1: "12", y1: "2", x2: "12", y2: "22", key: "vertical-line" }],
  [
    "line",
    { x1: "2", y1: "8", x2: "22", y2: "16", key: "top-left-to-bottom-right" },
  ],
  [
    "line",
    { x1: "2", y1: "16", x2: "22", y2: "8", key: "bottom-left-to-top-right" },
  ],

  // Left Inner Triangle
  ["line", { x1: "12", y1: "2", x2: "2", y2: "8", key: "left-top-line" }],
  ["line", { x1: "2", y1: "16", x2: "12", y2: "22", key: "left-bottom-line" }],

  // Right Inner Triangle
  ["line", { x1: "12", y1: "2", x2: "22", y2: "8", key: "right-top-line" }],
  [
    "line",
    { x1: "22", y1: "16", x2: "12", y2: "22", key: "right-bottom-line" },
  ],
]);

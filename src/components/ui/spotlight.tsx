"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ResponsiveImage } from "./image";
import { useDialogStore } from "../../lib/dialog-store";
import { createPortal } from "react-dom";

interface SpotlightProps {
  src: string;
  alt: string;
  className?: string;
}

const SpotlightModal = ({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) => {
  const setIsDialogOpen = useDialogStore((state) => state.setIsOpen);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    // Set dialog state and lock body scroll
    setIsDialogOpen(true);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      // Reset dialog state and body scroll
      setIsDialogOpen(false);
      document.body.style.overflow = "";
    };
  }, [onClose, setIsDialogOpen]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative h-[85vh] w-[85vw] max-w-7xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-[1000] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        >
          <X size={24} />
        </button>
        <div className="relative h-full w-full rounded-lg overflow-hidden">
          <ResponsiveImage
            src={src}
            alt={alt}
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
};

export function Spotlight({ src, alt, className = "" }: SpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`relative overflow-hidden cursor-pointer ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
          }}
        />
        <div
          className="absolute inset-0 transition duration-300"
          style={{
            background: isHovered
              ? "linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.2))"
              : "none",
          }}
        />
        <ResponsiveImage
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`}
        >
          <div className="p-2 rounded-full bg-background/20 backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <SpotlightModal
            src={src}
            alt={alt}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

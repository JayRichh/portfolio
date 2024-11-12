"use client";

import React, { useEffect, useState } from "react";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const ScrollIcon = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 180]);

  useEffect(() => {
    const checkIfNearBottom = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setIsNearBottom(scrollPosition + windowHeight > documentHeight - 100);
    };

    window.addEventListener("scroll", checkIfNearBottom);
    checkIfNearBottom(); // Initial check

    return () => window.removeEventListener("scroll", checkIfNearBottom);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: isNearBottom ? 0 : document.documentElement.scrollHeight / 5,
      behavior: "smooth",
    });
  };

  if (!isMounted) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className="fixed bottom-8 right-8 z-50 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div style={{ rotate: rotation }}>
              <ChevronDown
                size={48}
                className="text-primary opacity-50 transition-opacity duration-300 hover:opacity-100"
              />
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isNearBottom ? "Scroll to top" : "Scroll down"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ScrollIcon;

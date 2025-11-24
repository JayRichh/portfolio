"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const ScrollIcon = ({
  workPage = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const checkTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll();

  const rotation = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Check if we're near the bottom using scroll position
  const checkFooterVisibility = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Consider footer visible if we're within viewport height of the bottom
    const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
    const isNearBottom = distanceFromBottom < windowHeight * 0.5; // Within 50% of viewport from bottom
    
    setIsFooterVisible(isNearBottom);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Initial check
    checkFooterVisibility();

    // Set up IntersectionObserver for the last section
    const setupObserver = () => {
      const sections = document.querySelectorAll('section');
      const lastSection = sections.length > 0 ? sections[sections.length - 1] : null;
      const footer = document.querySelector('footer');
      const target = footer || lastSection;

      if (!target) {
        console.warn('No footer or last section found, using scroll-based detection only');
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              checkFooterVisibility();
            }
          });
        },
        {
          threshold: [0, 0.1, 0.5],
          rootMargin: '0px 0px -10% 0px',
        }
      );

      observerRef.current.observe(target);
    };

    // Add scroll listener for continuous checking
    const handleScroll = () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
      
      checkTimeoutRef.current = setTimeout(() => {
        checkFooterVisibility();
      }, 100); // Debounce for performance
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Small delay to ensure DOM is ready
    setTimeout(setupObserver, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [isMounted, checkFooterVisibility]);

  const handleClick = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);
    
    // Re-check footer visibility right before scrolling
    const isAtBottom = distanceFromBottom < windowHeight * 0.5;
    
    if (isAtBottom) {
      // At bottom, scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Not at bottom, scroll down by viewport height
      let scrollAmount = windowHeight * 0.85;
      if (workPage) {
        scrollAmount = windowHeight * 1;
      }
      const targetScroll = Math.min(
        scrollPosition + scrollAmount,
        documentHeight - windowHeight
      );

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      
      // Update state after scroll completes
      setTimeout(() => {
        checkFooterVisibility();
      }, 500);
    }
  }, [checkFooterVisibility]);

  if (!isMounted) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`fixed ${workPage ? "bottom-16" : "bottom-8"} right-8 z-50 cursor-pointer`}
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
          <p>{isFooterVisible ? "Scroll to top" : "Scroll down"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ScrollIcon;

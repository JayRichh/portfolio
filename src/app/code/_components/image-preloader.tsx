"use client";

import React, { useEffect } from "react";
import { Project } from "../../../lib/projectData";

interface ImagePreloaderProps {
  projects: Project[];
  onLoadComplete: () => void;
}

export const ImagePreloader: React.FC<ImagePreloaderProps> = ({
  projects,
  onLoadComplete,
}) => {
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = projects
        .slice(0, 6) // Preload first 6 images
        .map((project) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = project.imgUrl;
            // Force browser to start loading image
            img.style.position = "absolute";
            img.style.opacity = "0";
            img.style.pointerEvents = "none";
            document.body.appendChild(img);
            setTimeout(() => document.body.removeChild(img), 0);
          });
        });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
        console.error("Error preloading images:", error);
      } finally {
        // Add a small delay to ensure smooth transition
        setTimeout(onLoadComplete, 300);
      }
    };

    preloadImages();
  }, [projects, onLoadComplete]);

  return (
    <>
      {/* Preload first 6 project images */}
      {projects.slice(0, 6).map((project) => (
        <link
          key={project.imgUrl}
          rel="preload"
          as="image"
          href={project.imgUrl}
          crossOrigin="anonymous"
        />
      ))}
    </>
  );
};

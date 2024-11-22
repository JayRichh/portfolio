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
      // Only preload images that are likely to be in the viewport
      const imagePromises = projects
        .slice(0, 3) // Reduced from 6 to 3 for better initial load
        .map((project) => {
          return new Promise((resolve, reject) => {
            const img = document.createElement("img");
            img.onload = resolve;
            img.onerror = reject;
            img.src = project.imgUrl;
            // Use fetchpriority for the first image
            if (projects.indexOf(project) === 0) {
              img.setAttribute("fetchpriority", "high");
            }
          });
        });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
        console.error("Error preloading images:", error);
      } finally {
        onLoadComplete();
      }
    };

    preloadImages();
  }, [projects, onLoadComplete]);

  return (
    <>
      {/* Preload first 3 project images with optimized loading strategy */}
      {projects.slice(0, 3).map((project, index) => (
        <link
          key={project.imgUrl}
          rel="preload"
          as="image"
          href={project.imgUrl}
          fetchPriority={index === 0 ? "high" : "auto"}
          crossOrigin="anonymous"
        />
      ))}
      {/* Add image size hints for the browser */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (min-width: 640px) {
          img {
            width: 640px;
            height: auto;
            aspect-ratio: 16/9;
            contain: size layout;
          }
        }
      `,
        }}
      />
    </>
  );
};

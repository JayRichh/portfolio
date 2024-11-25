import React, { useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  if (typeof window === "undefined") return null;

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return createPortal(
    <div className="fixed inset-0 z-[999] bg-black/90" onClick={onClose}>
      <div
        className="absolute inset-0 flex items-center justify-center p-4"
        onClick={stopPropagation}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-[1000] rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        >
          <X size={24} />
        </button>

        {/* Navigation buttons */}
        <button
          onClick={onPrev}
          className="absolute left-6 z-[1000] rounded-full bg-white/10 px-6 py-3 text-3xl text-white transition-colors hover:bg-white/20"
        >
          ‹
        </button>

        <button
          onClick={onNext}
          className="absolute right-6 z-[1000] rounded-full bg-white/10 px-6 py-3 text-3xl text-white transition-colors hover:bg-white/20"
        >
          ›
        </button>

        {/* Image container */}
        <div className="relative h-[85vh] w-[85vw]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-full w-full">
              <Image
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                fill
                sizes="85vw"
                priority
                className="object-contain"
                onClick={stopPropagation}
              />
            </div>
          </div>
        </div>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 z-[1000] -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>,
    document.body,
  );
};

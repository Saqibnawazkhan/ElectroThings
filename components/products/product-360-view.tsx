"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCw, Play, Pause } from "lucide-react";

interface Product360ViewProps {
  images: string[];
  alt: string;
}

export function Product360View({ images, alt }: Product360ViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const delta = e.clientX - startX;
    const sensitivity = 10;

    if (Math.abs(delta) > sensitivity) {
      if (delta > 0) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.img
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          src={images[currentIndex]}
          alt={`${alt} - View ${currentIndex + 1}`}
          className="h-full w-full object-contain"
        />

        <div className="absolute top-4 right-4 rounded-lg bg-black/50 px-3 py-1 text-sm font-medium text-white">
          <RotateCw className="inline h-4 w-4 mr-1" />
          360° View
        </div>

        <div className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-3 py-1 text-sm text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Drag to rotate or use controls
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Auto Rotate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

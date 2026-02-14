"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductZoomProps {
  image: string;
  alt: string;
}

export function ProductZoom({ image, alt }: ProductZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x, y });
  };

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden rounded-lg bg-muted aspect-square cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <motion.img
          src={image}
          alt={alt}
          className={cn(
            "h-full w-full object-contain transition-transform duration-200",
            isZoomed && "scale-200"
          )}
          style={{
            transformOrigin: isZoomed ? `${position.x}% ${position.y}%` : "center",
          }}
        />

        {!isZoomed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
            <div className="rounded-lg bg-white px-4 py-2 flex items-center gap-2">
              <ZoomIn className="h-5 w-5" />
              <span className="font-medium">Hover to zoom</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted"
        >
          {isZoomed ? (
            <>
              <ZoomOut className="h-4 w-4" />
              Zoom Out
            </>
          ) : (
            <>
              <ZoomIn className="h-4 w-4" />
              Zoom In
            </>
          )}
        </button>
        <button className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted">
          <Maximize2 className="h-4 w-4" />
          Full Screen
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductGallery3DProps {
  images: string[];
  productName: string;
}

export function ProductGallery3D({ images, productName }: ProductGallery3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isZoomed) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // If no images, use placeholder
  const displayImages = images.length > 0 ? images : ["/images/placeholder.svg"];

  return (
    <>
      <div className="space-y-4">
        {/* Main image with 3D tilt */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted"
          style={{ perspective: 1000 }}
        >
          {/* Glow effect */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0"
            whileHover={{ opacity: 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* 3D Image container */}
          <motion.div
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative w-full h-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full cursor-zoom-in"
                onClick={() => setIsZoomed(true)}
              >
                <Image
                  src={displayImages[activeIndex]}
                  alt={`${productName} - Image ${activeIndex + 1}`}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                {/* Reflection effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Navigation arrows */}
          {displayImages.length > 1 && (
            <>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={prevImage}
                  className="rounded-full shadow-lg backdrop-blur-sm bg-background/80"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={nextImage}
                  className="rounded-full shadow-lg backdrop-blur-sm bg-background/80"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </motion.div>
            </>
          )}

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsZoomed(true)}
                className="rounded-full shadow-lg backdrop-blur-sm bg-background/80"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsFullscreen(true)}
                className="rounded-full shadow-lg backdrop-blur-sm bg-background/80"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Image counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg">
              <span className="text-sm font-medium">
                {activeIndex + 1} / {displayImages.length}
              </span>
            </div>
          )}
        </div>

        {/* Thumbnails with 3D effect */}
        {displayImages.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {displayImages.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                style={{ perspective: 500 }}
                className={cn(
                  "relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300",
                  index === activeIndex
                    ? "border-primary ring-4 ring-primary/20 shadow-lg"
                    : "border-border/50 hover:border-primary/50"
                )}
              >
                <motion.div
                  whileHover={{ rotateY: 10 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="w-full h-full"
                >
                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                  {index === activeIndex && (
                    <motion.div
                      layoutId="activeThumbnail"
                      className="absolute inset-0 bg-primary/10"
                    />
                  )}
                </motion.div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[90vh] w-full h-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayImages[activeIndex]}
                alt={productName}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Navigation in zoom mode */}
              {displayImages.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={displayImages[activeIndex]}
                alt={productName}
                fill
                className="object-contain"
                sizes="100vw"
              />
              <Button
                variant="secondary"
                size="icon"
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 rounded-full"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Thumbnail strip */}
              {displayImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-background/20 backdrop-blur-sm">
                  {displayImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                        index === activeIndex
                          ? "border-white scale-110"
                          : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

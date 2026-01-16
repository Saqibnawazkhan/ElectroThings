"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function ImageGallery({ images, alt = "Product image", className }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  const fallbackImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800";

  return (
    <>
      <div className={cn("space-y-4", className)}>
        {/* Main Image */}
        <motion.div
          className="relative aspect-square rounded-2xl overflow-hidden bg-muted cursor-zoom-in group"
          onClick={() => setIsLightboxOpen(true)}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={imageError[currentIndex] ? fallbackImage : images[currentIndex]}
                alt={`${alt} ${currentIndex + 1}`}
                fill
                className="object-cover"
                onError={() => handleImageError(currentIndex)}
                unoptimized
              />
            </motion.div>
          </AnimatePresence>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"
            >
              <Maximize2 className="h-5 w-5 text-gray-800" />
            </motion.div>
          </motion.div>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 text-white text-sm backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </motion.div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-colors",
                  currentIndex === index
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-transparent hover:border-muted-foreground/30"
                )}
              >
                <Image
                  src={imageError[index] ? fallbackImage : image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(index)}
                  unoptimized
                />
                {currentIndex === index && (
                  <motion.div
                    layoutId="thumbnail-indicator"
                    className="absolute inset-0 bg-primary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => {
              setIsLightboxOpen(false);
              setIsZoomed(false);
            }}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsLightboxOpen(false);
                setIsZoomed(false);
              }}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </motion.button>

            {/* Zoom toggle */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              className="absolute top-4 right-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            >
              {isZoomed ? <ZoomOut className="h-6 w-6" /> : <ZoomIn className="h-6 w-6" />}
            </motion.button>

            {/* Main image */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              animate={{
                scale: isZoomed ? 1.5 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-[90vw] max-h-[90vh] cursor-move"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={imageError[currentIndex] ? fallbackImage : images[currentIndex]}
                    alt={`${alt} ${currentIndex + 1}`}
                    width={1200}
                    height={1200}
                    className="max-h-[90vh] w-auto object-contain"
                    onError={() => handleImageError(currentIndex)}
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Navigation */}
            {images.length > 1 && (
              <>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.1, x: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="h-8 w-8" />
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.1, x: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="h-8 w-8" />
                </motion.button>
              </>
            )}

            {/* Thumbnails strip */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 rounded-xl bg-white/10 backdrop-blur-sm"
              >
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={cn(
                      "relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                      currentIndex === index
                        ? "border-white"
                        : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={imageError[index] ? fallbackImage : image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(index)}
                      unoptimized
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Product image with magnifier on hover
export function MagnifierImage({
  src,
  alt = "Product",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800";
  const magnifierSize = 150;
  const zoomLevel = 2.5;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMagnifierPosition({ x, y });
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-2xl cursor-crosshair", className)}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02 }}
    >
      <Image
        src={imageError ? fallbackImage : src}
        alt={alt}
        fill
        className="object-cover"
        onError={() => setImageError(true)}
        unoptimized
      />

      {/* Magnifier lens */}
      <AnimatePresence>
        {showMagnifier && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute pointer-events-none border-4 border-white shadow-2xl rounded-full overflow-hidden"
            style={{
              width: magnifierSize,
              height: magnifierSize,
              left: magnifierPosition.x - magnifierSize / 2,
              top: magnifierPosition.y - magnifierSize / 2,
              backgroundImage: `url(${imageError ? fallbackImage : src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${containerRef.current?.offsetWidth ?? 0 * zoomLevel}px ${containerRef.current?.offsetHeight ?? 0 * zoomLevel}px`,
              backgroundPositionX: -(magnifierPosition.x * zoomLevel - magnifierSize / 2),
              backgroundPositionY: -(magnifierPosition.y * zoomLevel - magnifierSize / 2),
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

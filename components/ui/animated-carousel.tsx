"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

export function AnimatedCarousel({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      zIndex: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = children.length - 1;
      if (next >= children.length) next = 0;
      return next;
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        paginate(1);
      }, autoPlayInterval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayInterval, currentIndex]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="w-full"
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      {showArrows && children.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center z-10 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center z-10 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </>
      )}

      {/* Dots indicator */}
      {showDots && children.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {children.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                currentIndex === index
                  ? "bg-primary"
                  : "bg-white/50 dark:bg-gray-600/50 hover:bg-white/80 dark:hover:bg-gray-500/80"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Card stack carousel (3D stacked cards)
export function CardStackCarousel({
  children,
  className,
}: {
  children: React.ReactNode[];
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % children.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + children.length) % children.length);
  };

  return (
    <div className={cn("relative h-[400px] flex items-center justify-center", className)}>
      {/* Cards */}
      <div className="relative w-full max-w-md">
        {children.map((child, index) => {
          const offset = index - currentIndex;
          const absOffset = Math.abs(offset);
          const isActive = index === currentIndex;

          // Only show 3 cards at a time
          if (absOffset > 2) return null;

          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                x: offset * 30,
                scale: 1 - absOffset * 0.1,
                zIndex: children.length - absOffset,
                opacity: 1 - absOffset * 0.3,
                rotateY: offset * 5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className={cn(
                "absolute inset-0",
                isActive ? "cursor-default" : "cursor-pointer"
              )}
              onClick={() => !isActive && setCurrentIndex(index)}
            >
              {child}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={goToPrev}
        className="absolute left-4 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center"
      >
        <ChevronLeft className="h-5 w-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={goToNext}
        className="absolute right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center"
      >
        <ChevronRight className="h-5 w-5" />
      </motion.button>
    </div>
  );
}

// Infinite scroll carousel
export function InfiniteCarousel({
  children,
  speed = 20,
  pauseOnHover = true,
  className,
}: {
  children: React.ReactNode[];
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <motion.div
        className="flex gap-6"
        animate={{
          x: isPaused ? 0 : [0, -50 * children.length + "%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {/* Double the children for seamless loop */}
        {[...children, ...children].map((child, index) => (
          <div key={index} className="shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Coverflow carousel
export function CoverflowCarousel({
  children,
  className,
}: {
  children: React.ReactNode[];
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(children.length / 2));
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: number) => {
    setCurrentIndex((prev) => {
      let next = prev + direction;
      if (next < 0) next = 0;
      if (next >= children.length) next = children.length - 1;
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center py-8", className)}
      style={{ perspective: 1000 }}
    >
      {children.map((child, index) => {
        const offset = index - currentIndex;
        const absOffset = Math.abs(offset);

        return (
          <motion.div
            key={index}
            initial={false}
            animate={{
              x: offset * 200,
              z: -absOffset * 100,
              rotateY: offset * -45,
              scale: 1 - absOffset * 0.2,
              opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.2,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ transformStyle: "preserve-3d" }}
            className={cn(
              "absolute cursor-pointer",
              index === currentIndex && "z-10"
            )}
            onClick={() => setCurrentIndex(index)}
          >
            {child}
          </motion.div>
        );
      })}

      {/* Navigation */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleScroll(-1)}
        disabled={currentIndex === 0}
        className="absolute left-4 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center z-20 disabled:opacity-50"
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => handleScroll(1)}
        disabled={currentIndex === children.length - 1}
        className="absolute right-4 w-12 h-12 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg flex items-center justify-center z-20 disabled:opacity-50"
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>
    </div>
  );
}

// Testimonial carousel with fade effect
export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className,
}: {
  testimonials: {
    content: string;
    author: string;
    role?: string;
    avatar?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  return (
    <div className={cn("relative text-center", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Quote */}
          <motion.p
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed"
          >
            &ldquo;{testimonials[currentIndex].content}&rdquo;
          </motion.p>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            {testimonials[currentIndex].avatar && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="w-12 h-12 rounded-full bg-muted overflow-hidden"
              >
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].author}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-semibold"
              >
                {testimonials[currentIndex].author}
              </motion.p>
              {testimonials[currentIndex].role && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm text-muted-foreground"
                >
                  {testimonials[currentIndex].role}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}

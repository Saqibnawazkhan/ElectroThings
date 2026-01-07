"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  className?: string;
}

export function ProductCarousel({
  title,
  products,
  className,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="hidden sm:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="hidden sm:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Gradient & Button */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none hidden sm:block" />
        )}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => scroll("left")}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex",
            !canScrollLeft && "!opacity-0 pointer-events-none"
          )}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        {/* Products Scroll Area */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[260px] max-w-[260px] sm:min-w-[280px] sm:max-w-[280px]"
              style={{ scrollSnapAlign: "start" }}
            >
              <ProductCard product={product} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Right Gradient & Button */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden sm:block" />
        )}
        <Button
          variant="secondary"
          size="icon"
          onClick={() => scroll("right")}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex",
            !canScrollRight && "!opacity-0 pointer-events-none"
          )}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Scroll Indicator Dots */}
      <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
        {Array.from({ length: Math.ceil(products.length / 2) }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              i === 0 ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ProductShowcase3DProps {
  products: Product[];
  title?: string;
}

export function ProductShowcase3D({ products, title = "Hot Products" }: ProductShowcase3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const addItem = useCartStore((state) => state.addItem);

  const currentProduct = products[currentIndex];

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {
    addItem(currentProduct);
    toast.success(`${currentProduct.name} added to cart`);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
    }),
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-red-500 border-0">
            Limited Time Offer
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
        </motion.div>

        {/* 3D Showcase */}
        <div
          ref={containerRef}
          className="relative max-w-6xl mx-auto"
          style={{ perspective: 2000 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Image */}
            <div className="relative aspect-square">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    rotateY: { duration: 0.5 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full group">
                    {/* Glow effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-60" />

                    {/* Image container */}
                    <motion.div
                      className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted border border-border/50 shadow-2xl"
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Image
                        src={currentProduct.images[0] || "/images/placeholder.svg"}
                        alt={currentProduct.name}
                        fill
                        className="object-contain p-8"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />

                      {/* Reflection */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-t from-black/20 to-transparent rounded-full blur-md" />
                    </motion.div>

                    {/* Floating badges */}
                    {currentProduct.originalPrice && (
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute top-4 left-4"
                      >
                        <Badge className="bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-lg text-lg px-3 py-1">
                          {Math.round(
                            ((currentProduct.originalPrice - currentProduct.price) /
                              currentProduct.originalPrice) *
                              100
                          )}
                          % OFF
                        </Badge>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Product Details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-primary font-medium uppercase tracking-wider mb-2">
                    {currentProduct.category}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {currentProduct.name}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {currentProduct.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(currentProduct.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    ({currentProduct.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    ${currentProduct.price}
                  </span>
                  {currentProduct.originalPrice && (
                    <span className="text-2xl text-muted-foreground line-through">
                      ${currentProduct.originalPrice}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg text-lg px-8"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                  </motion.div>
                  <Link href={`/products/${currentProduct.slug}`}>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button size="lg" variant="outline" className="text-lg px-8">
                        <Eye className="mr-2 h-5 w-5" />
                        View Details
                      </Button>
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-12">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-primary to-purple-600"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

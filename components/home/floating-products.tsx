"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

interface FloatingProductsProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export function FloatingProducts({
  products,
  title = "Featured Products",
  subtitle = "Discover our handpicked selection",
}: FloatingProductsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Floating background shapes */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 left-[10%] w-48 h-48 rounded-full bg-gradient-to-br from-pink-500/10 to-orange-500/10 blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </motion.div>

        {/* Floating product cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              style={{ perspective: 1000 }}
            >
              <Link href={`/products/${product.slug}`}>
                <motion.div
                  whileHover={{
                    y: -20,
                    rotateY: 5,
                    rotateX: 5,
                    scale: 1.02,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="group relative"
                >
                  {/* Card glow */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-background to-muted/50 rounded-2xl border border-border/50 overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500">
                    {/* Image container with 3D effect */}
                    <div className="relative aspect-square p-6 bg-gradient-to-br from-muted/50 to-muted">
                      <motion.div
                        className="relative w-full h-full"
                        animate={{
                          y: [0, -10, 0],
                          rotateY: [-2, 2, -2],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5,
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <Image
                          src={product.images[0] || "/images/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain drop-shadow-2xl"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </motion.div>

                      {/* Reflection effect */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-t from-black/20 to-transparent rounded-full blur-md" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-muted text-muted"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({product.reviewCount})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-primary"
                        >
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 hover:bg-primary/5 group"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

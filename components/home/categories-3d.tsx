"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Smartphone, Headphones, Gamepad2, Watch, Cable } from "lucide-react";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface Categories3DProps {
  categories: Category[];
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  electronics: Smartphone,
  audio: Headphones,
  gaming: Gamepad2,
  wearables: Watch,
  accessories: Cable,
};

const categoryGradients: Record<string, string> = {
  electronics: "from-blue-500 to-cyan-500",
  audio: "from-purple-500 to-pink-500",
  gaming: "from-green-500 to-emerald-500",
  wearables: "from-orange-500 to-red-500",
  accessories: "from-indigo-500 to-violet-500",
};

export function Categories3D({ categories }: Categories3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      {/* Animated background elements */}
      <motion.div
        style={{ x }}
        className="absolute top-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      />
      <motion.div
        style={{ x: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
        className="absolute bottom-20 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
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
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4"
          >
            Browse Categories
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Shop by{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our wide range of premium electronics across different categories
          </p>
        </motion.div>

        {/* 3D Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const Icon = categoryIcons[category.slug] || Smartphone;
            const gradient = categoryGradients[category.slug] || "from-primary to-purple-500";

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                style={{ perspective: 1000 }}
              >
                <Link href={`/categories/${category.slug}`}>
                  <motion.div
                    whileHover={{
                      y: -15,
                      rotateY: 10,
                      rotateX: 5,
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="group relative h-full"
                  >
                    {/* Glow effect */}
                    <div
                      className={cn(
                        "absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 bg-gradient-to-br",
                        gradient
                      )}
                    />

                    {/* Card */}
                    <div className="relative h-full bg-gradient-to-br from-background via-background to-muted/50 rounded-2xl border border-border/50 overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                      {/* Top gradient bar */}
                      <div
                        className={cn(
                          "h-1.5 bg-gradient-to-r transition-all duration-300",
                          gradient
                        )}
                      />

                      {/* Icon container with 3D effect */}
                      <div className="p-6 pb-4">
                        <motion.div
                          className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br shadow-lg",
                            gradient
                          )}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          style={{
                            transform: "translateZ(30px)",
                            transformStyle: "preserve-3d",
                          }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>

                        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>

                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {category.description}
                        </p>

                        {/* Product count */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {category.productCount} Products
                          </span>
                          <motion.div
                            className={cn(
                              "flex items-center gap-1 text-sm font-medium bg-gradient-to-r bg-clip-text text-transparent",
                              gradient
                            )}
                            whileHover={{ x: 5 }}
                          >
                            <span>Explore</span>
                            <ArrowRight className="h-4 w-4 text-primary" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <motion.div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                          gradient
                        )}
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

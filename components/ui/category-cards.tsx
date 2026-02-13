"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: LucideIcon;
  itemCount?: number;
  color?: string;
}

// Simple category card with image
export function CategoryCard({
  category,
  index = 0,
  className,
}: {
  category: Category;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/categories/${category.slug}`}>
        <motion.div
          whileHover={{ y: -5 }}
          className={cn(
            "group relative rounded-2xl overflow-hidden bg-background border border-border/50",
            className
          )}
        >
          {/* Image */}
          <div className="aspect-square relative overflow-hidden">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                {category.icon && <category.icon className="h-16 w-16 text-primary/50" />}
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <motion.h3
                className="text-xl font-bold text-white mb-1"
                whileHover={{ x: 5 }}
              >
                {category.name}
              </motion.h3>
              {category.itemCount !== undefined && (
                <p className="text-white/70 text-sm">{category.itemCount} products</p>
              )}

              {/* Arrow indicator */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="absolute right-6 bottom-6 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ArrowRight className="h-5 w-5 text-white" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Category card with icon
export function CategoryCardIcon({
  category,
  index = 0,
  className,
}: {
  category: Category;
  index?: number;
  className?: string;
}) {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/categories/${category.slug}`}>
        <motion.div
          whileHover={{ y: -5, scale: 1.02 }}
          className={cn(
            "group relative p-6 rounded-2xl bg-background border border-border/50 text-center transition-shadow hover:shadow-xl",
            className
          )}
        >
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className={cn(
              "w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center",
              category.color || "bg-gradient-to-br from-primary to-purple-600"
            )}
          >
            {Icon && <Icon className="h-8 w-8 text-white" />}
          </motion.div>

          {/* Name */}
          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h3>

          {/* Item count */}
          {category.itemCount !== undefined && (
            <p className="text-sm text-muted-foreground">{category.itemCount} items</p>
          )}

          {/* Hover arrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
              Browse <ChevronRight className="h-4 w-4" />
            </span>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Category card horizontal
export function CategoryCardHorizontal({
  category,
  index = 0,
  className,
}: {
  category: Category;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/categories/${category.slug}`}>
        <motion.div
          whileHover={{ x: 5 }}
          className={cn(
            "group flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors",
            className
          )}
        >
          {/* Image/Icon */}
          <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            ) : category.icon ? (
              <div
                className={cn(
                  "w-full h-full flex items-center justify-center",
                  category.color || "bg-gradient-to-br from-primary to-purple-600"
                )}
              >
                <category.icon className="h-8 w-8 text-white" />
              </div>
            ) : (
              <div className="w-full h-full bg-muted" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate group-hover:text-primary transition-colors">
              {category.name}
            </h4>
            {category.description && (
              <p className="text-sm text-muted-foreground truncate">{category.description}</p>
            )}
          </div>

          {/* Arrow */}
          <motion.div
            initial={{ x: -5, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Featured category card
export function CategoryCardFeatured({
  category,
  className,
}: {
  category: Category;
  className?: string;
}) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className={cn(
          "group relative rounded-3xl overflow-hidden bg-background",
          className
        )}
      >
        {/* Background Image */}
        <div className="aspect-[16/9] relative">
          {category.image && (
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 max-w-lg">
            {category.icon && (
              <motion.div
                whileHover={{ rotate: 10 }}
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-4",
                  category.color || "bg-white/20 backdrop-blur-sm"
                )}
              >
                <category.icon className="h-7 w-7 text-white" />
              </motion.div>
            )}

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {category.name}
            </h2>

            {category.description && (
              <p className="text-white/80 mb-6 line-clamp-2">{category.description}</p>
            )}

            <motion.div
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-white font-medium"
            >
              Explore {category.name}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="h-5 w-5" />
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

// Category grid
export function CategoryGrid({
  categories,
  variant = "default",
  columns = 4,
  className,
}: {
  categories: Category[];
  variant?: "default" | "icon" | "horizontal";
  columns?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  };

  const CardComponent =
    variant === "icon"
      ? CategoryCardIcon
      : variant === "horizontal"
      ? CategoryCardHorizontal
      : CategoryCard;

  return (
    <div
      className={cn(
        "grid gap-4",
        variant === "horizontal" ? "grid-cols-1 md:grid-cols-2" : gridCols[columns],
        className
      )}
    >
      {categories.map((category, index) => (
        <CardComponent key={category.id} category={category} index={index} />
      ))}
    </div>
  );
}

// Category pills
export function CategoryPills({
  categories,
  selectedId,
  onSelect,
  className,
}: {
  categories: Category[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect?.(category.id)}
          className={cn(
            "relative px-4 py-2 rounded-full text-sm font-medium transition-colors",
            selectedId === category.id
              ? "text-white"
              : "text-muted-foreground hover:text-foreground bg-muted"
          )}
        >
          {selectedId === category.id && (
            <motion.div
              layoutId="category-pill-bg"
              className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {category.icon && <category.icon className="h-4 w-4" />}
            {category.name}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// Category slider
export function CategorySlider({
  categories,
  className,
}: {
  categories: Category[];
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto scrollbar-hide -mx-4 px-4", className)}>
      <motion.div
        className="flex gap-4"
        drag="x"
        dragConstraints={{ left: -500, right: 0 }}
      >
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="shrink-0 w-[200px]"
          >
            <CategoryCardIcon category={category} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

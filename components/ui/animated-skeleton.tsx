"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "shimmer" | "pulse" | "wave";
}

export function AnimatedSkeleton({
  className,
  variant = "shimmer",
}: SkeletonProps) {
  const baseClasses = "rounded-lg bg-muted relative overflow-hidden";

  if (variant === "pulse") {
    return (
      <motion.div
        className={cn(baseClasses, className)}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
    );
  }

  if (variant === "wave") {
    return (
      <div className={cn(baseClasses, className)}>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    );
  }

  // Default shimmer
  return (
    <div className={cn(baseClasses, className)}>
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          translateX: ["−100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Product card skeleton
export function ProductCardSkeleton({ variant = "shimmer" }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background rounded-2xl border border-border/50 overflow-hidden"
    >
      {/* Image skeleton */}
      <AnimatedSkeleton variant={variant} className="aspect-square w-full" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <AnimatedSkeleton variant={variant} className="h-4 w-16" />

        {/* Title */}
        <AnimatedSkeleton variant={variant} className="h-5 w-full" />

        {/* Price and rating */}
        <div className="flex items-center justify-between">
          <AnimatedSkeleton variant={variant} className="h-6 w-20" />
          <AnimatedSkeleton variant={variant} className="h-4 w-12" />
        </div>

        {/* Button */}
        <AnimatedSkeleton variant={variant} className="h-10 w-full" />
      </div>
    </motion.div>
  );
}

// Product grid skeleton
export function ProductGridSkeleton({
  count = 8,
  variant = "shimmer",
}: {
  count?: number;
  variant?: SkeletonProps["variant"];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <ProductCardSkeleton variant={variant} />
        </motion.div>
      ))}
    </div>
  );
}

// Text skeleton with multiple lines
export function TextSkeleton({
  lines = 3,
  variant = "shimmer",
  className,
}: {
  lines?: number;
  variant?: SkeletonProps["variant"];
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <AnimatedSkeleton
          key={i}
          variant={variant}
          className={cn(
            "h-4",
            i === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

// Avatar skeleton
export function AvatarSkeleton({
  size = "md",
  variant = "shimmer",
}: {
  size?: "sm" | "md" | "lg";
  variant?: SkeletonProps["variant"];
}) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <AnimatedSkeleton
      variant={variant}
      className={cn("rounded-full", sizes[size])}
    />
  );
}

// Cart item skeleton
export function CartItemSkeleton({ variant = "shimmer" }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-4 p-4 border-b border-border/50"
    >
      {/* Image */}
      <AnimatedSkeleton variant={variant} className="w-20 h-20 rounded-xl shrink-0" />

      {/* Content */}
      <div className="flex-1 space-y-2">
        <AnimatedSkeleton variant={variant} className="h-5 w-3/4" />
        <AnimatedSkeleton variant={variant} className="h-4 w-1/4" />
        <div className="flex justify-between">
          <AnimatedSkeleton variant={variant} className="h-8 w-24" />
          <AnimatedSkeleton variant={variant} className="h-6 w-16" />
        </div>
      </div>
    </motion.div>
  );
}

// Order card skeleton
export function OrderCardSkeleton({ variant = "shimmer" }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background rounded-2xl border border-border/50 p-6 space-y-4"
    >
      {/* Header */}
      <div className="flex justify-between">
        <AnimatedSkeleton variant={variant} className="h-5 w-32" />
        <AnimatedSkeleton variant={variant} className="h-6 w-24 rounded-full" />
      </div>

      {/* Items */}
      <div className="flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <AnimatedSkeleton key={i} variant={variant} className="w-16 h-16 rounded-lg" />
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-4 border-t border-border/50">
        <AnimatedSkeleton variant={variant} className="h-4 w-20" />
        <AnimatedSkeleton variant={variant} className="h-5 w-24" />
      </div>
    </motion.div>
  );
}

// Stats card skeleton
export function StatsCardSkeleton({ variant = "shimmer" }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-background rounded-2xl border border-border/50 p-6"
    >
      <div className="flex items-center gap-4">
        <AnimatedSkeleton variant={variant} className="w-12 h-12 rounded-xl" />
        <div className="space-y-2 flex-1">
          <AnimatedSkeleton variant={variant} className="h-4 w-20" />
          <AnimatedSkeleton variant={variant} className="h-8 w-32" />
        </div>
      </div>
    </motion.div>
  );
}

// Table row skeleton
export function TableRowSkeleton({
  columns = 5,
  variant = "shimmer",
}: {
  columns?: number;
  variant?: SkeletonProps["variant"];
}) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-border/50"
    >
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="p-4">
          <AnimatedSkeleton
            variant={variant}
            className={cn(
              "h-4",
              i === 0 ? "w-8" : i === 1 ? "w-full max-w-[200px]" : "w-20"
            )}
          />
        </td>
      ))}
    </motion.tr>
  );
}

// Form skeleton
export function FormSkeleton({
  fields = 4,
  variant = "shimmer",
}: {
  fields?: number;
  variant?: SkeletonProps["variant"];
}) {
  return (
    <div className="space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="space-y-2"
        >
          <AnimatedSkeleton variant={variant} className="h-4 w-24" />
          <AnimatedSkeleton variant={variant} className="h-10 w-full" />
        </motion.div>
      ))}

      {/* Submit button */}
      <AnimatedSkeleton variant={variant} className="h-12 w-full mt-4" />
    </div>
  );
}

// Page header skeleton
export function PageHeaderSkeleton({ variant = "shimmer" }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <AnimatedSkeleton variant={variant} className="h-8 w-48" />
      <AnimatedSkeleton variant={variant} className="h-5 w-96" />
    </motion.div>
  );
}

// Review card skeleton
export function ReviewCardSkeleton({ variant = "shimmer" }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border border-border/50 rounded-xl space-y-3"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <AvatarSkeleton size="md" variant={variant} />
        <div className="space-y-1.5 flex-1">
          <AnimatedSkeleton variant={variant} className="h-4 w-32" />
          <AnimatedSkeleton variant={variant} className="h-3 w-24" />
        </div>
      </div>

      {/* Rating */}
      <AnimatedSkeleton variant={variant} className="h-4 w-28" />

      {/* Content */}
      <TextSkeleton lines={3} variant={variant} />
    </motion.div>
  );
}

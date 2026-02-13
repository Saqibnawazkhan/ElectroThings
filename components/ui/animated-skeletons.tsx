"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Base skeleton component
interface SkeletonProps {
  className?: string;
  variant?: "pulse" | "wave" | "shimmer";
}

export function Skeleton({ className, variant = "shimmer" }: SkeletonProps) {
  const baseClasses = "bg-muted rounded-lg";

  if (variant === "pulse") {
    return (
      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={cn(baseClasses, className)}
      />
    );
  }

  if (variant === "wave") {
    return (
      <div className={cn(baseClasses, "relative overflow-hidden", className)}>
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-transparent"
        />
      </div>
    );
  }

  // Shimmer (default)
  return (
    <div className={cn(baseClasses, "relative overflow-hidden", className)}>
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
      />
    </div>
  );
}

// Product card skeleton
export function ProductCardSkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border bg-background p-4"
    >
      {/* Image */}
      <Skeleton variant={variant} className="aspect-square w-full rounded-xl mb-4" />

      {/* Category */}
      <Skeleton variant={variant} className="h-3 w-16 mb-2" />

      {/* Title */}
      <Skeleton variant={variant} className="h-5 w-full mb-2" />
      <Skeleton variant={variant} className="h-5 w-3/4 mb-3" />

      {/* Rating */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} variant={variant} className="h-4 w-4 rounded-full" />
        ))}
        <Skeleton variant={variant} className="h-4 w-8 ml-2" />
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 mb-4">
        <Skeleton variant={variant} className="h-7 w-20" />
        <Skeleton variant={variant} className="h-5 w-14" />
      </div>

      {/* Button */}
      <Skeleton variant={variant} className="h-10 w-full rounded-lg" />
    </motion.div>
  );
}

// Product grid skeleton
export function ProductGridSkeleton({
  count = 8,
  variant,
}: {
  count?: number;
  variant?: SkeletonProps["variant"];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
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

// Category card skeleton
export function CategoryCardSkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 rounded-2xl border bg-background"
    >
      <Skeleton variant={variant} className="w-16 h-16 rounded-xl mb-4" />
      <Skeleton variant={variant} className="h-5 w-24 mb-2" />
      <Skeleton variant={variant} className="h-4 w-16" />
    </motion.div>
  );
}

// Hero section skeleton
export function HeroSkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <div className="relative py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <Skeleton variant={variant} className="h-8 w-40 mx-auto mb-8 rounded-full" />

        {/* Title */}
        <Skeleton variant={variant} className="h-16 w-3/4 mx-auto mb-4" />
        <Skeleton variant={variant} className="h-16 w-1/2 mx-auto mb-6" />

        {/* Description */}
        <Skeleton variant={variant} className="h-6 w-full max-w-2xl mx-auto mb-2" />
        <Skeleton variant={variant} className="h-6 w-3/4 max-w-xl mx-auto mb-10" />

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <Skeleton variant={variant} className="h-12 w-36 rounded-lg" />
          <Skeleton variant={variant} className="h-12 w-44 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// Cart item skeleton
export function CartItemSkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-4 p-4 rounded-xl border"
    >
      {/* Image */}
      <Skeleton variant={variant} className="w-24 h-24 rounded-lg flex-shrink-0" />

      {/* Content */}
      <div className="flex-1">
        <Skeleton variant={variant} className="h-5 w-3/4 mb-2" />
        <Skeleton variant={variant} className="h-4 w-1/4 mb-3" />
        <div className="flex items-center justify-between">
          <Skeleton variant={variant} className="h-8 w-24 rounded-lg" />
          <Skeleton variant={variant} className="h-6 w-16" />
        </div>
      </div>
    </motion.div>
  );
}

// User profile skeleton
export function ProfileSkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <div className="flex items-center gap-4">
      <Skeleton variant={variant} className="w-16 h-16 rounded-full" />
      <div>
        <Skeleton variant={variant} className="h-5 w-32 mb-2" />
        <Skeleton variant={variant} className="h-4 w-24" />
      </div>
    </div>
  );
}

// Table row skeleton
export function TableRowSkeleton({
  columns = 5,
  variant,
}: {
  columns?: number;
  variant?: SkeletonProps["variant"];
}) {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b"
    >
      {[...Array(columns)].map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton variant={variant} className="h-4 w-full" />
        </td>
      ))}
    </motion.tr>
  );
}

// Table skeleton
export function TableSkeleton({
  rows = 5,
  columns = 5,
  variant,
}: {
  rows?: number;
  columns?: number;
  variant?: SkeletonProps["variant"];
}) {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i} className="p-4 text-left">
                <Skeleton variant={variant} className="h-4 w-24" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, i) => (
            <TableRowSkeleton key={i} columns={columns} variant={variant} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Stats card skeleton
export function StatsCardSkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl border bg-background"
    >
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant={variant} className="w-12 h-12 rounded-xl" />
        <Skeleton variant={variant} className="w-16 h-6 rounded-full" />
      </div>
      <Skeleton variant={variant} className="h-8 w-24 mb-2" />
      <Skeleton variant={variant} className="h-4 w-20" />
    </motion.div>
  );
}

// Blog post card skeleton
export function BlogCardSkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border bg-background overflow-hidden"
    >
      <Skeleton variant={variant} className="aspect-video w-full" />
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <Skeleton variant={variant} className="h-5 w-16 rounded-full" />
          <Skeleton variant={variant} className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton variant={variant} className="h-6 w-full mb-2" />
        <Skeleton variant={variant} className="h-6 w-3/4 mb-4" />
        <Skeleton variant={variant} className="h-4 w-full mb-2" />
        <Skeleton variant={variant} className="h-4 w-full mb-2" />
        <Skeleton variant={variant} className="h-4 w-2/3 mb-4" />
        <div className="flex items-center gap-3 pt-4 border-t">
          <Skeleton variant={variant} className="w-10 h-10 rounded-full" />
          <div>
            <Skeleton variant={variant} className="h-4 w-24 mb-1" />
            <Skeleton variant={variant} className="h-3 w-16" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Form skeleton
export function FormSkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <div className="space-y-6">
      {/* Field 1 */}
      <div>
        <Skeleton variant={variant} className="h-4 w-20 mb-2" />
        <Skeleton variant={variant} className="h-12 w-full rounded-xl" />
      </div>

      {/* Field 2 */}
      <div>
        <Skeleton variant={variant} className="h-4 w-24 mb-2" />
        <Skeleton variant={variant} className="h-12 w-full rounded-xl" />
      </div>

      {/* Field 3 - Textarea */}
      <div>
        <Skeleton variant={variant} className="h-4 w-28 mb-2" />
        <Skeleton variant={variant} className="h-32 w-full rounded-xl" />
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-3">
        <Skeleton variant={variant} className="w-5 h-5 rounded" />
        <Skeleton variant={variant} className="h-4 w-48" />
      </div>

      {/* Button */}
      <Skeleton variant={variant} className="h-12 w-full rounded-xl" />
    </div>
  );
}

// Review skeleton
export function ReviewSkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl border bg-background"
    >
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant={variant} className="w-12 h-12 rounded-full" />
        <div>
          <Skeleton variant={variant} className="h-5 w-32 mb-1" />
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant={variant} className="w-4 h-4 rounded-full" />
            ))}
          </div>
        </div>
      </div>
      <Skeleton variant={variant} className="h-4 w-full mb-2" />
      <Skeleton variant={variant} className="h-4 w-full mb-2" />
      <Skeleton variant={variant} className="h-4 w-3/4" />
    </motion.div>
  );
}

// Checkout order summary skeleton
export function OrderSummarySkeleton({ variant }: { variant?: SkeletonProps["variant"] }) {
  return (
    <div className="p-6 rounded-2xl border bg-background">
      <Skeleton variant={variant} className="h-6 w-32 mb-6" />

      {/* Items */}
      <div className="space-y-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton variant={variant} className="w-16 h-16 rounded-lg" />
            <div className="flex-1">
              <Skeleton variant={variant} className="h-4 w-3/4 mb-1" />
              <Skeleton variant={variant} className="h-3 w-1/4" />
            </div>
            <Skeleton variant={variant} className="h-5 w-16" />
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="space-y-3 pt-4 border-t">
        <div className="flex justify-between">
          <Skeleton variant={variant} className="h-4 w-20" />
          <Skeleton variant={variant} className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton variant={variant} className="h-4 w-16" />
          <Skeleton variant={variant} className="h-4 w-12" />
        </div>
        <div className="flex justify-between pt-3 border-t">
          <Skeleton variant={variant} className="h-6 w-16" />
          <Skeleton variant={variant} className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
}

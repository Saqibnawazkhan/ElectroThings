"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingDown, Tag } from "lucide-react";

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showDiscount?: boolean;
  animated?: boolean;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

export function PriceDisplay({
  price,
  originalPrice,
  currency = "$",
  size = "md",
  showDiscount = true,
  animated = false,
}: PriceDisplayProps) {
  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const hasDiscount = originalPrice && originalPrice > price;

  const PriceWrapper = animated ? motion.div : "div";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-3">
        <PriceWrapper
          {...(animated && {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { type: "spring", stiffness: 260, damping: 20 },
          })}
          className={cn("font-bold text-primary", sizeClasses[size])}
        >
          {currency}
          {price.toFixed(2)}
        </PriceWrapper>

        {hasDiscount && (
          <>
            <span
              className={cn(
                "text-muted-foreground line-through",
                size === "sm" && "text-sm",
                size === "md" && "text-base",
                size === "lg" && "text-lg",
                size === "xl" && "text-xl"
              )}
            >
              {currency}
              {originalPrice.toFixed(2)}
            </span>

            {showDiscount && (
              <motion.span
                initial={animated ? { scale: 0, rotate: -180 } : false}
                animate={animated ? { scale: 1, rotate: 0 } : false}
                transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-sm font-semibold text-green-600"
              >
                <TrendingDown className="h-3 w-3" />
                {discountPercentage}% OFF
              </motion.span>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export function PriceTag({
  price,
  label = "Special Price",
  currency = "$",
}: {
  price: number;
  label?: string;
  currency?: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.05, rotate: 3 }}
      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-white shadow-lg"
    >
      <Tag className="h-5 w-5" />
      <div className="flex flex-col">
        <span className="text-xs font-medium opacity-90">{label}</span>
        <span className="text-xl font-bold">
          {currency}
          {price.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );
}

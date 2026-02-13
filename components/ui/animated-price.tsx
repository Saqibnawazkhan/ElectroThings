"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingDown, Sparkles } from "lucide-react";

interface AnimatedPriceProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showSavings?: boolean;
  animate?: boolean;
}

export function AnimatedPrice({
  price,
  originalPrice,
  currency = "$",
  className,
  size = "md",
  showSavings = true,
  animate = true,
}: AnimatedPriceProps) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const [displayValue, setDisplayValue] = useState("0.00");
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;
  const savings = hasDiscount ? originalPrice - price : 0;

  useEffect(() => {
    if (animate) {
      motionValue.set(price);
    } else {
      setDisplayValue(price.toFixed(2));
    }
  }, [price, animate, motionValue]);

  useEffect(() => {
    if (animate) {
      const unsubscribe = springValue.on("change", (latest) => {
        setDisplayValue(latest.toFixed(2));
      });
      return unsubscribe;
    }
  }, [springValue, animate]);

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl md:text-5xl",
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-baseline gap-3 flex-wrap">
        {/* Main price */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <motion.span
            className={cn(
              "font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-[length:200%_100%]",
              sizeClasses[size]
            )}
            animate={animate ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            } : undefined}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {currency}
            <span className="tabular-nums">{displayValue}</span>
          </motion.span>

          {/* Sparkle effect for discounted items */}
          {hasDiscount && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-2 -right-4"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4 text-yellow-500" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Original price with strikethrough */}
        {hasDiscount && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-muted-foreground line-through text-lg relative"
          >
            {currency}{originalPrice.toFixed(2)}
            {/* Animated strikethrough */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="absolute left-0 right-0 top-1/2 h-0.5 bg-red-500/60 origin-left"
            />
          </motion.span>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold shadow-lg"
          >
            <TrendingDown className="h-3 w-3" />
            -{discountPercent}%
          </motion.div>
        )}
      </div>

      {/* Savings display */}
      {hasDiscount && showSavings && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-green-600 dark:text-green-400 font-medium mt-1 flex items-center gap-1"
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🎉
          </motion.span>
          You save {currency}{savings.toFixed(2)}!
        </motion.p>
      )}
    </div>
  );
}

// Compact price display for cards
export function PriceTag({
  price,
  originalPrice,
  currency = "$",
  className,
}: {
  price: number;
  originalPrice?: number;
  currency?: string;
  className?: string;
}) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.span
        whileHover={{ scale: 1.05 }}
        className="text-xl font-bold text-primary"
      >
        {currency}{price.toFixed(2)}
      </motion.span>
      {hasDiscount && (
        <>
          <span className="text-sm text-muted-foreground line-through">
            {currency}{originalPrice.toFixed(2)}
          </span>
          <span className="text-xs font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">
            -{discountPercent}%
          </span>
        </>
      )}
    </div>
  );
}

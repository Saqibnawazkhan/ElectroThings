"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, ThumbsUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedRatingProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "stars" | "hearts" | "thumbs";
  showValue?: boolean;
  precision?: 0.5 | 1;
  className?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const gapClasses = {
  sm: "gap-0.5",
  md: "gap-1",
  lg: "gap-1.5",
};

export function AnimatedRating({
  value = 0,
  onChange,
  max = 5,
  readOnly = false,
  size = "md",
  variant = "stars",
  showValue = false,
  precision = 1,
  className,
}: AnimatedRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const icons = {
    stars: Star,
    hearts: Heart,
    thumbs: ThumbsUp,
  };

  const colors = {
    stars: { filled: "text-yellow-400", empty: "text-gray-300" },
    hearts: { filled: "text-red-500", empty: "text-gray-300" },
    thumbs: { filled: "text-blue-500", empty: "text-gray-300" },
  };

  const Icon = icons[variant];
  const colorScheme = colors[variant];

  const displayValue = hoverValue ?? value;

  const handleClick = (newValue: number) => {
    if (readOnly) return;
    setIsAnimating(true);
    onChange?.(newValue);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (readOnly) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const half = rect.width / 2;

    if (precision === 0.5) {
      setHoverValue(x < half ? index + 0.5 : index + 1);
    } else {
      setHoverValue(index + 1);
    }
  };

  return (
    <div className={cn("flex items-center", gapClasses[size], className)}>
      {Array.from({ length: max }).map((_, index) => {
        const fillPercentage = Math.min(Math.max(displayValue - index, 0), 1) * 100;
        const isFilled = fillPercentage > 0;

        return (
          <motion.button
            key={index}
            type="button"
            disabled={readOnly}
            onClick={() => handleClick(index + 1)}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHoverValue(null)}
            whileHover={readOnly ? {} : { scale: 1.2 }}
            whileTap={readOnly ? {} : { scale: 0.9 }}
            className={cn(
              "relative focus:outline-none transition-transform",
              !readOnly && "cursor-pointer"
            )}
          >
            {/* Background (empty) icon */}
            <Icon
              className={cn(
                sizeClasses[size],
                colorScheme.empty,
                "stroke-current fill-transparent"
              )}
            />

            {/* Filled icon with clip mask */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
              animate={isAnimating && isFilled ? { scale: [1, 1.3, 1] } : {}}
            >
              <Icon
                className={cn(
                  sizeClasses[size],
                  colorScheme.filled,
                  "fill-current stroke-current"
                )}
              />
            </motion.div>

            {/* Sparkle effect on hover */}
            <AnimatePresence>
              {hoverValue !== null && hoverValue >= index + 1 && !readOnly && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute -top-1 -right-1"
                >
                  <Sparkles className="h-3 w-3 text-yellow-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}

      {showValue && (
        <motion.span
          key={displayValue}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="ml-2 text-sm font-medium text-muted-foreground"
        >
          {displayValue.toFixed(precision === 0.5 ? 1 : 0)}
        </motion.span>
      )}
    </div>
  );
}

// Rating with review summary
export function RatingSummary({
  average,
  total,
  distribution,
  className,
}: {
  average: number;
  total: number;
  distribution: { stars: number; count: number }[];
  className?: string;
}) {
  const maxCount = Math.max(...distribution.map((d) => d.count));

  return (
    <div className={cn("flex gap-8", className)}>
      {/* Average rating display */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-5xl font-bold bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text text-transparent"
        >
          {average.toFixed(1)}
        </motion.div>
        <AnimatedRating value={average} readOnly size="sm" className="justify-center mt-2" />
        <p className="text-sm text-muted-foreground mt-1">{total} reviews</p>
      </div>

      {/* Distribution bars */}
      <div className="flex-1 space-y-2">
        {distribution
          .sort((a, b) => b.stars - a.stars)
          .map(({ stars, count }, index) => (
            <motion.div
              key={stars}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm text-muted-foreground w-8">{stars}★</span>
              <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(count / maxCount) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"
                />
              </div>
              <span className="text-sm text-muted-foreground w-12">{count}</span>
            </motion.div>
          ))}
      </div>
    </div>
  );
}

// Emoji rating
export function EmojiRating({
  value,
  onChange,
  className,
}: {
  value?: number;
  onChange?: (value: number) => void;
  className?: string;
}) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const emojis = [
    { emoji: "😞", label: "Very Bad", color: "bg-red-500" },
    { emoji: "😕", label: "Bad", color: "bg-orange-500" },
    { emoji: "😐", label: "Okay", color: "bg-yellow-500" },
    { emoji: "😊", label: "Good", color: "bg-lime-500" },
    { emoji: "😍", label: "Excellent", color: "bg-green-500" },
  ];

  const displayValue = hoverValue ?? value;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-center gap-4">
        {emojis.map((item, index) => {
          const isSelected = displayValue === index + 1;
          const isActive = displayValue !== undefined && displayValue >= index + 1;

          return (
            <motion.button
              key={index}
              onClick={() => onChange?.(index + 1)}
              onMouseEnter={() => setHoverValue(index + 1)}
              onMouseLeave={() => setHoverValue(null)}
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: isSelected ? 1.2 : 1,
                opacity: displayValue !== undefined && !isActive ? 0.4 : 1,
              }}
              className="relative p-3 rounded-full transition-colors"
            >
              <span className="text-4xl">{item.emoji}</span>

              {/* Selection ring */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className={cn(
                      "absolute inset-0 rounded-full -z-10",
                      item.color,
                      "opacity-20"
                    )}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        {displayValue !== undefined && (
          <motion.p
            key={displayValue}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              "text-center font-medium",
              emojis[displayValue - 1]?.color.replace("bg-", "text-")
            )}
          >
            {emojis[displayValue - 1]?.label}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Animated like button
export function AnimatedLikeButton({
  liked = false,
  count = 0,
  onToggle,
  className,
}: {
  liked?: boolean;
  count?: number;
  onToggle?: () => void;
  className?: string;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle?.();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex items-center gap-2 px-4 py-2 rounded-full border transition-colors",
        liked
          ? "bg-red-500/10 border-red-500/30 text-red-500"
          : "bg-muted border-border text-muted-foreground hover:text-foreground",
        className
      )}
    >
      <motion.div
        animate={isAnimating && liked ? { scale: [1, 1.5, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn("h-5 w-5 transition-colors", liked && "fill-current")}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: liked ? -10 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: liked ? 10 : -10 }}
          className="text-sm font-medium tabular-nums"
        >
          {count}
        </motion.span>
      </AnimatePresence>

      {/* Burst particles when liking */}
      <AnimatePresence>
        {isAnimating && liked && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 30,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 30,
                }}
                transition={{ duration: 0.6 }}
                className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-red-500"
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

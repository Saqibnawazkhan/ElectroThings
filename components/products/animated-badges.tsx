"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Flame,
  TrendingUp,
  Sparkles,
  Zap,
  Clock,
  Star,
  Award,
  ShieldCheck,
  Percent,
  Gift
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps {
  type: "hot" | "new" | "bestseller" | "sale" | "limited" | "featured" | "verified" | "discount" | "gift";
  value?: string | number;
  className?: string;
  animate?: boolean;
}

const badgeConfig = {
  hot: {
    icon: Flame,
    label: "Hot",
    gradient: "from-red-500 to-orange-500",
    bgColor: "bg-red-500/10",
    textColor: "text-red-500",
    glow: "shadow-red-500/30",
  },
  new: {
    icon: Sparkles,
    label: "New",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-500",
    glow: "shadow-blue-500/30",
  },
  bestseller: {
    icon: TrendingUp,
    label: "Bestseller",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-500",
    glow: "shadow-purple-500/30",
  },
  sale: {
    icon: Zap,
    label: "Sale",
    gradient: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
    textColor: "text-yellow-500",
    glow: "shadow-yellow-500/30",
  },
  limited: {
    icon: Clock,
    label: "Limited",
    gradient: "from-rose-500 to-red-500",
    bgColor: "bg-rose-500/10",
    textColor: "text-rose-500",
    glow: "shadow-rose-500/30",
  },
  featured: {
    icon: Star,
    label: "Featured",
    gradient: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500",
    glow: "shadow-amber-500/30",
  },
  verified: {
    icon: ShieldCheck,
    label: "Verified",
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    textColor: "text-green-500",
    glow: "shadow-green-500/30",
  },
  discount: {
    icon: Percent,
    label: "OFF",
    gradient: "from-red-500 to-pink-500",
    bgColor: "bg-red-500/10",
    textColor: "text-red-500",
    glow: "shadow-red-500/30",
  },
  gift: {
    icon: Gift,
    label: "Free Gift",
    gradient: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    glow: "shadow-indigo-500/30",
  },
};

export function AnimatedBadge({ type, value, className, animate = true }: AnimatedBadgeProps) {
  const config = badgeConfig[type];
  const Icon = config.icon;
  const displayLabel = value ? `${value}% ${config.label}` : config.label;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={className}
    >
      <Badge
        className={cn(
          "relative overflow-hidden border-0 px-3 py-1 font-semibold shadow-lg",
          `bg-gradient-to-r ${config.gradient}`,
          config.glow
        )}
      >
        {/* Shine effect */}
        {animate && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        )}

        <span className="relative z-10 flex items-center gap-1">
          <motion.span
            animate={animate ? { rotate: [0, -10, 10, 0] } : undefined}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <Icon className="h-3.5 w-3.5" />
          </motion.span>
          {displayLabel}
        </span>
      </Badge>
    </motion.div>
  );
}

// Pulsing badge for urgency
export function PulsingBadge({
  children,
  color = "primary",
  className
}: {
  children: React.ReactNode;
  color?: "primary" | "red" | "green" | "orange";
  className?: string;
}) {
  const colors = {
    primary: "bg-primary",
    red: "bg-red-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
  };

  return (
    <motion.div className={cn("relative", className)}>
      {/* Pulse rings */}
      <motion.span
        className={cn(
          "absolute inset-0 rounded-full opacity-30",
          colors[color]
        )}
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.span
        className={cn(
          "absolute inset-0 rounded-full opacity-30",
          colors[color]
        )}
        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      />

      <Badge className={cn("relative", colors[color])}>
        {children}
      </Badge>
    </motion.div>
  );
}

// Floating badge with 3D effect
export function FloatingBadge3D({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -5, 0],
        rotateY: [0, 5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.1,
        rotateX: 10,
        rotateY: 10,
        z: 50,
      }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stock badge with counter
interface StockBadgeProps {
  stock: number;
  threshold?: number;
  className?: string;
}

export function StockBadge({ stock, threshold = 10, className }: StockBadgeProps) {
  if (stock <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={className}
      >
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          Out of Stock
        </Badge>
      </motion.div>
    );
  }

  if (stock <= threshold) {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={className}
      >
        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-0">
          <Clock className="h-3 w-3 mr-1" />
          Only {stock} left!
        </Badge>
      </motion.div>
    );
  }

  return (
    <motion.div className={className}>
      <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/30">
        <ShieldCheck className="h-3 w-3 mr-1" />
        In Stock
      </Badge>
    </motion.div>
  );
}

// Rating badge with stars
interface RatingBadgeProps {
  rating: number;
  reviewCount?: number;
  className?: string;
}

export function RatingBadge({ rating, reviewCount, className }: RatingBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      className={className}
    >
      <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Star
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(rating)
                    ? "fill-yellow-500 text-yellow-500"
                    : "fill-muted text-muted"
                )}
              />
            </motion.span>
          ))}
          <span className="ml-1 text-xs font-medium">{rating.toFixed(1)}</span>
          {reviewCount && (
            <span className="text-xs text-muted-foreground">({reviewCount})</span>
          )}
        </div>
      </Badge>
    </motion.div>
  );
}

// Discount countdown badge
interface CountdownBadgeProps {
  endTime: Date;
  className?: string;
}

export function CountdownBadge({ endTime, className }: CountdownBadgeProps) {
  return (
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      className={className}
    >
      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 border-0 px-3 py-1.5">
        <Clock className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
        <span className="font-mono font-bold">Limited Time Offer</span>
      </Badge>
    </motion.div>
  );
}

// Combo badge group
interface BadgeGroupProps {
  badges: Array<{
    type: AnimatedBadgeProps["type"];
    value?: string | number;
  }>;
  className?: string;
}

export function BadgeGroup({ badges, className }: BadgeGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      <AnimatePresence>
        {badges.map((badge, index) => (
          <motion.div
            key={badge.type}
            initial={{ opacity: 0, scale: 0, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
          >
            <AnimatedBadge type={badge.type} value={badge.value} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { motion, Variants } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  Check,
  ArrowRight,
  Loader2,
  Bell,
  Package,
  Truck,
  CreditCard,
  Shield,
  Zap,
  Gift,
  Sparkles,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  animation?: "bounce" | "pulse" | "spin" | "shake" | "float" | "none";
}

// Base animated icon wrapper
export function AnimatedIcon({
  icon: Icon,
  size = 24,
  className,
  animation = "none",
}: AnimatedIconProps) {
  const animations: Record<string, Variants> = {
    bounce: {
      animate: {
        y: [0, -5, 0],
        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 0.5 },
      },
    },
    pulse: {
      animate: {
        scale: [1, 1.2, 1],
        transition: { duration: 0.6, repeat: Infinity },
      },
    },
    spin: {
      animate: {
        rotate: 360,
        transition: { duration: 1, repeat: Infinity, ease: "linear" },
      },
    },
    shake: {
      animate: {
        x: [0, -3, 3, -3, 3, 0],
        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
      },
    },
    float: {
      animate: {
        y: [0, -8, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      },
    },
    none: {},
  };

  return (
    <motion.div
      variants={animations[animation]}
      animate="animate"
      className={cn("inline-flex", className)}
    >
      <Icon size={size} />
    </motion.div>
  );
}

// Shopping cart with item count animation
interface CartIconProps {
  count?: number;
  className?: string;
}

export function AnimatedCartIcon({ count = 0, className }: CartIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={cn("relative", className)}
    >
      <motion.div
        animate={count > 0 ? { rotate: [0, -10, 10, 0] } : {}}
        transition={{ duration: 0.3 }}
      >
        <ShoppingCart className="h-6 w-6" />
      </motion.div>

      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold"
        >
          <motion.span
            key={count}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        </motion.span>
      )}
    </motion.div>
  );
}

// Heart with fill animation
interface HeartIconProps {
  filled?: boolean;
  className?: string;
  onToggle?: () => void;
}

export function AnimatedHeartIcon({ filled = false, className, onToggle }: HeartIconProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      className={className}
    >
      <motion.div
        animate={
          filled
            ? { scale: [1, 1.3, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn(
            "h-6 w-6 transition-colors",
            filled ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-400"
          )}
        />
      </motion.div>
    </motion.button>
  );
}

// Star rating with animation
interface StarRatingIconProps {
  rating: number;
  size?: number;
  className?: string;
}

export function AnimatedStarRating({ rating, size = 16, className }: StarRatingIconProps) {
  return (
    <div className={cn("flex gap-0.5", className)}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, type: "spring" }}
        >
          <Star
            size={size}
            className={cn(
              "transition-colors",
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : i < rating
                ? "fill-yellow-400/50 text-yellow-400/50"
                : "fill-muted text-muted"
            )}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Success checkmark animation
interface CheckIconProps {
  show?: boolean;
  className?: string;
}

export function AnimatedCheckIcon({ show = true, className }: CheckIconProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={show ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center",
        className
      )}
    >
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Check className="h-5 w-5" />
      </motion.div>
    </motion.div>
  );
}

// Arrow with motion
interface ArrowIconProps {
  direction?: "right" | "left" | "up" | "down";
  className?: string;
}

export function AnimatedArrowIcon({ direction = "right", className }: ArrowIconProps) {
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  };

  return (
    <motion.div
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{ rotate: rotations[direction] }}
      className={className}
    >
      <ArrowRight className="h-5 w-5" />
    </motion.div>
  );
}

// Loading spinner with gradient
interface SpinnerIconProps {
  size?: number;
  className?: string;
}

export function AnimatedSpinner({ size = 24, className }: SpinnerIconProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={className}
    >
      <Loader2 size={size} className="text-primary" />
    </motion.div>
  );
}

// Bell with notification animation
interface BellIconProps {
  hasNotification?: boolean;
  count?: number;
  className?: string;
}

export function AnimatedBellIcon({ hasNotification = false, count, className }: BellIconProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className={cn("relative", className)}
    >
      <motion.div
        animate={hasNotification ? { rotate: [0, 15, -15, 15, -15, 0] } : {}}
        transition={{ duration: 0.5, repeat: hasNotification ? Infinity : 0, repeatDelay: 3 }}
      >
        <Bell className="h-6 w-6" />
      </motion.div>

      {hasNotification && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"
        >
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-red-500"
          />
        </motion.span>
      )}

      {count !== undefined && count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold"
        >
          {count > 9 ? "9+" : count}
        </motion.span>
      )}
    </motion.div>
  );
}

// Package delivery animation
interface PackageIconProps {
  status?: "pending" | "shipping" | "delivered";
  className?: string;
}

export function AnimatedPackageIcon({ status = "pending", className }: PackageIconProps) {
  const icons = {
    pending: Package,
    shipping: Truck,
    delivered: Check,
  };

  const Icon = icons[status];

  const animations = {
    pending: { scale: [1, 1.05, 1] },
    shipping: { x: [0, 3, 0] },
    delivered: { scale: [1, 1.2, 1] },
  };

  const colors = {
    pending: "text-yellow-500",
    shipping: "text-blue-500",
    delivered: "text-green-500",
  };

  return (
    <motion.div
      animate={animations[status]}
      transition={{ duration: 1, repeat: Infinity }}
      className={cn(colors[status], className)}
    >
      <Icon className="h-6 w-6" />
    </motion.div>
  );
}

// Feature icons with hover effects
interface FeatureIconProps {
  icon: LucideIcon;
  color?: string;
  className?: string;
}

export function AnimatedFeatureIcon({ icon: Icon, color = "primary", className }: FeatureIconProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    purple: "bg-purple-500/10 text-purple-500",
    pink: "bg-pink-500/10 text-pink-500",
    green: "bg-green-500/10 text-green-500",
    blue: "bg-blue-500/10 text-blue-500",
    orange: "bg-orange-500/10 text-orange-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center",
        colorClasses[color as keyof typeof colorClasses] || colorClasses.primary,
        className
      )}
    >
      <Icon className="h-6 w-6" />
    </motion.div>
  );
}

// Sparkle burst animation
interface SparkleIconProps {
  className?: string;
}

export function AnimatedSparkle({ className }: SparkleIconProps) {
  return (
    <motion.div
      animate={{
        rotate: [0, 15, -15, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 2, repeat: Infinity }}
      className={cn("text-yellow-500", className)}
    >
      <Sparkles className="h-6 w-6" />
    </motion.div>
  );
}

// Lightning/Zap flash
interface ZapIconProps {
  className?: string;
}

export function AnimatedZap({ className }: ZapIconProps) {
  return (
    <motion.div
      animate={{
        opacity: [1, 0.5, 1],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className={cn("text-yellow-500", className)}
    >
      <Zap className="h-6 w-6 fill-current" />
    </motion.div>
  );
}

// Gradient icon wrapper
interface GradientIconProps {
  icon: LucideIcon;
  gradient?: string;
  size?: number;
  className?: string;
}

export function GradientIcon({
  icon: Icon,
  gradient = "from-primary to-purple-500",
  size = 24,
  className,
}: GradientIconProps) {
  return (
    <div className={cn("relative", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-r blur-sm opacity-50", gradient)} />
      <Icon
        size={size}
        className={cn("relative bg-gradient-to-r bg-clip-text", gradient)}
        style={{
          stroke: "url(#gradient)",
        }}
      />
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

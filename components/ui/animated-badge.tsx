"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { X, Check, Star, Zap, Crown, Sparkles, Flame } from "lucide-react";

interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "premium";
  size?: "sm" | "md" | "lg";
  removable?: boolean;
  onRemove?: () => void;
  pulse?: boolean;
  glow?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

const variantStyles = {
  default: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    glow: "shadow-none",
  },
  success: {
    bg: "bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
    glow: "shadow-green-500/20",
  },
  warning: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-600 dark:text-yellow-400",
    glow: "shadow-yellow-500/20",
  },
  error: {
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    glow: "shadow-red-500/20",
  },
  info: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    glow: "shadow-blue-500/20",
  },
  premium: {
    bg: "bg-gradient-to-r from-amber-500/20 to-orange-500/20",
    text: "text-amber-600 dark:text-amber-400",
    glow: "shadow-amber-500/30",
  },
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs gap-1",
  md: "px-2.5 py-1 text-sm gap-1.5",
  lg: "px-3 py-1.5 text-base gap-2",
};

export function AnimatedBadge({
  children,
  variant = "default",
  size = "md",
  removable = false,
  onRemove,
  pulse = false,
  glow = false,
  icon,
  className,
}: AnimatedBadgeProps) {
  const styles = variantStyles[variant];

  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center rounded-full font-medium relative",
        styles.bg,
        styles.text,
        sizeStyles[size],
        glow && `shadow-lg ${styles.glow}`,
        className
      )}
    >
      {/* Pulse effect */}
      {pulse && (
        <motion.span
          className={cn("absolute inset-0 rounded-full", styles.bg)}
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {icon && (
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {icon}
        </motion.span>
      )}

      <span className="relative">{children}</span>

      {removable && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onRemove}
          className="ml-0.5 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        >
          <X className="h-3 w-3" />
        </motion.button>
      )}
    </motion.span>
  );
}

// Status badge with icon
export function StatusBadge({
  status,
  className,
}: {
  status: "active" | "inactive" | "pending" | "verified" | "featured" | "new" | "hot";
  className?: string;
}) {
  const configs = {
    active: {
      label: "Active",
      icon: Check,
      color: "bg-green-500/10 text-green-600",
      dot: "bg-green-500",
    },
    inactive: {
      label: "Inactive",
      icon: X,
      color: "bg-gray-500/10 text-gray-600",
      dot: "bg-gray-500",
    },
    pending: {
      label: "Pending",
      icon: null,
      color: "bg-yellow-500/10 text-yellow-600",
      dot: "bg-yellow-500",
    },
    verified: {
      label: "Verified",
      icon: Check,
      color: "bg-blue-500/10 text-blue-600",
      dot: null,
    },
    featured: {
      label: "Featured",
      icon: Star,
      color: "bg-purple-500/10 text-purple-600",
      dot: null,
    },
    new: {
      label: "New",
      icon: Sparkles,
      color: "bg-primary/10 text-primary",
      dot: null,
    },
    hot: {
      label: "Hot",
      icon: Flame,
      color: "bg-red-500/10 text-red-600",
      dot: null,
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        config.color,
        className
      )}
    >
      {config.dot && (
        <motion.span
          className={cn("w-2 h-2 rounded-full", config.dot)}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      {Icon && (
        <motion.span
          animate={status === "hot" ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.5, repeat: status === "hot" ? Infinity : 0 }}
        >
          <Icon className="h-3.5 w-3.5" />
        </motion.span>
      )}
      {config.label}
    </motion.span>
  );
}

// Discount badge
export function DiscountBadge({
  discount,
  className,
}: {
  discount: number;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ scale: 0, rotate: -15 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: -5 }}
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
        "bg-gradient-to-r from-red-500 to-pink-500 text-white",
        "shadow-lg shadow-red-500/30",
        className
      )}
    >
      <Zap className="h-3 w-3" />
      -{discount}%
    </motion.span>
  );
}

// Premium badge
export function PremiumBadge({ className }: { className?: string }) {
  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
        "bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 text-white",
        "shadow-lg shadow-amber-500/40",
        className
      )}
    >
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Crown className="h-3.5 w-3.5" />
      </motion.span>
      Premium
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
    </motion.span>
  );
}

// Animated counter badge
export function CounterBadge({
  count,
  max = 99,
  className,
}: {
  count: number;
  max?: number;
  className?: string;
}) {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <AnimatePresence mode="wait">
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0, y: -10 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0, y: 10 }}
          className={cn(
            "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold",
            "bg-red-500 text-white shadow-lg shadow-red-500/30",
            className
          )}
        >
          <motion.span
            key={displayCount}
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            className="tabular-nums"
          >
            {displayCount}
          </motion.span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, ArrowRight, Sparkles, Zap, ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> {
  variant?: "default" | "gradient" | "outline" | "ghost" | "glow" | "neon";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      children,
      className,
      variant = "default",
      size = "md",
      loading = false,
      success = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      gradient: "bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white hover:opacity-90",
      outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
      ghost: "text-foreground hover:bg-muted",
      glow: "bg-primary text-white shadow-lg shadow-primary/50 hover:shadow-primary/70",
      neon: "bg-transparent border-2 border-primary text-primary shadow-[0_0_10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_20px_rgba(59,130,246,0.8)]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all",
          "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {/* Loading/Success state */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
            </motion.div>
          ) : success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Check className="h-5 w-5" />
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Content */}
        <motion.span
          animate={{ opacity: loading || success ? 0 : 1 }}
          className="flex items-center gap-2"
        >
          {leftIcon}
          {children}
          {rightIcon}
        </motion.span>

        {/* Shine effect for gradient variant */}
        {variant === "gradient" && (
          <motion.div
            className="absolute inset-0 -translate-x-full"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            }}
            animate={{
              translateX: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        )}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";

// Magnetic button
export function MagneticButton({
  children,
  className,
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'>) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative inline-flex items-center justify-center px-6 py-3 rounded-xl",
        "bg-primary text-white font-semibold",
        "transition-shadow hover:shadow-lg hover:shadow-primary/30",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Ripple button
export function RippleButton({
  children,
  className,
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'>) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    props.onClick?.(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-xl",
        "bg-primary text-white font-semibold",
        className
      )}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-20 h-20 rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x - 40,
            top: ripple.y - 40,
          }}
        />
      ))}
    </motion.button>
  );
}

// Add to cart button with animation
export function AddToCartButton({
  onAdd,
  className,
  loading = false,
  added = false,
}: {
  onAdd?: () => void;
  className?: string;
  loading?: boolean;
  added?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onAdd}
      disabled={loading}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold",
        "bg-primary text-white overflow-hidden",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            Adding...
          </motion.div>
        ) : added ? (
          <motion.div
            key="added"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Check className="h-5 w-5" />
            </motion.div>
            Added to Cart
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flying cart animation when added */}
      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ scale: [1, 0.5], x: [0, 100], y: [0, -100], opacity: [1, 0] }}
            transition={{ duration: 0.8 }}
            className="absolute"
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Wishlist/Favorite button
export function WishlistButton({
  isFavorite = false,
  onToggle,
  className,
}: {
  isFavorite?: boolean;
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      className={cn(
        "relative p-3 rounded-full border transition-colors",
        isFavorite
          ? "bg-red-500/10 border-red-500/30 text-red-500"
          : "bg-muted border-border text-muted-foreground hover:text-red-500",
        className
      )}
    >
      <motion.div
        animate={isAnimating && isFavorite ? { scale: [1, 1.4, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart className={cn("h-5 w-5", isFavorite && "fill-current")} />
      </motion.div>

      {/* Burst particles */}
      <AnimatePresence>
        {isAnimating && isFavorite && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 60 * Math.PI) / 180) * 25,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 25,
                }}
                transition={{ duration: 0.5 }}
                className="absolute w-2 h-2 rounded-full bg-red-500"
                style={{ left: "50%", top: "50%", marginLeft: -4, marginTop: -4 }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Arrow button with hover animation
export function ArrowButton({
  children,
  className,
  direction = "right",
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'> & {
  direction?: "left" | "right" | "up" | "down";
}) {
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: -90,
  };

  return (
    <motion.button
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-xl",
        "bg-primary text-white font-semibold",
        className
      )}
      {...props}
    >
      {children}
      <motion.div
        variants={{
          hover: { x: direction === "right" ? 5 : direction === "left" ? -5 : 0, y: direction === "down" ? 5 : direction === "up" ? -5 : 0 },
        }}
        style={{ rotate: rotations[direction] }}
      >
        <ArrowRight className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
}

// Sparkle button
export function SparkleButton({
  children,
  className,
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'>) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl",
        "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-semibold",
        "shadow-lg shadow-orange-500/30",
        className
      )}
      {...props}
    >
      <motion.div
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="h-5 w-5" />
      </motion.div>
      {children}

      {/* Sparkle particles */}
      <motion.div
        className="absolute -top-1 -right-1"
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Sparkles className="h-4 w-4 text-yellow-300" />
      </motion.div>
    </motion.button>
  );
}

// Flash sale button
export function FlashButton({
  children,
  className,
  ...props
}: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd'>) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl overflow-hidden",
        "bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold",
        "shadow-lg shadow-red-500/30",
        className
      )}
      {...props}
    >
      <motion.div
        animate={{ x: [0, -2, 2, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <Zap className="h-5 w-5" />
      </motion.div>
      {children}

      {/* Lightning strike effect */}
      <motion.div
        className="absolute inset-0 bg-white/30"
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
      />
    </motion.button>
  );
}

"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Loader2, ShoppingCart, Heart, Plus, Minus } from "lucide-react";

// Add to Cart button with animation
interface AddToCartButtonProps {
  onAdd: () => void;
  isAdding?: boolean;
  added?: boolean;
  className?: string;
  disabled?: boolean;
}

export function AddToCartButton({
  onAdd,
  isAdding = false,
  added = false,
  className,
  ...props
}: AddToCartButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        onClick={onAdd}
        disabled={isAdding}
        className={cn(
          "relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90",
          "transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25",
          className
        )}
        {...props}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />

        <AnimatePresence mode="wait">
          {isAdding ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding...
            </motion.span>
          ) : added ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex items-center gap-2"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.3 }}
              >
                <Check className="h-4 w-4" />
              </motion.span>
              Added!
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}

// Wishlist heart button with fill animation
interface WishlistButtonProps {
  isWishlisted: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WishlistButton({
  isWishlisted,
  onToggle,
  size = "md",
  className,
}: WishlistButtonProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "rounded-full flex items-center justify-center transition-all duration-300",
        "border-2 backdrop-blur-sm shadow-lg",
        isWishlisted
          ? "bg-red-500 border-red-500 text-white"
          : "bg-background/80 border-border hover:border-red-300 text-muted-foreground hover:text-red-500",
        sizes[size],
        className
      )}
    >
      <motion.div
        animate={isWishlisted ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn(
            iconSizes[size],
            isWishlisted ? "fill-current" : ""
          )}
        />
      </motion.div>

      {/* Heart particles on click */}
      <AnimatePresence>
        {isWishlisted && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, opacity: 1 }}
                animate={{
                  scale: 1,
                  opacity: 0,
                  x: Math.cos(i * 60 * Math.PI / 180) * 30,
                  y: Math.sin(i * 60 * Math.PI / 180) * 30,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute w-2 h-2 rounded-full bg-red-500"
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Quantity selector with animations
interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-muted rounded-xl p-1",
        className
      )}
    >
      <motion.button
        onClick={onDecrease}
        disabled={quantity <= min}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
          quantity <= min
            ? "text-muted-foreground cursor-not-allowed"
            : "hover:bg-background text-foreground"
        )}
      >
        <Minus className="h-4 w-4" />
      </motion.button>

      <div className="w-12 text-center font-semibold">
        <AnimatePresence mode="wait">
          <motion.span
            key={quantity}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="block"
          >
            {quantity}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        onClick={onIncrease}
        disabled={quantity >= max}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
          quantity >= max
            ? "text-muted-foreground cursor-not-allowed"
            : "hover:bg-background text-foreground"
        )}
      >
        <Plus className="h-4 w-4" />
      </motion.button>
    </div>
  );
}

// Glowing CTA button
interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ children, className, glowColor = "primary", ...props }, ref) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative"
      >
        {/* Glow effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.6 : 0.3,
            scale: isHovered ? 1.1 : 1,
          }}
          className={cn(
            "absolute -inset-1 rounded-xl blur-xl transition-all duration-300",
            glowColor === "primary"
              ? "bg-primary"
              : glowColor === "purple"
              ? "bg-purple-500"
              : "bg-gradient-to-r from-primary to-purple-500"
          )}
        />

        <Button
          ref={ref}
          className={cn(
            "relative bg-gradient-to-r from-primary to-purple-600",
            "hover:from-primary/90 hover:to-purple-600/90",
            "shadow-lg",
            className
          )}
          {...props}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);
GlowButton.displayName = "GlowButton";

// Bounce button
interface BounceButtonProps {
  children: React.ReactNode;
  bounceOnClick?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export function BounceButton({
  children,
  bounceOnClick = true,
  className,
  onClick,
  ...props
}: BounceButtonProps) {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (bounceOnClick) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 500);
    }
    onClick?.(e);
  };

  return (
    <motion.div
      animate={
        isBouncing
          ? {
              y: [0, -10, 0, -5, 0],
            }
          : {}
      }
      transition={{ duration: 0.5 }}
    >
      <Button
        onClick={handleClick}
        className={cn("transition-all duration-300", className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

// Icon button with tooltip-like expansion
interface ExpandingIconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "secondary" | "outline";
  className?: string;
}

export function ExpandingIconButton({
  icon,
  label,
  onClick,
  variant = "secondary",
  className,
}: ExpandingIconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{ width: isHovered ? "auto" : 40 }}
      className={cn(
        "h-10 rounded-xl flex items-center justify-center gap-2 overflow-hidden px-3 transition-colors",
        variant === "default" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-muted hover:bg-muted/80",
        variant === "outline" && "border-2 border-border hover:border-primary",
        className
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="whitespace-nowrap text-sm font-medium overflow-hidden"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Ripple effect button
interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export function RippleButton({
  children,
  className,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.(e);
  };

  return (
    <Button
      onClick={handleClick}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-16 h-16 rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x - 32,
            top: ripple.y - 32,
          }}
        />
      ))}
    </Button>
  );
}

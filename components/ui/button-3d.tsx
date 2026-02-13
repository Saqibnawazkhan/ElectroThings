"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface Button3DProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  glowColor?: string;
}

const variants = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md",
  outline:
    "border-2 border-primary bg-transparent text-primary hover:bg-primary/10",
  ghost: "bg-transparent hover:bg-muted text-foreground",
  gradient:
    "bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
};

const sizes = {
  sm: "h-8 px-3 text-xs rounded-lg",
  md: "h-10 px-4 text-sm rounded-xl",
  lg: "h-12 px-6 text-base rounded-xl",
  xl: "h-14 px-8 text-lg rounded-2xl",
};

export const Button3D = forwardRef<HTMLButtonElement, Button3DProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      icon,
      iconPosition = "left",
      glowColor,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{
          scale: disabled || loading ? 1 : 1.02,
          y: disabled || loading ? 0 : -2,
        }}
        whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        {...props}
      >
        {/* Animated shine effect for gradient variant */}
        {variant === "gradient" && !disabled && !loading && (
          <motion.div
            className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          />
        )}

        {/* Glow effect */}
        {glowColor && !disabled && (
          <div
            className="absolute -inset-1 rounded-[inherit] blur-md opacity-40 -z-10"
            style={{ backgroundColor: glowColor }}
          />
        )}

        {/* 3D depth effect */}
        <div
          className="absolute inset-0 rounded-[inherit] bg-black/20 -z-10"
          style={{
            transform: "translateZ(-10px) translateY(4px)",
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {!loading && icon && iconPosition === "left" && icon}
          {children}
          {!loading && icon && iconPosition === "right" && icon}
        </span>
      </motion.button>
    );
  }
);

Button3D.displayName = "Button3D";

// Magnetic button that moves toward cursor
export function MagneticButton({
  children,
  className,
  strength = 30,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
} & HTMLMotionProps<"button">) {
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.transform = "translate(0, 0)";
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative transition-transform duration-200 ease-out",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Ripple button with click effect
export function RippleButton({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className =
      "absolute rounded-full bg-white/30 animate-ripple pointer-events-none";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.transform = "translate(-50%, -50%)";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    props.onClick?.(e);
  };

  return (
    <button
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Glossy 3D button
export function GlossyButton({
  children,
  className,
  color = "primary",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "purple" | "pink" | "cyan";
} & HTMLMotionProps<"button">) {
  const colors = {
    primary: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    pink: "from-pink-400 to-pink-600",
    cyan: "from-cyan-400 to-cyan-600",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-6 py-3 rounded-2xl font-semibold text-white overflow-hidden",
        "shadow-lg hover:shadow-xl transition-shadow duration-300",
        className
      )}
      {...props}
    >
      {/* Base gradient */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b",
          colors[color]
        )}
      />

      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />

      {/* Bottom shadow */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
        whileHover={{ translateX: "100%" }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

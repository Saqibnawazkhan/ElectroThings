"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "light" | "dark" | "frosted" | "gradient";
  blur?: "sm" | "md" | "lg" | "xl";
  border?: boolean;
  glow?: boolean;
  glowColor?: string;
  hover3D?: boolean;
}

const blurLevels = {
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
};

const variants = {
  light: "bg-white/10 dark:bg-white/5",
  dark: "bg-black/10 dark:bg-black/20",
  frosted: "bg-white/20 dark:bg-white/10",
  gradient:
    "bg-gradient-to-br from-white/20 via-white/10 to-white/5 dark:from-white/10 dark:via-white/5 dark:to-transparent",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      className,
      variant = "light",
      blur = "lg",
      border = true,
      glow = false,
      glowColor = "rgba(139, 92, 246, 0.3)",
      hover3D = false,
      ...props
    },
    ref
  ) => {
    const commonProps = {
      ref,
      className: cn(
        "relative rounded-2xl overflow-hidden",
        blurLevels[blur],
        variants[variant],
        border && "border border-white/20 dark:border-white/10",
        className
      ),
    };

    const content = (
      <>
        {/* Glow effect */}
        {glow && (
          <div
            className="absolute -inset-0.5 rounded-2xl blur-md opacity-50 -z-10"
            style={{ backgroundColor: glowColor }}
          />
        )}

        {/* Inner highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </>
    );

    return (
      <motion.div
        {...commonProps}
        whileHover={hover3D ? {
          y: -5,
          rotateX: 5,
          rotateY: 5,
          scale: 1.02,
        } : undefined}
        transition={hover3D ? { type: "spring", stiffness: 300, damping: 20 } : undefined}
        style={hover3D ? { transformStyle: "preserve-3d", perspective: 1000 } : undefined}
        {...props}
      >
        {content}
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

// Neon glow card
export function NeonCard({
  children,
  className,
  color = "primary",
  animated = true,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "purple" | "pink" | "cyan" | "green";
  animated?: boolean;
} & HTMLMotionProps<"div">) {
  const colors = {
    primary: {
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.5)]",
      border: "border-blue-500/50",
      bg: "from-blue-500/10 to-transparent",
    },
    purple: {
      glow: "shadow-[0_0_30px_rgba(139,92,246,0.5)]",
      border: "border-purple-500/50",
      bg: "from-purple-500/10 to-transparent",
    },
    pink: {
      glow: "shadow-[0_0_30px_rgba(236,72,153,0.5)]",
      border: "border-pink-500/50",
      bg: "from-pink-500/10 to-transparent",
    },
    cyan: {
      glow: "shadow-[0_0_30px_rgba(6,182,212,0.5)]",
      border: "border-cyan-500/50",
      bg: "from-cyan-500/10 to-transparent",
    },
    green: {
      glow: "shadow-[0_0_30px_rgba(34,197,94,0.5)]",
      border: "border-green-500/50",
      bg: "from-green-500/10 to-transparent",
    },
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl border-2 bg-gradient-to-br overflow-hidden",
        colors[color].border,
        colors[color].bg,
        animated && colors[color].glow,
        className
      )}
      {...props}
    >
      {/* Animated border gradient */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${color === "primary" ? "rgba(59,130,246,0.3)" : color === "purple" ? "rgba(139,92,246,0.3)" : color === "pink" ? "rgba(236,72,153,0.3)" : color === "cyan" ? "rgba(6,182,212,0.3)" : "rgba(34,197,94,0.3)"}, transparent)`,
          }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Holographic card
export function HolographicCard({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={{ rotateY: 10, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative rounded-2xl overflow-hidden", className)}
      {...props}
    >
      {/* Rainbow gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)",
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Frosted glass effect */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/5" />

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

// Depth card with layered effect
export function DepthCard({
  children,
  className,
  layers = 3,
  offset = 4,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  layers?: number;
  offset?: number;
} & HTMLMotionProps<"div">) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("relative", className)}
      {...props}
    >
      {/* Background layers */}
      {Array.from({ length: layers }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 rounded-2xl border border-border/50",
            i === 0 && "bg-muted/80",
            i === 1 && "bg-muted/60",
            i === 2 && "bg-muted/40"
          )}
          style={{
            transform: `translateY(${(layers - i) * offset}px)`,
            zIndex: -layers + i,
          }}
        />
      ))}

      {/* Main card */}
      <div className="relative bg-background rounded-2xl border border-border p-6">
        {children}
      </div>
    </motion.div>
  );
}

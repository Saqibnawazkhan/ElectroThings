"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Floating element with customizable animation
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 3,
  distance = 10,
  className,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [0, -distance, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pulsing element
export function PulsingElement({
  children,
  className,
  scale = 1.1,
  duration = 2,
}: {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{
        scale: [1, scale, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Rotating element
export function RotatingElement({
  children,
  className,
  duration = 10,
  direction = "clockwise",
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  direction?: "clockwise" | "counterclockwise";
}) {
  return (
    <motion.div
      animate={{
        rotate: direction === "clockwise" ? 360 : -360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Bouncing element
export function BouncingElement({
  children,
  className,
  height = 10,
  duration = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  height?: number;
  duration?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -height, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: [0.36, 0, 0.66, -0.56],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Shimmer/shine effect
export function ShimmerEffect({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    </div>
  );
}

// Glowing orb background effect
export function GlowingOrbs({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "10%", left: "10%" }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-purple-500/20 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "10%", right: "10%" }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-pink-500/15 blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

// Parallax wrapper for scroll effects
export function ParallaxContainer({
  children,
  offset = 50,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ y: offset }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Gradient text with animation
export function GradientText({
  children,
  className,
  animated = true,
}: {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
}) {
  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%]",
        className
      )}
      animate={
        animated
          ? {
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }
          : undefined
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

// Morphing blob shape
export function MorphingBlob({
  className,
  color = "primary",
}: {
  className?: string;
  color?: "primary" | "purple" | "pink" | "cyan";
}) {
  const colors = {
    primary: "bg-primary/30",
    purple: "bg-purple-500/30",
    pink: "bg-pink-500/30",
    cyan: "bg-cyan-500/30",
  };

  return (
    <motion.div
      className={cn("blur-3xl", colors[color], className)}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

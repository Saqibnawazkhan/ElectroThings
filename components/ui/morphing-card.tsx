"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

interface MorphingCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  borderRadius?: number;
  glowColor?: string;
}

export function MorphingCard({
  children,
  className,
  intensity = 20,
  borderRadius = 20,
  glowColor = "rgba(139, 92, 246, 0.4)",
}: MorphingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), springConfig);

  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn("relative group cursor-pointer", className)}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-0.5 rounded-[inherit] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, ${glowColor}, transparent 60%)`,
          borderRadius,
        }}
      />

      {/* Card content */}
      <div
        className="relative bg-background/80 backdrop-blur-xl border border-border/50 overflow-hidden"
        style={{
          borderRadius,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Inner glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX} ${glowY}, ${glowColor.replace("0.4", "0.1")}, transparent 50%)`,
          }}
        />

        {children}
      </div>
    </motion.div>
  );
}

// Liquid blob morphing effect
export function LiquidBlob({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <motion.div
        animate={{
          borderRadius: [
            "60% 40% 30% 70%/60% 30% 70% 40%",
            "30% 60% 70% 40%/50% 60% 30% 60%",
            "60% 40% 30% 70%/60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 blur-3xl"
      />
    </div>
  );
}

// Gradient border card
export function GradientBorderCard({
  children,
  className,
  gradient = "from-primary via-purple-500 to-pink-500",
  animated = true,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animated?: boolean;
}) {
  return (
    <div className={cn("relative group p-[2px] rounded-2xl overflow-hidden", className)}>
      {/* Gradient border */}
      <motion.div
        className={cn("absolute inset-0 bg-gradient-to-r", gradient)}
        animate={
          animated
            ? {
                rotate: [0, 360],
              }
            : {}
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      />

      {/* Inner content */}
      <div className="relative bg-background rounded-[14px] h-full">{children}</div>
    </div>
  );
}

// Spotlight card
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(139, 92, 246, 0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative overflow-hidden rounded-2xl border border-border/50 bg-background", className)}
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Magnetic hover effect
export function MagneticHover({
  children,
  className,
  strength = 50,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / strength);
    y.set((e.clientY - centerY) / strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

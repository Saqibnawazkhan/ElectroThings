"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// Gradient mesh background
interface GradientMeshProps {
  className?: string;
  colors?: string[];
}

export function GradientMesh({
  className,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f97316"],
}: GradientMeshProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: "50%",
            height: "50%",
            background: color,
            left: `${(i % 2) * 50}%`,
            top: `${Math.floor(i / 2) * 50}%`,
          }}
          animate={{
            x: [0, 30, 0, -30, 0],
            y: [0, -30, 0, 30, 0],
            scale: [1, 1.1, 1, 0.9, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Floating orbs background
interface FloatingOrbsProps {
  count?: number;
  className?: string;
}

export function FloatingOrbs({ count = 6, className }: FloatingOrbsProps) {
  const orbs = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 100 + Math.random() * 200,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5,
    color: [
      "from-primary/20 to-purple-500/20",
      "from-pink-500/20 to-rose-500/20",
      "from-blue-500/20 to-cyan-500/20",
      "from-green-500/20 to-emerald-500/20",
      "from-yellow-500/20 to-orange-500/20",
    ][i % 5],
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={cn(
            "absolute rounded-full bg-gradient-to-br blur-3xl",
            orb.color
          )}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -50, 0, 50, 0],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated grid background
interface AnimatedGridProps {
  className?: string;
  gridSize?: number;
}

export function AnimatedGrid({ className, gridSize = 40 }: AnimatedGridProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      {/* Static grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(128,128,128,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(128,128,128,0.1) 1px, transparent 1px)`,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />

      {/* Animated highlight */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at var(--x) var(--y), rgba(var(--primary-rgb), 0.15) 0%, transparent 50%)`,
          backgroundSize: "100% 100%",
        }}
        animate={{
          "--x": ["0%", "100%", "100%", "0%", "0%"],
          "--y": ["0%", "0%", "100%", "100%", "0%"],
        } as any}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Noise/grain texture overlay
interface NoiseOverlayProps {
  opacity?: number;
  className?: string;
}

export function NoiseOverlay({ opacity = 0.03, className }: NoiseOverlayProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
}

// Aurora background effect
interface AuroraBackgroundProps {
  className?: string;
}

export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute -inset-[100%] opacity-50"
        style={{
          background: `
            linear-gradient(
              to right,
              transparent 0%,
              rgba(59, 130, 246, 0.3) 20%,
              rgba(139, 92, 246, 0.3) 40%,
              rgba(236, 72, 153, 0.3) 60%,
              rgba(34, 197, 94, 0.3) 80%,
              transparent 100%
            )
          `,
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Spotlight effect that follows mouse
interface SpotlightBackgroundProps {
  className?: string;
  size?: number;
}

export function SpotlightBackground({
  className,
  size = 400,
}: SpotlightBackgroundProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="pointer-events-none absolute"
        animate={{
          left: position.x - size / 2,
          top: position.y - size / 2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

// Waves animation background
interface WavesBackgroundProps {
  className?: string;
}

export function WavesBackground({ className }: WavesBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          className="absolute bottom-0 w-full"
          style={{ height: "40%", opacity: 0.1 - i * 0.02 }}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <path
            fill="currentColor"
            className="text-primary"
            d="M0,192L48,181.3C96,171,192,149,288,154.7C384,160,480,192,576,197.3C672,203,768,181,864,181.3C960,181,1056,203,1152,197.3C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </motion.svg>
      ))}
    </div>
  );
}

// Blob morphing background
interface BlobBackgroundProps {
  className?: string;
}

export function BlobBackground({ className }: BlobBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.svg
        viewBox="0 0 500 500"
        className="absolute w-full h-full opacity-30"
      >
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <motion.path
          fill="url(#blobGradient)"
          animate={{
            d: [
              "M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99.5,339Q40,271,75.5,192Q111,113,googletag181.5,70.5Q252,28,323,73Q394,118,430.5,184Q467,250,440.5,320.5Z",
              "M411,314Q384,378,320.5,432.5Q257,487,186,453Q115,419,74,337Q33,255,86.5,187Q140,119,208.5,67Q277,15,344,69Q411,123,432,186.5Q453,250,411,314Z",
              "M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99.5,339Q40,271,75.5,192Q111,113,181.5,70.5Q252,28,323,73Q394,118,430.5,184Q467,250,440.5,320.5Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}

// Parallax star field
interface StarFieldProps {
  count?: number;
  className?: string;
}

export function StarField({ count = 100, className }: StarFieldProps) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
}

// Gradient text reveal on scroll
interface ScrollGradientProps {
  children: ReactNode;
  className?: string;
}

export function ScrollGradient({ children, className }: ScrollGradientProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ["0% 0%", "100% 100%"]
  );

  return (
    <motion.div
      ref={ref}
      style={{
        backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), #8b5cf6, #ec4899)",
        backgroundSize: "200% 200%",
        backgroundPosition,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Gradient border animation
interface GradientBorderProps {
  children: ReactNode;
  className?: string;
}

export function GradientBorder({ children, className }: GradientBorderProps) {
  return (
    <div className={cn("relative p-[2px] rounded-2xl", className)}>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="relative bg-background rounded-[14px]">{children}</div>
    </div>
  );
}

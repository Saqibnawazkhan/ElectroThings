"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Particle configuration
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
  opacity: number;
  life: number;
}

// Confetti explosion effect
interface ConfettiProps {
  trigger?: boolean;
  count?: number;
  duration?: number;
  className?: string;
}

export function Confetti({
  trigger = false,
  count = 50,
  duration = 3000,
  className,
}: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const colors = ["#f43f5e", "#8b5cf6", "#3b82f6", "#22c55e", "#f97316", "#eab308"];
      const newParticles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: 50,
        y: 50,
        size: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 20,
          y: (Math.random() - 0.5) * 20 - 10,
        },
        opacity: 1,
        life: duration,
      }));

      setParticles(newParticles);

      const timeout = setTimeout(() => setParticles([]), duration);
      return () => clearTimeout(timeout);
    }
  }, [trigger, count, duration]);

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            animate={{
              left: `${particle.x + particle.velocity.x * 10}%`,
              top: `${particle.y + particle.velocity.y * 10 + 50}%`,
              opacity: 0,
              scale: 0,
              rotate: Math.random() * 720 - 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000, ease: "easeOut" }}
            className="absolute"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: Math.random() > 0.5 ? "50%" : "0",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Sparkles effect around element
interface SparklesProps {
  children: ReactNode;
  count?: number;
  className?: string;
}

export function Sparkles({ children, count = 10, className }: SparklesProps) {
  const sparkles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 1,
  }));

  return (
    <div className={cn("relative inline-block", className)}>
      {children}
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: sparkle.duration,
            repeat: Infinity,
            delay: sparkle.delay,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-yellow-400">
            <path
              d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"
              fill="currentColor"
            />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}

// Bubbles rising effect
interface BubblesProps {
  count?: number;
  className?: string;
}

export function Bubbles({ count = 20, className }: BubblesProps) {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 30 + 10,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-br from-white/20 to-transparent border border-white/30"
          style={{
            left: `${bubble.x}%`,
            bottom: -bubble.size,
            width: bubble.size,
            height: bubble.size,
          }}
          animate={{
            y: [0, -(window?.innerHeight || 800) - bubble.size],
            x: [0, Math.sin(bubble.id) * 50],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Fireworks effect
interface FireworkProps {
  trigger?: boolean;
  x?: number;
  y?: number;
  count?: number;
}

export function Firework({ trigger = false, x = 50, y = 50, count = 30 }: FireworkProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const colors = ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#ff00ff", "#ffffff"];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const newParticles = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        return {
          id: i,
          x,
          y,
          size: 4,
          color,
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
          },
          opacity: 1,
          life: 1500,
        };
      });

      setParticles(newParticles);

      const timeout = setTimeout(() => setParticles([]), 1500);
      return () => clearTimeout(timeout);
    }
  }, [trigger, x, y, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 1,
            }}
            animate={{
              left: `${particle.x + particle.velocity.x * 15}%`,
              top: `${particle.y + particle.velocity.y * 15}%`,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-1 h-1 rounded-full"
            style={{ backgroundColor: particle.color, boxShadow: `0 0 6px ${particle.color}` }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Snow falling effect
interface SnowProps {
  count?: number;
  className?: string;
}

export function Snow({ count = 50, className }: SnowProps) {
  const flakes = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 10,
    drift: Math.random() * 50 - 25,
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${flake.x}%`,
            top: -20,
            width: flake.size,
            height: flake.size,
          }}
          animate={{
            y: [0, (window?.innerHeight || 800) + 20],
            x: [0, flake.drift],
            rotate: [0, 360],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Hearts floating effect (for wishlist, etc.)
interface FloatingHeartsProps {
  trigger?: boolean;
  count?: number;
}

export function FloatingHearts({ trigger = false, count = 10 }: FloatingHeartsProps) {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    if (trigger) {
      const newHearts = Array.from({ length: count }, (_, i) => ({
        id: Date.now() + i,
        x: 40 + Math.random() * 20,
        delay: Math.random() * 0.5,
      }));

      setHearts(newHearts);

      const timeout = setTimeout(() => setHearts([]), 2000);
      return () => clearTimeout(timeout);
    }
  }, [trigger, count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{
              left: `${heart.x}%`,
              top: "50%",
              opacity: 1,
              scale: 0,
            }}
            animate={{
              top: "20%",
              opacity: 0,
              scale: 1,
              x: [0, 10, -10, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.5,
              delay: heart.delay,
              x: { duration: 1, repeat: 2 },
            }}
            className="absolute text-red-500 text-2xl"
          >
            ❤️
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Glitter trail on mouse movement
interface GlitterTrailProps {
  className?: string;
}

export function GlitterTrail({ className }: GlitterTrailProps) {
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.7) {
        const newTrail = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };

        setTrails((prev) => [...prev.slice(-20), newTrail]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-50", className)}>
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            initial={{
              left: trail.x,
              top: trail.y,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              opacity: 0,
              scale: 0,
              y: 20,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute w-2 h-2"
          >
            <span className="text-yellow-400">✦</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Click ripple effect
interface ClickRippleProps {
  className?: string;
}

export function ClickRipple({ className }: ClickRippleProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-40", className)}>
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{
              left: ripple.x,
              top: ripple.y,
              width: 0,
              height: 0,
              opacity: 0.5,
            }}
            animate={{
              width: 200,
              height: 200,
              opacity: 0,
              x: -100,
              y: -100,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute rounded-full border-2 border-primary"
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Dust particles floating
interface DustParticlesProps {
  count?: number;
  className?: string;
}

export function DustParticles({ count = 30, className }: DustParticlesProps) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-foreground/10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 3D Cube loader
export function CubeLoader({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <div
      className={cn("relative", className)}
      style={{
        width: size,
        height: size,
        perspective: 200,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 border border-white/20"
          style={{ transform: `translateZ(${size / 2}px)` }}
        />
        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 border border-white/20"
          style={{ transform: `rotateY(180deg) translateZ(${size / 2}px)` }}
        />
        {/* Left */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-pink-600 to-orange-500 border border-white/20"
          style={{ transform: `rotateY(-90deg) translateZ(${size / 2}px)` }}
        />
        {/* Right */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-500 border border-white/20"
          style={{ transform: `rotateY(90deg) translateZ(${size / 2}px)` }}
        />
        {/* Top */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 border border-white/20"
          style={{ transform: `rotateX(90deg) translateZ(${size / 2}px)` }}
        />
        {/* Bottom */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 border border-white/20"
          style={{ transform: `rotateX(-90deg) translateZ(${size / 2}px)` }}
        />
      </motion.div>
    </div>
  );
}

// Orbital loader
export function OrbitalLoader({ className, size = 60 }: { className?: string; size?: number }) {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary" />

      {/* Orbits */}
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2 - index * 0.3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transform: `rotateX(${60 + index * 20}deg) rotateY(${index * 30}deg)`,
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                index === 0 ? "#3b82f6" : index === 1 ? "#8b5cf6" : "#ec4899",
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Pulse rings loader
export function PulseRingsLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-16 h-16", className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute inset-0 rounded-full border-2 border-primary"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
      <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-primary" />
    </div>
  );
}

// DNA helix loader
export function HelixLoader({ className }: { className?: string }) {
  const dots = 10;

  return (
    <div className={cn("relative w-16 h-16 flex items-center justify-center", className)}>
      {Array.from({ length: dots }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-primary to-purple-600"
          animate={{
            y: [0, -20, 0, 20, 0],
            scale: [1, 1.5, 1, 0.5, 1],
            opacity: [1, 0.8, 1, 0.8, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          style={{
            left: `${(i / dots) * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

// Morphing shape loader
export function MorphingLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-16 h-16", className)}>
      <motion.div
        className="w-full h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500"
        animate={{
          borderRadius: [
            "60% 40% 30% 70%/60% 30% 70% 40%",
            "30% 60% 70% 40%/50% 60% 30% 60%",
            "60% 40% 30% 70%/60% 30% 70% 40%",
          ],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

// Bouncing dots loader
export function BouncingDotsLoader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-purple-600"
          animate={{
            y: [0, -12, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Spinning gradient ring
export function SpinningRingLoader({ className, size = 48 }: { className?: string; size?: number }) {
  return (
    <div className={cn("relative", className)} style={{ width: size, height: size }}>
      <motion.div
        className="w-full h-full rounded-full"
        style={{
          background: "conic-gradient(from 0deg, transparent, #3b82f6, #8b5cf6, #ec4899, transparent)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div
        className="absolute bg-background rounded-full"
        style={{
          inset: size * 0.15,
        }}
      />
    </div>
  );
}

// Full page loading screen
export function FullPageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <CubeLoader size={60} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-lg font-medium text-muted-foreground"
      >
        {text}
      </motion.p>
    </div>
  );
}

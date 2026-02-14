"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ButtonVariantProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

// Gradient Button with Shine Effect
export function GradientShineButton({
  children,
  icon: Icon,
  className,
  onClick,
  disabled = false,
}: ButtonVariantProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-lg px-6 py-3 font-semibold text-white",
        "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
        "shadow-lg transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5" />}
        {children}
      </span>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "linear",
        }}
      />
    </motion.button>
  );
}

// Neon Glow Button
export function NeonGlowButton({
  children,
  icon: Icon,
  className,
  onClick,
  disabled = false,
}: ButtonVariantProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative rounded-lg border-2 border-cyan-500 px-6 py-3 font-bold text-cyan-500",
        "bg-transparent transition-all duration-300",
        "hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <span className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5" />}
        {children}
      </span>
    </motion.button>
  );
}

// 3D Press Button
export function Press3DButton({
  children,
  icon: Icon,
  className,
  onClick,
  disabled = false,
}: ButtonVariantProps) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95, y: disabled ? 0 : 2 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg px-6 py-3 font-bold text-white",
        "bg-gradient-to-b from-blue-500 to-blue-700",
        "shadow-[0_6px_0_0_rgb(29,78,216)] active:shadow-[0_2px_0_0_rgb(29,78,216)]",
        "transition-all duration-100 active:translate-y-1",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <span className="flex items-center gap-2">
        {Icon && <Icon className="h-5 w-5" />}
        {children}
      </span>
    </motion.button>
  );
}

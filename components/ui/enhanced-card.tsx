"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
}

export function EnhancedCard({
  children,
  className,
  hover = true,
  glow = false,
  gradient = false,
}: EnhancedCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative rounded-2xl border border-border/50 bg-card p-6",
        "shadow-lg transition-shadow duration-300",
        hover && "hover:shadow-2xl",
        glow && "hover:shadow-primary/20",
        gradient && "bg-gradient-to-br from-card to-muted/20",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function ProductHighlightCard({
  children,
  className,
  featured = false,
}: EnhancedCardProps & { featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 bg-card p-6",
        featured
          ? "border-primary/50 bg-gradient-to-br from-primary/5 to-purple-500/5"
          : "border-border/50",
        "shadow-xl transition-all duration-300 hover:shadow-2xl",
        className
      )}
    >
      {featured && (
        <div className="absolute top-0 right-0">
          <div className="rounded-bl-2xl bg-gradient-to-br from-primary to-purple-600 px-4 py-2 text-xs font-bold text-white">
            FEATURED
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

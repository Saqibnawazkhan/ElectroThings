"use client";

import { motion } from "framer-motion";
import { Zap, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickBuyButtonProps {
  onQuickBuy?: () => void;
  variant?: "default" | "express" | "oneclick";
  disabled?: boolean;
  className?: string;
}

export function QuickBuyButton({
  onQuickBuy,
  variant = "default",
  disabled = false,
  className,
}: QuickBuyButtonProps) {
  const variantConfig = {
    default: {
      label: "Quick Buy",
      icon: Zap,
      colors: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    express: {
      label: "Express Checkout",
      icon: Zap,
      colors: "bg-gradient-to-r from-blue-600 to-purple-600",
    },
    oneclick: {
      label: "Buy with 1-Click",
      icon: ShoppingCart,
      colors: "bg-gradient-to-r from-green-600 to-emerald-600",
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onQuickBuy}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-lg px-6 py-3 text-white font-semibold shadow-lg transition-all",
        config.colors,
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {config.label}
      </span>
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    </motion.button>
  );
}

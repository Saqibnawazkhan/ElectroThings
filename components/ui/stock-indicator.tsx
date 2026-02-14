"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AlertCircle, Check, Clock, TrendingUp } from "lucide-react";

interface StockIndicatorProps {
  stock: number;
  threshold?: {
    low: number;
    medium: number;
  };
  showNumber?: boolean;
  size?: "sm" | "md" | "lg";
}

export function StockIndicator({
  stock,
  threshold = { low: 5, medium: 20 },
  showNumber = true,
  size = "md",
}: StockIndicatorProps) {
  const getStockStatus = () => {
    if (stock === 0) return "out";
    if (stock <= threshold.low) return "low";
    if (stock <= threshold.medium) return "medium";
    return "high";
  };

  const status = getStockStatus();

  const statusConfig = {
    out: {
      label: "Out of Stock",
      color: "text-red-600 bg-red-50 border-red-200",
      icon: AlertCircle,
      iconColor: "text-red-600",
    },
    low: {
      label: `Only ${stock} left!`,
      color: "text-orange-600 bg-orange-50 border-orange-200",
      icon: Clock,
      iconColor: "text-orange-600",
    },
    medium: {
      label: showNumber ? `${stock} in stock` : "In Stock",
      color: "text-blue-600 bg-blue-50 border-blue-200",
      icon: TrendingUp,
      iconColor: "text-blue-600",
    },
    high: {
      label: "In Stock",
      color: "text-green-600 bg-green-50 border-green-200",
      icon: Check,
      iconColor: "text-green-600",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-medium",
        config.color,
        sizeClasses[size]
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{config.label}</span>
    </motion.div>
  );
}

export function StockProgressBar({
  stock,
  maxStock,
}: {
  stock: number;
  maxStock: number;
}) {
  const percentage = (stock / maxStock) * 100;

  const getColor = () => {
    if (percentage >= 50) return "bg-green-500";
    if (percentage >= 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Stock Level</span>
        <span className="text-muted-foreground">
          {stock} / {maxStock}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-full rounded-full", getColor())}
        />
      </div>
    </div>
  );
}

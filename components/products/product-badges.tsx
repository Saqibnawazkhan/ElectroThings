"use client";

import { motion } from "framer-motion";
import { Flame, TrendingUp, Sparkles, Clock, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductBadgesProps {
  productId: string;
  createdAt?: string;
  rating: number;
  reviewCount: number;
  stock: number;
  className?: string;
}

type BadgeType = {
  label: string;
  icon: React.ReactNode;
  className: string;
  priority: number;
};

export function ProductBadges({
  productId,
  createdAt,
  rating,
  reviewCount,
  stock,
  className,
}: ProductBadgesProps) {
  const badges: BadgeType[] = [];

  // Check if product is new (within last 30 days)
  if (createdAt) {
    const created = new Date(createdAt);
    const daysSinceCreation = Math.floor(
      (Date.now() - created.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceCreation <= 30) {
      badges.push({
        label: "New",
        icon: <Sparkles className="h-3 w-3" />,
        className: "bg-blue-500 hover:bg-blue-600 text-white border-0",
        priority: 1,
      });
    }
  }

  // Bestseller based on high review count
  if (reviewCount > 100) {
    badges.push({
      label: "Bestseller",
      icon: <Flame className="h-3 w-3" />,
      className: "bg-orange-500 hover:bg-orange-600 text-white border-0",
      priority: 2,
    });
  }

  // Trending based on high rating and reviews
  if (rating >= 4.5 && reviewCount > 50) {
    badges.push({
      label: "Trending",
      icon: <TrendingUp className="h-3 w-3" />,
      className: "bg-green-500 hover:bg-green-600 text-white border-0",
      priority: 3,
    });
  }

  // Limited stock
  if (stock > 0 && stock <= 5) {
    badges.push({
      label: "Limited",
      icon: <Clock className="h-3 w-3" />,
      className: "bg-red-500 hover:bg-red-600 text-white border-0",
      priority: 4,
    });
  }

  // Flash deal based on product ID hash (simulated)
  const hash = productId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  if (hash % 7 === 0) {
    badges.push({
      label: "Flash Deal",
      icon: <Zap className="h-3 w-3" />,
      className: "bg-yellow-500 hover:bg-yellow-600 text-black border-0",
      priority: 0,
    });
  }

  // Sort by priority and take top 2
  const displayBadges = badges.sort((a, b) => a.priority - b.priority).slice(0, 2);

  if (displayBadges.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {displayBadges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.2 }}
        >
          <Badge className={cn("text-xs font-medium", badge.className)}>
            {badge.icon}
            <span className="ml-1">{badge.label}</span>
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}

// Simpler version for product cards
export function ProductCardBadge({
  productId,
  rating,
  reviewCount,
  stock,
}: Omit<ProductBadgesProps, "className" | "createdAt">) {
  // Simple logic for card badges
  const hash = productId.split("").reduce((a, b) => a + b.charCodeAt(0), 0);

  if (hash % 7 === 0) {
    return (
      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-black border-0 text-xs">
        <Zap className="h-3 w-3 mr-1" />
        Flash Deal
      </Badge>
    );
  }

  if (reviewCount > 100) {
    return (
      <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 text-xs">
        <Flame className="h-3 w-3 mr-1" />
        Bestseller
      </Badge>
    );
  }

  if (rating >= 4.5 && reviewCount > 50) {
    return (
      <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 text-xs">
        <TrendingUp className="h-3 w-3 mr-1" />
        Trending
      </Badge>
    );
  }

  if (stock > 0 && stock <= 5) {
    return (
      <Badge className="bg-red-500 hover:bg-red-600 text-white border-0 text-xs">
        <Clock className="h-3 w-3 mr-1" />
        Limited
      </Badge>
    );
  }

  return null;
}

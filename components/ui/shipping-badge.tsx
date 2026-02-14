"use client";

import { motion } from "framer-motion";
import { Truck, Zap, Package, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function FreeShippingBadge({ threshold }: { threshold?: number }) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 text-white shadow-lg"
    >
      <Truck className="h-5 w-5" />
      <span className="font-semibold">
        {threshold
          ? `Free Shipping on orders over $${threshold}`
          : "Free Shipping"}
      </span>
    </motion.div>
  );
}

export function FastDeliveryBadge({ days = 2 }: { days?: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5 text-sm font-medium text-blue-600 border border-blue-500/20"
    >
      <Zap className="h-4 w-4" />
      <span>{days}-Day Delivery</span>
    </motion.div>
  );
}

export function ShippingStatus({
  status,
}: {
  status: "processing" | "shipped" | "delivered";
}) {
  const statusConfig = {
    processing: {
      label: "Processing Order",
      icon: Package,
      color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    },
    shipped: {
      label: "Shipped",
      icon: Truck,
      color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    },
    delivered: {
      label: "Delivered",
      icon: Package,
      color: "bg-green-500/10 text-green-600 border-green-500/20",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-medium",
        config.color
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{config.label}</span>
    </motion.div>
  );
}

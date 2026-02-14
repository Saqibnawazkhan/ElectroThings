"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Users, Eye, ShoppingBag, Heart, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

export function LiveViewerCount({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 text-sm font-medium text-orange-600"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Eye className="h-4 w-4" />
      </motion.div>
      <span>{count} people viewing</span>
    </motion.div>
  );
}

export function RecentPurchaseNotification({
  productName,
  location,
  time,
}: {
  productName: string;
  location: string;
  time: string;
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="fixed bottom-4 left-4 z-50 max-w-sm rounded-lg bg-white p-4 shadow-2xl border border-border"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-green-500/10 p-2">
              <ShoppingBag className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Recent Purchase</p>
              <p className="text-sm text-muted-foreground">
                Someone in <span className="font-medium">{location}</span> purchased{" "}
                <span className="font-medium">{productName}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{time}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function TrustBadges() {
  const badges = [
    { icon: Users, label: "10K+ Customers", color: "text-blue-600" },
    { icon: Heart, label: "Loved by Many", color: "text-red-600" },
    { icon: TrendingUp, label: "Top Rated", color: "text-green-600" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={badge.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-2"
          >
            <Icon className={`h-5 w-5 ${badge.color}`} />
            <span className="text-sm font-medium">{badge.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

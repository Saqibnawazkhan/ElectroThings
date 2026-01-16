"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Package, ShoppingCart, Star, Gift, Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "order" | "cart" | "review" | "promo" | "shipping" | "success";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const notificationIcons = {
  order: Package,
  cart: ShoppingCart,
  review: Star,
  promo: Gift,
  shipping: Truck,
  success: CheckCircle,
};

const notificationColors = {
  order: "text-blue-500 bg-blue-500/10",
  cart: "text-purple-500 bg-purple-500/10",
  review: "text-yellow-500 bg-yellow-500/10",
  promo: "text-pink-500 bg-pink-500/10",
  shipping: "text-green-500 bg-green-500/10",
  success: "text-emerald-500 bg-emerald-500/10",
};

// Demo notifications
const demoNotifications: Notification[] = [
  {
    id: "1",
    type: "order",
    title: "Order Confirmed!",
    message: "Your order #12345 has been confirmed",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "shipping",
    title: "Out for Delivery",
    message: "Your package is on its way",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "promo",
    title: "Flash Sale! 🔥",
    message: "50% off on electronics - ends soon!",
    time: "3 hours ago",
    read: true,
  },
];

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(demoNotifications);
  const [hasNewNotification, setHasNewNotification] = useState(true);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setHasNewNotification(false);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewNotification(false);
        }}
        className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors"
      >
        <motion.div
          animate={hasNewNotification && unreadCount > 0 ? {
            rotate: [0, -15, 15, -15, 15, 0],
          } : {}}
          transition={{
            duration: 0.5,
            repeat: hasNewNotification ? Infinity : 0,
            repeatDelay: 3,
          }}
        >
          <Bell className="h-5 w-5" />
        </motion.div>

        {/* Notification badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1"
            >
              <Badge
                className="h-5 w-5 p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-lg"
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring for new notifications */}
        {hasNewNotification && unreadCount > 0 && (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary"
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Notification panel */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-purple-500/5">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs hover:text-primary"
                  >
                    Mark all read
                  </Button>
                )}
              </div>

              {/* Notifications list */}
              <div className="max-h-[400px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center"
                    >
                      <Bell className="h-8 w-8 text-muted-foreground" />
                    </motion.div>
                    <p className="text-muted-foreground">No notifications yet</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {notifications.map((notification, index) => {
                      const Icon = notificationIcons[notification.type];
                      const colorClass = notificationColors[notification.type];

                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20, height: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            "relative p-4 border-b border-border/30 hover:bg-muted/30 transition-colors cursor-pointer group",
                            !notification.read && "bg-primary/5"
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            {/* Icon */}
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                colorClass
                              )}
                            >
                              <Icon className="h-5 w-5" />
                            </motion.div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="font-medium text-sm truncate">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"
                                  />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground truncate">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground/70 mt-1">
                                {notification.time}
                              </p>
                            </div>

                            {/* Delete button */}
                            <motion.button
                              initial={{ opacity: 0 }}
                              whileHover={{ scale: 1.1 }}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/10 rounded-lg"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-border/50 bg-muted/30">
                  <Button variant="ghost" className="w-full text-sm hover:text-primary">
                    View all notifications
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

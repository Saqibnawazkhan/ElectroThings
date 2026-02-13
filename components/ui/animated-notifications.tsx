"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  AlertCircle,
  Info,
  AlertTriangle,
  Bell,
  ShoppingCart,
  Heart,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Notification types
type NotificationType = "success" | "error" | "warning" | "info";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  icon?: ReactNode;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Notification context
interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}

// Provider component
export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substring(2);
    setNotifications((prev) => [...prev, { ...notification, id }]);

    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id);
      }, notification.duration || 5000);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

// Notification container
function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual notification
interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const icons = {
    success: <Check className="h-5 w-5" />,
    error: <X className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const bgColors = {
    success: "bg-green-500/10 border-green-500/30",
    error: "bg-red-500/10 border-red-500/30",
    warning: "bg-yellow-500/10 border-yellow-500/30",
    info: "bg-blue-500/10 border-blue-500/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="pointer-events-auto"
    >
      <div
        className={cn(
          "relative w-80 p-4 rounded-xl border backdrop-blur-sm shadow-lg",
          bgColors[notification.type]
        )}
      >
        {/* Progress bar */}
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: 0 }}
          transition={{ duration: (notification.duration || 5000) / 1000, ease: "linear" }}
          className={cn("absolute bottom-0 left-0 h-1 rounded-b-xl", colors[notification.type])}
        />

        <div className="flex gap-3">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, delay: 0.1 }}
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white",
              colors[notification.type]
            )}
          >
            {notification.icon || icons[notification.type]}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.h4
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-semibold text-sm"
            >
              {notification.title}
            </motion.h4>
            {notification.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm text-muted-foreground mt-0.5"
              >
                {notification.message}
              </motion.p>
            )}
            {notification.action && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                onClick={notification.action.onClick}
                className="text-sm font-medium text-primary mt-2 hover:underline"
              >
                {notification.action.label}
              </motion.button>
            )}
          </div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Special notification badges

// Cart added notification
interface CartNotificationProps {
  productName: string;
  productImage?: string;
  onViewCart?: () => void;
}

export function CartAddedNotification({
  productName,
  productImage,
  onViewCart,
}: CartNotificationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed top-4 right-4 z-[100]"
        >
          <div className="bg-background border rounded-xl p-4 shadow-xl flex items-center gap-4 max-w-sm">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center"
            >
              <ShoppingCart className="h-5 w-5" />
            </motion.div>
            <div className="flex-1">
              <p className="font-semibold text-sm">Added to Cart</p>
              <p className="text-sm text-muted-foreground truncate">{productName}</p>
            </div>
            {onViewCart && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onViewCart}
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg"
              >
                View Cart
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Wishlist notification
interface WishlistNotificationProps {
  productName: string;
  added: boolean;
}

export function WishlistNotification({ productName, added }: WishlistNotificationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-4 left-4 z-[100]"
        >
          <div className="bg-background border rounded-xl p-4 shadow-xl flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                added ? "bg-red-500 text-white" : "bg-muted"
              )}
            >
              <Heart className={cn("h-5 w-5", added && "fill-current")} />
            </motion.div>
            <div>
              <p className="font-semibold text-sm">
                {added ? "Added to Wishlist" : "Removed from Wishlist"}
              </p>
              <p className="text-sm text-muted-foreground">{productName}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Order status notification
interface OrderStatusNotificationProps {
  orderId: string;
  status: "confirmed" | "shipped" | "delivered";
}

export function OrderStatusNotification({ orderId, status }: OrderStatusNotificationProps) {
  const [show, setShow] = useState(true);

  const statusConfig = {
    confirmed: {
      icon: <Check className="h-5 w-5" />,
      color: "bg-green-500",
      title: "Order Confirmed",
      message: `Order #${orderId} has been confirmed`,
    },
    shipped: {
      icon: <Package className="h-5 w-5" />,
      color: "bg-blue-500",
      title: "Order Shipped",
      message: `Order #${orderId} is on its way`,
    },
    delivered: {
      icon: <Check className="h-5 w-5" />,
      color: "bg-green-500",
      title: "Order Delivered",
      message: `Order #${orderId} has been delivered`,
    },
  };

  const config = statusConfig[status];

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-4 right-4 z-[100]"
        >
          <div className="bg-background border rounded-xl p-4 shadow-xl flex items-center gap-4 max-w-sm">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              className={cn(
                "w-12 h-12 rounded-full text-white flex items-center justify-center",
                config.color
              )}
            >
              {config.icon}
            </motion.div>
            <div>
              <p className="font-semibold">{config.title}</p>
              <p className="text-sm text-muted-foreground">{config.message}</p>
            </div>
            <button onClick={() => setShow(false)}>
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Floating action notification
interface FloatingNotificationProps {
  icon: ReactNode;
  text: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export function FloatingNotification({
  icon,
  text,
  position = "bottom-right",
}: FloatingNotificationProps) {
  const [show, setShow] = useState(true);

  const positions = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className={cn("fixed z-[100]", positions[position])}
        >
          <div className="bg-primary text-primary-foreground px-4 py-3 rounded-full shadow-lg flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.span>
            <span className="font-medium text-sm">{text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Badge notification pulse
interface PulseNotificationProps {
  count: number;
  className?: string;
}

export function PulseNotification({ count, className }: PulseNotificationProps) {
  if (count <= 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={cn("relative", className)}
    >
      {/* Pulse rings */}
      <motion.span
        animate={{
          scale: [1, 2],
          opacity: [0.5, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-red-500"
      />
      <motion.span
        animate={{
          scale: [1, 2],
          opacity: [0.5, 0],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        className="absolute inset-0 rounded-full bg-red-500"
      />

      {/* Badge */}
      <span className="relative flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-red-500 text-white text-xs font-bold">
        {count > 99 ? "99+" : count}
      </span>
    </motion.div>
  );
}

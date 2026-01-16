"use client";

import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, ShoppingCart, Bell, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type ToastType = "success" | "error" | "info" | "warning" | "cart" | "notification" | "loading";

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  updateToast: (id: string, updates: Partial<Toast>) => void;
}

// Context
const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

// Provider
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<Toast>) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, updateToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

// Toast container
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual toast
function ToastItem({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(100);
  const duration = toast.duration ?? 5000;

  useEffect(() => {
    if (toast.type === "loading") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - (100 / (duration / 100));
        if (newProgress <= 0) {
          onClose();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration, onClose, toast.type]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
    cart: ShoppingCart,
    notification: Bell,
    loading: Loader2,
  };

  const colors = {
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      icon: "text-green-500",
      progress: "bg-green-500",
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      icon: "text-red-500",
      progress: "bg-red-500",
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      icon: "text-blue-500",
      progress: "bg-blue-500",
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      icon: "text-yellow-500",
      progress: "bg-yellow-500",
    },
    cart: {
      bg: "bg-primary/10",
      border: "border-primary/30",
      icon: "text-primary",
      progress: "bg-primary",
    },
    notification: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
      icon: "text-purple-500",
      progress: "bg-purple-500",
    },
    loading: {
      bg: "bg-muted",
      border: "border-border",
      icon: "text-muted-foreground",
      progress: "bg-primary",
    },
  };

  const Icon = icons[toast.type];
  const colorScheme = colors[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      layout
      className={cn(
        "relative flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm shadow-lg overflow-hidden min-w-[300px]",
        colorScheme.bg,
        colorScheme.border
      )}
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: toast.type === "loading" ? 360 : 0 }}
        transition={
          toast.type === "loading"
            ? { rotate: { duration: 1, repeat: Infinity, ease: "linear" } }
            : { type: "spring", stiffness: 300 }
        }
        className={cn("shrink-0 mt-0.5", colorScheme.icon)}
      >
        <Icon className="h-5 w-5" />
      </motion.div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{toast.title}</p>
        {toast.description && (
          <p className="text-sm text-muted-foreground mt-0.5">{toast.description}</p>
        )}
        {toast.action && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toast.action.onClick}
            className="mt-2 text-sm font-medium text-primary hover:underline"
          >
            {toast.action.label}
          </motion.button>
        )}
      </div>

      {/* Close button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="shrink-0 p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
      >
        <X className="h-4 w-4 text-muted-foreground" />
      </motion.button>

      {/* Progress bar */}
      {toast.type !== "loading" && (
        <motion.div
          className={cn("absolute bottom-0 left-0 h-1", colorScheme.progress)}
          initial={{ width: "100%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.div>
  );
}

// Standalone toast component for direct use
export function AnimatedToast({
  type = "info",
  title,
  description,
  visible,
  onClose,
  action,
  position = "bottom-right",
  className,
}: {
  type?: ToastType;
  title: string;
  description?: string;
  visible: boolean;
  onClose: () => void;
  action?: { label: string; onClick: () => void };
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  className?: string;
}) {
  const positions = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
    cart: ShoppingCart,
    notification: Bell,
    loading: Loader2,
  };

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    cart: "bg-primary",
    notification: "bg-purple-500",
    loading: "bg-muted-foreground",
  };

  const Icon = icons[type];

  useEffect(() => {
    if (visible && type !== "loading") {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose, type]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: position.includes("top") ? -50 : 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position.includes("top") ? -50 : 50, scale: 0.9 }}
          className={cn(
            "fixed z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-border/50 shadow-xl backdrop-blur-sm max-w-md",
            positions[position],
            className
          )}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: type === "loading" ? 360 : 0 }}
            transition={
              type === "loading"
                ? { rotate: { duration: 1, repeat: Infinity, ease: "linear" } }
                : { type: "spring", stiffness: 300 }
            }
            className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0", colors[type])}
          >
            <Icon className="h-4 w-4" />
          </motion.div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{title}</p>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          {action && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className="px-3 py-1.5 text-sm font-medium bg-primary text-white rounded-lg"
            >
              {action.label}
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Snackbar style toast
export function Snackbar({
  message,
  visible,
  onClose,
  action,
  className,
}: {
  message: string;
  visible: boolean;
  onClose: () => void;
  action?: { label: string; onClick: () => void };
  className?: string;
}) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
            "flex items-center gap-4 px-4 py-3 rounded-lg",
            "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900",
            "shadow-xl",
            className
          )}
        >
          <span className="text-sm">{message}</span>
          {action && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={action.onClick}
              className="text-sm font-semibold text-primary"
            >
              {action.label}
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Helper hooks for common toast types
export function useSuccessToast() {
  const { addToast } = useToast();
  return (title: string, description?: string) =>
    addToast({ type: "success", title, description });
}

export function useErrorToast() {
  const { addToast } = useToast();
  return (title: string, description?: string) =>
    addToast({ type: "error", title, description });
}

export function useCartToast() {
  const { addToast } = useToast();
  return (productName: string) =>
    addToast({
      type: "cart",
      title: "Added to cart",
      description: `${productName} has been added to your cart`,
      action: {
        label: "View Cart",
        onClick: () => (window.location.href = "/cart"),
      },
    });
}

export function useLoadingToast() {
  const { addToast, updateToast, removeToast } = useToast();

  return {
    start: (title: string) => addToast({ type: "loading", title, duration: 0 }),
    success: (id: string, title: string) => {
      updateToast(id, { type: "success", title, duration: 3000 });
    },
    error: (id: string, title: string) => {
      updateToast(id, { type: "error", title, duration: 5000 });
    },
    dismiss: (id: string) => removeToast(id),
  };
}

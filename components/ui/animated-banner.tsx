"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertCircle,
  CheckCircle,
  Info,
  AlertTriangle,
  Megaphone,
  Gift,
  Sparkles,
  ArrowRight,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";

type BannerVariant = "info" | "success" | "warning" | "error" | "promo" | "announcement";

interface AnimatedBannerProps {
  variant?: BannerVariant;
  title?: string;
  message: string;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  className?: string;
  position?: "top" | "bottom" | "inline";
  animate?: boolean;
}

const variantStyles: Record<BannerVariant, { bg: string; icon: React.ReactNode; iconBg: string }> = {
  info: {
    bg: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300",
    icon: <Info className="h-5 w-5" />,
    iconBg: "bg-blue-500/20",
  },
  success: {
    bg: "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300",
    icon: <CheckCircle className="h-5 w-5" />,
    iconBg: "bg-green-500/20",
  },
  warning: {
    bg: "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-300",
    icon: <AlertTriangle className="h-5 w-5" />,
    iconBg: "bg-yellow-500/20",
  },
  error: {
    bg: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-300",
    icon: <AlertCircle className="h-5 w-5" />,
    iconBg: "bg-red-500/20",
  },
  promo: {
    bg: "bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/20 text-primary",
    icon: <Gift className="h-5 w-5" />,
    iconBg: "bg-primary/20",
  },
  announcement: {
    bg: "bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 border-indigo-500/20 text-indigo-700 dark:text-indigo-300",
    icon: <Megaphone className="h-5 w-5" />,
    iconBg: "bg-indigo-500/20",
  },
};

export function AnimatedBanner({
  variant = "info",
  title,
  message,
  action,
  dismissible = true,
  onDismiss,
  icon,
  className,
  position = "inline",
  animate = true,
}: AnimatedBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const styles = variantStyles[variant];

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const positionClasses = {
    top: "fixed top-0 left-0 right-0 z-50",
    bottom: "fixed bottom-0 left-0 right-0 z-50",
    inline: "",
  };

  const animationVariants = {
    initial: position === "top"
      ? { y: -100, opacity: 0 }
      : position === "bottom"
      ? { y: 100, opacity: 0 }
      : { opacity: 0, scale: 0.95 },
    animate: { y: 0, opacity: 1, scale: 1 },
    exit: position === "top"
      ? { y: -100, opacity: 0 }
      : position === "bottom"
      ? { y: 100, opacity: 0 }
      : { opacity: 0, scale: 0.95 },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={animate ? animationVariants.initial : undefined}
          animate={animationVariants.animate}
          exit={animate ? animationVariants.exit : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "border rounded-lg",
            styles.bg,
            positionClasses[position],
            className
          )}
        >
          <div className="flex items-center gap-4 px-4 py-3">
            {/* Icon */}
            <div className={cn("shrink-0 p-2 rounded-lg", styles.iconBg)}>
              {icon || styles.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {title && (
                <h4 className="font-semibold text-sm">{title}</h4>
              )}
              <p className="text-sm opacity-90">{message}</p>
            </div>

            {/* Action */}
            {action && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.onClick}
                className="shrink-0 px-4 py-1.5 text-sm font-medium bg-current/10 rounded-lg hover:bg-current/20 transition-colors"
              >
                {action.label}
              </motion.button>
            )}

            {/* Dismiss */}
            {dismissible && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDismiss}
                className="shrink-0 p-1 rounded-lg hover:bg-current/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Full-width promotional banner with gradient
export function PromoBanner({
  message,
  highlight,
  action,
  dismissible = true,
  onDismiss,
  className,
}: {
  message: string;
  highlight?: string;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "relative overflow-hidden bg-gradient-to-r from-primary via-purple-500 to-pink-500",
            className
          )}
        >
          {/* Animated background effect */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%]"
          />

          <div className="relative flex items-center justify-center gap-4 px-4 py-2.5 text-white text-sm">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span>
              {message}
              {highlight && (
                <span className="font-bold ml-1">{highlight}</span>
              )}
            </span>

            {action && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.onClick}
                className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-xs font-medium hover:bg-white/30 transition-colors"
              >
                {action.label}
                <ArrowRight className="h-3 w-3" />
              </motion.button>
            )}

            {dismissible && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDismiss}
                className="absolute right-2 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Cookie consent banner
export function CookieBanner({
  onAccept,
  onDecline,
  onSettings,
  className,
}: {
  onAccept: () => void;
  onDecline?: () => void;
  onSettings?: () => void;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    setIsVisible(false);
    onDecline?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50",
            "p-6 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl",
            className
          )}
        >
          <div className="flex gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">🍪</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">We use cookies</h4>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
              </p>
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccept}
                  className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  Accept All
                </motion.button>
                {onDecline && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleDecline}
                    className="px-4 py-2 text-sm font-medium bg-muted rounded-lg hover:bg-muted/80"
                  >
                    Decline
                  </motion.button>
                )}
                {onSettings && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onSettings}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    Manage Settings
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Flash message banner
export function FlashBanner({
  type,
  message,
  duration = 5000,
  onClose,
  className,
}: {
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    warning: <AlertTriangle className="h-5 w-5" />,
  };

  useState(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(timer);
        setIsVisible(false);
        onClose?.();
      }
    }, 50);

    return () => clearInterval(timer);
  });

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          className={cn(
            "fixed top-4 right-4 z-50 min-w-[300px] max-w-md",
            "rounded-xl overflow-hidden shadow-2xl",
            colors[type],
            className
          )}
        >
          <div className="flex items-center gap-3 p-4 text-white">
            {icons[type]}
            <p className="flex-1 text-sm font-medium">{message}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="p-1 rounded-lg hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-white/20">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-white/50"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Notification permission banner
export function NotificationBanner({
  onAllow,
  onBlock,
  className,
}: {
  onAllow: () => void;
  onBlock: () => void;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleAllow = () => {
    setIsVisible(false);
    onAllow();
  };

  const handleBlock = () => {
    setIsVisible(false);
    onBlock();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed top-4 left-1/2 -translate-x-1/2 z-50",
            "p-4 rounded-xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl",
            "max-w-md w-full mx-4",
            className
          )}
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
              <Bell className="h-5 w-5 text-primary" />
            </motion.div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1">Enable Notifications</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Get notified about orders, deals, and updates
              </p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAllow}
                  className="px-4 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                  Allow
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBlock}
                  className="px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  Not Now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Update available banner
export function UpdateBanner({
  version,
  onUpdate,
  onDismiss,
  className,
}: {
  version: string;
  onUpdate: () => void;
  onDismiss?: () => void;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleUpdate = () => {
    onUpdate();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-50",
            "flex items-center gap-4 px-6 py-3 rounded-full",
            "bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30",
            className
          )}
        >
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium">
            Version {version} is available!
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUpdate}
            className="px-4 py-1 bg-white/20 rounded-full text-xs font-medium hover:bg-white/30"
          >
            Update Now
          </motion.button>
          {onDismiss && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Offline banner
export function OfflineBanner({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "flex items-center justify-center gap-2 px-4 py-2 bg-yellow-500 text-yellow-900",
        className
      )}
    >
      <AlertTriangle className="h-4 w-4" />
      <span className="text-sm font-medium">
        You're offline. Some features may not be available.
      </span>
    </motion.div>
  );
}

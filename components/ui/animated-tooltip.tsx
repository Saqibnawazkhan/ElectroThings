"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";

type TooltipSide = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "dark" | "light" | "gradient" | "glass";

interface AnimatedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  className?: string;
  variant?: TooltipVariant;
  arrow?: boolean;
  maxWidth?: number;
}

const positionClasses: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses: Record<TooltipSide, string> = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-[inherit] border-l-transparent border-r-transparent border-b-transparent",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-[inherit] border-l-transparent border-r-transparent border-t-transparent",
  left: "left-full top-1/2 -translate-y-1/2 border-l-[inherit] border-t-transparent border-b-transparent border-r-transparent",
  right: "right-full top-1/2 -translate-y-1/2 border-r-[inherit] border-t-transparent border-b-transparent border-l-transparent",
};

const initialAnimations: Record<TooltipSide, { opacity: number; x?: number; y?: number; scale: number }> = {
  top: { opacity: 0, y: 10, scale: 0.95 },
  bottom: { opacity: 0, y: -10, scale: 0.95 },
  left: { opacity: 0, x: 10, scale: 0.95 },
  right: { opacity: 0, x: -10, scale: 0.95 },
};

const animateAnimations: Record<TooltipSide, { opacity: number; x?: number; y?: number; scale: number }> = {
  top: { opacity: 1, y: 0, scale: 1 },
  bottom: { opacity: 1, y: 0, scale: 1 },
  left: { opacity: 1, x: 0, scale: 1 },
  right: { opacity: 1, x: 0, scale: 1 },
};

const variantStyles: Record<TooltipVariant, string> = {
  default: "bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl text-foreground",
  dark: "bg-gray-900 border-gray-800 text-white shadow-xl",
  light: "bg-white border-gray-200 text-gray-900 shadow-xl",
  gradient: "bg-gradient-to-br from-primary to-purple-600 border-0 text-white shadow-xl shadow-primary/30",
  glass: "bg-background/60 backdrop-blur-2xl border border-white/20 shadow-xl",
};

export function AnimatedTooltip({
  content,
  children,
  side = "top",
  delay = 200,
  className,
  variant = "default",
  arrow = true,
  maxWidth = 250,
}: AnimatedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setShouldRender(true);
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
    setTimeout(() => setShouldRender(false), 200);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {shouldRender && (
          <motion.div
            initial={initialAnimations[side]}
            animate={isVisible ? animateAnimations[side] : initialAnimations[side]}
            exit={initialAnimations[side]}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "absolute z-50 px-3 py-2 text-sm rounded-lg whitespace-nowrap",
              positionClasses[side],
              variantStyles[variant],
              className
            )}
            style={{ maxWidth }}
          >
            {content}
            {/* Arrow */}
            {arrow && (
              <div
                className={cn(
                  "absolute w-0 h-0 border-4",
                  arrowClasses[side],
                  variant === "dark" && "[--tw-border-t-color:theme(colors.gray.900)]",
                  variant === "light" && "[--tw-border-t-color:white]",
                  variant === "gradient" && "[--tw-border-t-color:theme(colors.primary.DEFAULT)]",
                  (variant === "default" || variant === "glass") && "[--tw-border-t-color:theme(colors.background)]"
                )}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Rich tooltip with image and action
interface RichTooltipProps {
  title: string;
  description?: string;
  image?: string;
  icon?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
  side?: TooltipSide;
}

export function RichTooltip({
  title,
  description,
  image,
  icon,
  action,
  children,
  side = "top",
}: RichTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), 300);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={initialAnimations[side]}
            animate={animateAnimations[side]}
            exit={initialAnimations[side]}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn("absolute z-50 w-64", positionClasses[side])}
          >
            <div className="bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl overflow-hidden">
              {image && (
                <div className="h-24 bg-gradient-to-br from-primary/20 to-purple-500/20 relative overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-start gap-3">
                  {icon && (
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      {icon}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{title}</h4>
                    {description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
                {action && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.onClick}
                    className="mt-3 w-full py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    {action.label}
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Interactive tooltip that stays open on hover
interface InteractiveTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: TooltipSide;
  className?: string;
}

export function InteractiveTooltip({
  content,
  children,
  side = "bottom",
  className,
}: InteractiveTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-flex", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={initialAnimations[side]}
            animate={animateAnimations[side]}
            exit={initialAnimations[side]}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "absolute z-50 p-4 rounded-xl bg-background border border-border/50 shadow-xl",
              positionClasses[side],
              "min-w-[200px]"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Avatar group with tooltips
interface AvatarItem {
  id: string;
  name: string;
  image?: string;
  fallback?: string;
}

export function AvatarGroupTooltip({
  avatars,
  max = 4,
  size = "md",
  className,
}: {
  avatars: AvatarItem[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  return (
    <div className={cn("flex -space-x-3", className)}>
      {displayAvatars.map((avatar, index) => (
        <AnimatedTooltip key={avatar.id} content={avatar.name} side="top">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            className={cn(
              "relative rounded-full border-2 border-background overflow-hidden cursor-pointer",
              sizes[size]
            )}
          >
            {avatar.image ? (
              <img
                src={avatar.image}
                alt={avatar.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-medium">
                {avatar.fallback || avatar.name.charAt(0)}
              </div>
            )}
          </motion.div>
        </AnimatedTooltip>
      ))}

      {remaining > 0 && (
        <AnimatedTooltip
          content={`${remaining} more: ${avatars.slice(max).map(a => a.name).join(", ")}`}
          side="top"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            className={cn(
              "relative rounded-full border-2 border-background bg-muted flex items-center justify-center font-medium cursor-pointer",
              sizes[size]
            )}
          >
            +{remaining}
          </motion.div>
        </AnimatedTooltip>
      )}
    </div>
  );
}

// Tooltip with progress bar
export function ProgressTooltip({
  children,
  label,
  value,
  max = 100,
  side = "top",
  className,
}: {
  children: React.ReactNode;
  label: string;
  value: number;
  max?: number;
  side?: TooltipSide;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={initialAnimations[side]}
            animate={animateAnimations[side]}
            exit={initialAnimations[side]}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "absolute z-50 p-3 rounded-lg bg-background border border-border/50 shadow-lg",
              positionClasses[side],
              "min-w-[150px]"
            )}
          >
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-muted-foreground">{label}</span>
              <span className="font-medium">{value}/{max}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Keyboard shortcut tooltip
export function ShortcutTooltip({
  children,
  label,
  shortcut,
  side = "bottom",
  className,
}: {
  children: React.ReactNode;
  label: string;
  shortcut: string[];
  side?: TooltipSide;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={initialAnimations[side]}
            animate={animateAnimations[side]}
            exit={initialAnimations[side]}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "absolute z-50 px-3 py-2 rounded-lg bg-gray-900 text-white shadow-lg",
              positionClasses[side]
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-sm">{label}</span>
              <div className="flex items-center gap-1">
                {shortcut.map((key, index) => (
                  <span key={index} className="flex items-center">
                    <kbd className="px-1.5 py-0.5 text-xs bg-white/10 rounded border border-white/20 font-mono">
                      {key}
                    </kbd>
                    {index < shortcut.length - 1 && (
                      <span className="mx-0.5 text-white/50">+</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Color swatch tooltip with copy
export function ColorTooltip({
  children,
  color,
  name,
  hex,
  side = "top",
  className,
}: {
  children: React.ReactNode;
  color: string;
  name: string;
  hex?: string;
  side?: TooltipSide;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hex || color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={initialAnimations[side]}
            animate={animateAnimations[side]}
            exit={initialAnimations[side]}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={handleCopy}
            className={cn(
              "absolute z-50 p-3 rounded-xl bg-background border border-border/50 shadow-lg cursor-pointer",
              positionClasses[side]
            )}
          >
            <div className="flex items-center gap-3">
              <motion.div
                className="w-8 h-8 rounded-lg shadow-inner"
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.1 }}
              />
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {copied ? (
                    <>
                      <Check className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      {hex || color}
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Confirmation tooltip
export function ConfirmTooltip({
  children,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  side = "top",
  variant = "destructive",
  className,
}: {
  children: React.ReactNode;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  side?: TooltipSide;
  variant?: "destructive" | "default";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const handleCancel = () => {
    onCancel?.();
    setIsOpen(false);
  };

  return (
    <div className={cn("relative inline-flex", className)}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {children}
      </div>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={handleCancel}
            />
            <motion.div
              initial={initialAnimations[side]}
              animate={animateAnimations[side]}
              exit={initialAnimations[side]}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={cn(
                "absolute z-50 p-4 rounded-xl bg-background border border-border/50 shadow-xl",
                positionClasses[side],
                "w-64"
              )}
            >
              <h4 className="font-semibold text-sm mb-1">{title}</h4>
              {message && (
                <p className="text-xs text-muted-foreground mb-3">{message}</p>
              )}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="flex-1 py-1.5 text-xs font-medium bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  {cancelLabel}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  className={cn(
                    "flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors",
                    variant === "destructive"
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {confirmLabel}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Stateful tooltip for showing loading/success/error
export function StatusTooltip({
  children,
  status,
  messages,
  side = "top",
  className,
}: {
  children: React.ReactNode;
  status: "idle" | "loading" | "success" | "error";
  messages: {
    idle?: string;
    loading?: string;
    success?: string;
    error?: string;
  };
  side?: TooltipSide;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);

  const statusColors = {
    idle: "bg-background",
    loading: "bg-blue-500",
    success: "bg-green-500",
    error: "bg-red-500",
  };

  const currentMessage = messages[status] || messages.idle;

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && currentMessage && (
          <motion.div
            initial={initialAnimations[side]}
            animate={animateAnimations[side]}
            exit={initialAnimations[side]}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
              "absolute z-50 px-3 py-2 rounded-lg shadow-lg flex items-center gap-2",
              positionClasses[side],
              status === "idle"
                ? "bg-background border border-border/50"
                : `${statusColors[status]} text-white`
            )}
          >
            {status === "loading" && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
            )}
            <span className="text-sm">{currentMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

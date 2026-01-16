"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function AnimatedTooltip({
  content,
  children,
  side = "top",
  delay = 200,
  className,
}: AnimatedTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-background",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-background",
    left: "left-full top-1/2 -translate-y-1/2 border-l-background",
    right: "right-full top-1/2 -translate-y-1/2 border-r-background",
  };

  const initialAnimation = {
    top: { opacity: 0, y: 10, scale: 0.95 },
    bottom: { opacity: 0, y: -10, scale: 0.95 },
    left: { opacity: 0, x: 10, scale: 0.95 },
    right: { opacity: 0, x: -10, scale: 0.95 },
  };

  const animateAnimation = {
    top: { opacity: 1, y: 0, scale: 1 },
    bottom: { opacity: 1, y: 0, scale: 1 },
    left: { opacity: 1, x: 0, scale: 1 },
    right: { opacity: 1, x: 0, scale: 1 },
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={initialAnimation[side]}
            animate={animateAnimation[side]}
            exit={initialAnimation[side]}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "absolute z-50 px-3 py-2 text-sm rounded-lg",
              "bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl",
              positionClasses[side],
              className
            )}
          >
            {content}
            {/* Arrow */}
            <div
              className={cn(
                "absolute w-0 h-0 border-4 border-transparent",
                arrowClasses[side]
              )}
            />
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
  action?: { label: string; onClick: () => void };
  children: React.ReactNode;
}

export function RichTooltip({
  title,
  description,
  image,
  action,
  children,
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
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64"
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
                <h4 className="font-semibold text-sm">{title}</h4>
                {description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
                {action && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={action.onClick}
                    className="mt-2 w-full py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
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

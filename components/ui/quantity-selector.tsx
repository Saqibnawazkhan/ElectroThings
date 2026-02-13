"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showDelete?: boolean;
  onDelete?: () => void;
  className?: string;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  showDelete = false,
  onDelete,
  className,
}: QuantitySelectorProps) {
  const [direction, setDirection] = useState<"up" | "down">("up");

  const handleIncrement = () => {
    if (value < max) {
      setDirection("up");
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      setDirection("down");
      onChange(value - 1);
    } else if (showDelete && onDelete && value === min) {
      onDelete();
    }
  };

  const sizeClasses = {
    sm: {
      container: "h-8",
      button: "h-8 w-8",
      text: "text-sm w-8",
      icon: "h-3 w-3",
    },
    md: {
      container: "h-10",
      button: "h-10 w-10",
      text: "text-base w-10",
      icon: "h-4 w-4",
    },
    lg: {
      container: "h-12",
      button: "h-12 w-12",
      text: "text-lg w-12",
      icon: "h-5 w-5",
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border-2 border-border/50 bg-background/50 backdrop-blur-sm overflow-hidden",
        className
      )}
    >
      {/* Decrement button */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.1)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDecrement}
        disabled={value <= min && !showDelete}
        className={cn(
          "flex items-center justify-center transition-all duration-200",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "hover:bg-muted/50",
          classes.button,
          value === min && showDelete && "hover:bg-red-500/10 hover:text-red-500"
        )}
      >
        <AnimatePresence mode="wait">
          {value === min && showDelete ? (
            <motion.div
              key="trash"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
            >
              <Trash2 className={cn(classes.icon, "text-red-500")} />
            </motion.div>
          ) : (
            <motion.div
              key="minus"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Minus className={classes.icon} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Value display */}
      <div
        className={cn(
          "flex items-center justify-center font-semibold overflow-hidden",
          classes.text
        )}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={value}
            initial={{
              y: direction === "up" ? 20 : -20,
              opacity: 0,
            }}
            animate={{ y: 0, opacity: 1 }}
            exit={{
              y: direction === "up" ? -20 : 20,
              opacity: 0,
            }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="tabular-nums"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Increment button */}
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--primary) / 0.1)" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleIncrement}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center transition-all duration-200",
          "disabled:opacity-30 disabled:cursor-not-allowed",
          "hover:bg-muted/50",
          classes.button
        )}
      >
        <Plus className={classes.icon} />
      </motion.button>
    </div>
  );
}

// Compact quantity selector for inline use
export function QuantityBadge({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
}: Omit<QuantitySelectorProps, "size" | "showDelete" | "onDelete">) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-muted/50 rounded-full px-1 py-0.5",
        className
      )}
    >
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => value > min && onChange(value - 1)}
        disabled={value <= min}
        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-background disabled:opacity-30 transition-colors"
      >
        <Minus className="h-3 w-3" />
      </motion.button>

      <motion.span
        key={value}
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-6 text-center text-sm font-medium tabular-nums"
      >
        {value}
      </motion.span>

      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-background disabled:opacity-30 transition-colors"
      >
        <Plus className="h-3 w-3" />
      </motion.button>
    </div>
  );
}

// Stepper-style quantity selector
export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label,
  className,
}: QuantitySelectorProps & { label?: string }) {
  const [direction, setDirection] = useState<"up" | "down">("up");

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      )}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (value > min) {
              setDirection("down");
              onChange(value - 1);
            }
          }}
          disabled={value <= min}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center disabled:opacity-30 hover:from-primary/10 hover:to-purple-500/10 transition-all border border-border/50"
        >
          <Minus className="h-4 w-4" />
        </motion.button>

        <div className="w-16 h-12 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border-2 border-border/50 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={value}
              initial={{
                y: direction === "up" ? 30 : -30,
                opacity: 0,
                scale: 0.5,
              }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{
                y: direction === "up" ? -30 : 30,
                opacity: 0,
                scale: 0.5,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent tabular-nums"
            >
              {value}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if (value < max) {
              setDirection("up");
              onChange(value + 1);
            }
          }}
          disabled={value >= max}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 text-white flex items-center justify-center disabled:opacity-30 hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          <Plus className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}

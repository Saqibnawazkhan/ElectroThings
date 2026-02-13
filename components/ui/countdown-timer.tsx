"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, Gift, Timer, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Calculate time remaining
function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

// Animated digit with flip effect
function FlipDigit({ digit, label }: { digit: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-20 md:w-20 md:h-24">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={digit}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-muted to-muted/80 rounded-xl border border-border/50 shadow-lg"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-3xl md:text-4xl font-bold tabular-nums">
              {digit.toString().padStart(2, "0")}
            </span>
          </motion.div>
        </AnimatePresence>
        {/* Center line */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-border/50" />
      </div>
      <span className="mt-2 text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

// Main countdown timer with flip animation
export function CountdownTimer({
  targetDate,
  title,
  subtitle,
  onComplete,
  className,
  variant = "default",
}: {
  targetDate: Date;
  title?: string;
  subtitle?: string;
  onComplete?: () => void;
  className?: string;
  variant?: "default" | "minimal" | "card" | "banner";
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsComplete(true);
        onComplete?.();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  if (isComplete) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn("text-center py-8", className)}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          <Gift className="h-16 w-16 text-primary mx-auto mb-4" />
        </motion.div>
        <h3 className="text-2xl font-bold">Time's Up!</h3>
      </motion.div>
    );
  }

  if (variant === "minimal") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("flex items-center gap-2 text-sm", className)}
      >
        <Clock className="h-4 w-4 text-muted-foreground" />
        <span className="tabular-nums font-medium">
          {timeLeft.days > 0 && `${timeLeft.days}d `}
          {timeLeft.hours.toString().padStart(2, "0")}:
          {timeLeft.minutes.toString().padStart(2, "0")}:
          {timeLeft.seconds.toString().padStart(2, "0")}
        </span>
      </motion.div>
    );
  }

  if (variant === "banner") {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative overflow-hidden py-3 px-6 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%]",
          className
        )}
      >
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%]"
        />
        <div className="relative flex items-center justify-center gap-4 text-white">
          <Flame className="h-5 w-5 animate-pulse" />
          <span className="font-medium">{title || "Sale ends in"}</span>
          <div className="flex items-center gap-1 font-bold tabular-nums">
            <span>{timeLeft.days.toString().padStart(2, "0")}d</span>
            <span>:</span>
            <span>{timeLeft.hours.toString().padStart(2, "0")}h</span>
            <span>:</span>
            <span>{timeLeft.minutes.toString().padStart(2, "0")}m</span>
            <span>:</span>
            <motion.span
              key={timeLeft.seconds}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {timeLeft.seconds.toString().padStart(2, "0")}s
            </motion.span>
          </div>
          <Flame className="h-5 w-5 animate-pulse" />
        </div>
      </motion.div>
    );
  }

  if (variant === "card") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50",
          className
        )}
      >
        {title && (
          <div className="flex items-center gap-2 mb-4">
            <Timer className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">{title}</h3>
          </div>
        )}
        <div className="flex justify-center gap-3">
          <FlipDigit digit={timeLeft.days} label="Days" />
          <span className="text-3xl font-bold self-center text-muted-foreground">:</span>
          <FlipDigit digit={timeLeft.hours} label="Hours" />
          <span className="text-3xl font-bold self-center text-muted-foreground">:</span>
          <FlipDigit digit={timeLeft.minutes} label="Min" />
          <span className="text-3xl font-bold self-center text-muted-foreground">:</span>
          <FlipDigit digit={timeLeft.seconds} label="Sec" />
        </div>
        {subtitle && (
          <p className="text-center text-sm text-muted-foreground mt-4">{subtitle}</p>
        )}
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("text-center", className)}
    >
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="flex justify-center gap-3">
        <FlipDigit digit={timeLeft.days} label="Days" />
        <span className="text-3xl font-bold self-center text-muted-foreground">:</span>
        <FlipDigit digit={timeLeft.hours} label="Hours" />
        <span className="text-3xl font-bold self-center text-muted-foreground">:</span>
        <FlipDigit digit={timeLeft.minutes} label="Minutes" />
        <span className="text-3xl font-bold self-center text-muted-foreground">:</span>
        <FlipDigit digit={timeLeft.seconds} label="Seconds" />
      </div>
    </motion.div>
  );
}

// Flash sale countdown (compact)
export function FlashSaleCountdown({
  endTime,
  className,
}: {
  endTime: Date;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const isEnding = timeLeft.hours === 0 && timeLeft.minutes < 30;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        isEnding
          ? "bg-red-500/20 text-red-500"
          : "bg-primary/10 text-primary",
        className
      )}
    >
      <motion.div
        animate={isEnding ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <Zap className="h-4 w-4" />
      </motion.div>
      <span className="text-sm font-medium">Flash Sale</span>
      <div className="flex items-center gap-0.5 font-bold tabular-nums">
        {timeLeft.hours > 0 && (
          <>
            <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
            <span>:</span>
          </>
        )}
        <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
        <span>:</span>
        <motion.span
          key={timeLeft.seconds}
          initial={{ scale: 1.3, color: isEnding ? "#ef4444" : "inherit" }}
          animate={{ scale: 1 }}
        >
          {timeLeft.seconds.toString().padStart(2, "0")}
        </motion.span>
      </div>
    </motion.div>
  );
}

// Circular countdown timer
export function CircularCountdown({
  duration,
  size = 120,
  strokeWidth = 8,
  onComplete,
  className,
}: {
  duration: number; // in seconds
  size?: number;
  strokeWidth?: number;
  onComplete?: () => void;
  className?: string;
}) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = timeRemaining / duration;

  useEffect(() => {
    if (timeRemaining <= 0) {
      onComplete?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onComplete]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-primary"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: circumference * (1 - progress) }}
          transition={{ duration: 0.5 }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          key={timeRemaining}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-xl font-bold tabular-nums"
        >
          {minutes}:{seconds.toString().padStart(2, "0")}
        </motion.span>
      </div>
    </div>
  );
}

// Deal of the day timer
export function DealCountdown({
  endTime,
  productName,
  discount,
  className,
}: {
  endTime: Date;
  productName: string;
  discount: string;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 p-6",
        className
      )}
    >
      {/* Background animation */}
      <motion.div
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary/20 blur-3xl"
      />

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Flame className="h-6 w-6 text-orange-500" />
          </motion.div>
          <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
            Deal of the Day
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">{productName}</h3>
        <div className="flex items-center gap-2 mb-6">
          <span className="text-3xl font-bold text-primary">{discount}</span>
          <span className="text-muted-foreground">OFF</span>
        </div>

        <div className="flex gap-3">
          {[
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Min" },
            { value: timeLeft.seconds, label: "Sec" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 text-center p-3 rounded-xl bg-background/80 backdrop-blur-sm"
            >
              <motion.span
                key={item.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold tabular-nums block"
              >
                {item.value.toString().padStart(2, "0")}
              </motion.span>
              <span className="text-xs text-muted-foreground">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Simple inline countdown
export function InlineCountdown({
  endTime,
  prefix = "Ends in",
  className,
}: {
  endTime: Date;
  prefix?: string;
  className?: string;
}) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("inline-flex items-center gap-1.5 text-sm", className)}
    >
      <Clock className="h-3.5 w-3.5" />
      <span className="text-muted-foreground">{prefix}</span>
      <span className="font-medium tabular-nums">
        {timeLeft.days > 0 && `${timeLeft.days}d `}
        {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </span>
    </motion.span>
  );
}

// Stock countdown urgency indicator
export function StockCountdown({
  stockLeft,
  totalStock,
  className,
}: {
  stockLeft: number;
  totalStock: number;
  className?: string;
}) {
  const percentage = (stockLeft / totalStock) * 100;
  const isLow = percentage <= 20;
  const isCritical = percentage <= 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("space-y-2", className)}
    >
      <div className="flex items-center justify-between text-sm">
        <span className={cn(
          "font-medium",
          isCritical ? "text-red-500" : isLow ? "text-orange-500" : "text-muted-foreground"
        )}>
          {isCritical ? "Almost gone!" : isLow ? "Selling fast!" : "In stock"}
        </span>
        <span className="text-muted-foreground">
          {stockLeft} left
        </span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            isCritical
              ? "bg-red-500"
              : isLow
              ? "bg-orange-500"
              : "bg-primary"
          )}
        />
      </div>
      {isCritical && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-red-500"
        >
          Only {stockLeft} items remaining!
        </motion.p>
      )}
    </motion.div>
  );
}

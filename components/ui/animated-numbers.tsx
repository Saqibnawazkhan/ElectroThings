"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useTransform, useInView, animate } from "framer-motion";
import { cn } from "@/lib/utils";

// Animated counter that counts up
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      delay,
      onUpdate: (latest) => {
        setDisplayValue(Number(latest.toFixed(decimals)));
      },
    });

    return () => controls.stop();
  }, [isInView, value, duration, delay, decimals]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  );
}

// Spring counter with physics
interface SpringCounterProps {
  value: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function SpringCounter({ value, className, prefix = "", suffix = "" }: SpringCounterProps) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString());
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    spring.set(value);
    const unsubscribe = display.on("change", (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [value, spring, display]);

  return (
    <span className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

// Rolling number animation (slot machine style)
interface RollingNumberProps {
  value: number;
  className?: string;
}

export function RollingNumber({ value, className }: RollingNumberProps) {
  const digits = value.toString().split("");

  return (
    <div className={cn("flex overflow-hidden", className)}>
      {digits.map((digit, index) => (
        <RollingDigit key={`${index}-${digit}`} digit={parseInt(digit)} />
      ))}
    </div>
  );
}

function RollingDigit({ digit }: { digit: number }) {
  return (
    <div className="relative h-[1em] w-[0.6em] overflow-hidden">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: `-${digit * 10}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <div key={num} className="h-[1em] flex items-center justify-center">
            {num}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Flip counter (clock style)
interface FlipCounterProps {
  value: number;
  className?: string;
}

export function FlipCounter({ value, className }: FlipCounterProps) {
  const digits = value.toString().padStart(2, "0").split("");

  return (
    <div className={cn("flex gap-1", className)}>
      {digits.map((digit, index) => (
        <FlipDigit key={index} digit={parseInt(digit)} />
      ))}
    </div>
  );
}

function FlipDigit({ digit }: { digit: number }) {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrevDigit(digit);
        setIsFlipping(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [digit, prevDigit]);

  return (
    <div className="relative w-10 h-14 bg-gradient-to-b from-muted to-muted/80 rounded-lg overflow-hidden shadow-lg">
      {/* Top half */}
      <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden border-b border-background/20">
        <div className="flex items-center justify-center h-[200%] text-2xl font-bold">
          {isFlipping ? prevDigit : digit}
        </div>
      </div>

      {/* Bottom half */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
        <div className="flex items-end justify-center h-[200%] text-2xl font-bold">
          {digit}
        </div>
      </div>

      {/* Flip animation */}
      {isFlipping && (
        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -180 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-muted to-muted/80 overflow-hidden origin-bottom"
          style={{ perspective: 200 }}
        >
          <div className="flex items-center justify-center h-[200%] text-2xl font-bold">
            {prevDigit}
          </div>
        </motion.div>
      )}

      {/* Center line */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-background/30" />
    </div>
  );
}

// Progress number (fills as it counts)
interface ProgressNumberProps {
  value: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressNumber({ value, max, className, showPercentage = true }: ProgressNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const percentage = (value / max) * 100;

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Background circle */}
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-muted fill-none"
          strokeWidth="8"
        />
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          className="stroke-primary fill-none"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: percentage / 100 } : { pathLength: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatedCounter
          value={showPercentage ? percentage : value}
          suffix={showPercentage ? "%" : ""}
          className="text-2xl font-bold"
        />
      </div>
    </div>
  );
}

// Price animation with currency
interface AnimatedPriceProps {
  value: number;
  currency?: string;
  className?: string;
}

export function AnimatedPrice({ value, currency = "$", className }: AnimatedPriceProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200 }}
      className={cn("inline-flex items-baseline", className)}
    >
      <span className="text-lg">{currency}</span>
      <AnimatedCounter value={value} decimals={2} className="text-3xl font-bold" />
    </motion.span>
  );
}

// Countdown timer
interface CountdownProps {
  targetDate: Date;
  className?: string;
  onComplete?: () => void;
}

export function Countdown({ targetDate, className, onComplete }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        onComplete?.();
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className={cn("flex gap-4", className)}>
      {units.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="relative w-16 h-16 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center shadow-lg">
            <motion.span
              key={unit.value}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-bold"
            >
              {unit.value.toString().padStart(2, "0")}
            </motion.span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{unit.label}</p>
        </motion.div>
      ))}
    </div>
  );
}

// Percentage bar with animation
interface PercentageBarProps {
  value: number;
  className?: string;
  showValue?: boolean;
  color?: string;
}

export function PercentageBar({
  value,
  className,
  showValue = true,
  color = "bg-primary",
}: PercentageBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)}
        />
      </div>
      {showValue && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute right-0 -top-6 text-sm font-medium"
        >
          {value}%
        </motion.span>
      )}
    </div>
  );
}

// Odometer style number
interface OdometerProps {
  value: number;
  className?: string;
}

export function Odometer({ value, className }: OdometerProps) {
  const digits = value.toString().split("");

  return (
    <div className={cn("flex font-mono", className)}>
      {digits.map((digit, index) => (
        <motion.span
          key={index}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: index * 0.05,
          }}
          className="inline-block px-1 bg-muted rounded"
        >
          {digit}
        </motion.span>
      ))}
    </div>
  );
}

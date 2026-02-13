"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 15,
    duration: duration * 1000,
  });

  const display = useTransform(spring, (current) =>
    `${prefix}${current.toFixed(decimals)}${suffix}`
  );

  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return display.onChange((v) => setDisplayValue(v));
  }, [display]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
    >
      {displayValue}
    </motion.span>
  );
}

// Stats card with animated counter
interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
}

export function StatCard({
  label,
  value,
  prefix = "",
  suffix = "",
  icon,
  trend,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="bg-card border rounded-xl p-6 space-y-2"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="flex items-baseline gap-2">
        <AnimatedCounter
          value={value}
          prefix={prefix}
          suffix={suffix}
          className="text-3xl font-bold"
        />
        {trend && (
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend.isPositive ? "+" : "-"}
            {trend.value}%
          </span>
        )}
      </div>
    </motion.div>
  );
}

// Price counter with formatting
interface PriceCounterProps {
  value: number;
  className?: string;
}

export function PriceCounter({ value, className }: PriceCounterProps) {
  return (
    <AnimatedCounter
      value={value}
      prefix="$"
      decimals={2}
      duration={1}
      className={className}
    />
  );
}

// Progress counter (0-100)
interface ProgressCounterProps {
  value: number;
  label?: string;
  className?: string;
}

export function ProgressCounter({
  value,
  label,
  className,
}: ProgressCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className={className}>
      <div className="flex justify-between items-center mb-2">
        {label && <span className="text-sm font-medium">{label}</span>}
        <AnimatedCounter
          value={Math.min(value, 100)}
          suffix="%"
          className="text-sm font-semibold"
        />
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${Math.min(value, 100)}%` } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

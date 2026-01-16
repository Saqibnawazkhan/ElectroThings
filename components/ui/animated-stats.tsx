"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Animated counter that counts up when in view
export function AnimatedCounter({
  value,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const start = 0;
    const end = value;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeOut;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className={cn("tabular-nums", className)}
    >
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}

// Stats card with icon and trend
export function StatsCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  prefix = "",
  suffix = "",
  className,
}: {
  title: string;
  value: number;
  change?: number;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const TrendIcon = changeType === "positive" ? TrendingUp : changeType === "negative" ? TrendingDown : Minus;
  const trendColor = changeType === "positive" ? "text-green-500" : changeType === "negative" ? "text-red-500" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "relative p-6 rounded-2xl bg-background border border-border/50 overflow-hidden",
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{title}</span>
          {Icon && (
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"
            >
              <Icon className="h-5 w-5 text-primary" />
            </motion.div>
          )}
        </div>

        {/* Value */}
        <div className="text-3xl font-bold">
          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
        </div>

        {/* Change indicator */}
        {change !== undefined && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={cn("flex items-center gap-1 mt-2 text-sm", trendColor)}
          >
            <TrendIcon className="h-4 w-4" />
            <span>{change > 0 ? "+" : ""}{change}%</span>
            <span className="text-muted-foreground">vs last period</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// Circular progress stat
export function CircularStat({
  value,
  max = 100,
  label,
  size = "md",
  color = "primary",
  className,
}: {
  value: number;
  max?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "green" | "yellow" | "red";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const sizes = {
    sm: { width: 80, stroke: 6, text: "text-lg" },
    md: { width: 120, stroke: 8, text: "text-2xl" },
    lg: { width: 160, stroke: 10, text: "text-4xl" },
  };

  const colors = {
    primary: "stroke-primary",
    green: "stroke-green-500",
    yellow: "stroke-yellow-500",
    red: "stroke-red-500",
  };

  const { width, stroke, text } = sizes[size];
  const radius = (width - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (value / max) * 100;

  return (
    <div ref={ref} className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative" style={{ width, height: width }}>
        {/* Background circle */}
        <svg className="transform -rotate-90" width={width} height={width}>
          <circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            strokeWidth={stroke}
            className="fill-none stroke-muted"
          />
          <motion.circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            strokeWidth={stroke}
            strokeLinecap="round"
            className={cn("fill-none", colors[color])}
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={isInView ? {
              strokeDashoffset: circumference - (circumference * percentage) / 100,
            } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold", text)}>
            <AnimatedCounter value={percentage} suffix="%" decimals={0} />
          </span>
        </div>
      </div>

      {label && <span className="text-sm text-muted-foreground">{label}</span>}
    </div>
  );
}

// Stats grid
export function StatsGrid({
  stats,
  columns = 4,
  className,
}: {
  stats: {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
    icon?: LucideIcon;
    change?: number;
    changeType?: "positive" | "negative" | "neutral";
  }[];
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <StatsCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
}

// Big number display
export function BigNumber({
  value,
  label,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn("text-center", className)}
    >
      <div className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} duration={2.5} />
      </div>
      <p className="text-muted-foreground mt-2">{label}</p>
    </motion.div>
  );
}

// Mini sparkline chart
export function MiniSparkline({
  data,
  color = "primary",
  className,
}: {
  data: number[];
  color?: "primary" | "green" | "red";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const colors = {
    primary: "stroke-primary fill-primary/20",
    green: "stroke-green-500 fill-green-500/20",
    red: "stroke-red-500 fill-red-500/20",
  };

  const width = 100;
  const height = 40;
  const padding = 4;

  const points = data.map((value, index) => {
    const x = padding + (index / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((value - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <div ref={ref} className={className}>
      <svg width={width} height={height} className="overflow-visible">
        {/* Area */}
        <motion.polygon
          points={areaPoints}
          className={colors[color]}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        {/* Line */}
        <motion.polyline
          points={points}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={colors[color].split(" ")[0]}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        {/* End dot */}
        <motion.circle
          cx={width - padding}
          cy={height - padding - ((data[data.length - 1] - min) / range) * (height - padding * 2)}
          r={3}
          className={colors[color].split(" ")[0].replace("stroke", "fill")}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 1 }}
        />
      </svg>
    </div>
  );
}

// Comparison stat
export function ComparisonStat({
  label,
  current,
  previous,
  className,
}: {
  label: string;
  current: number;
  previous: number;
  className?: string;
}) {
  const change = ((current - previous) / previous) * 100;
  const isPositive = change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn("space-y-2", className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className={cn(
          "flex items-center gap-1 text-sm",
          isPositive ? "text-green-500" : "text-red-500"
        )}>
          {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          <AnimatedCounter value={Math.abs(change)} suffix="%" decimals={1} />
        </div>
      </div>

      <div className="flex items-end gap-4">
        <div>
          <span className="text-2xl font-bold">
            <AnimatedCounter value={current} />
          </span>
          <span className="text-xs text-muted-foreground ml-1">current</span>
        </div>
        <div className="text-muted-foreground">
          <span className="text-lg">{previous}</span>
          <span className="text-xs ml-1">previous</span>
        </div>
      </div>

      {/* Progress bar comparison */}
      <div className="relative h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-muted-foreground/30 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${(previous / Math.max(current, previous)) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <motion.div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full",
            isPositive ? "bg-green-500" : "bg-red-500"
          )}
          initial={{ width: 0 }}
          whileInView={{ width: `${(current / Math.max(current, previous)) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}

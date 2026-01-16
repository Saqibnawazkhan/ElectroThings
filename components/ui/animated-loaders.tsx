"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Spinner loader
export function SpinnerLoader({
  size = "md",
  color = "primary",
  className,
}: {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "muted";
  className?: string;
}) {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const colors = {
    primary: "border-primary/30 border-t-primary",
    white: "border-white/30 border-t-white",
    muted: "border-muted-foreground/30 border-t-muted-foreground",
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn("rounded-full", sizes[size], colors[color], className)}
    />
  );
}

// Dots loader
export function DotsLoader({
  size = "md",
  color = "primary",
  className,
}: {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "muted";
  className?: string;
}) {
  const sizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  const colors = {
    primary: "bg-primary",
    white: "bg-white",
    muted: "bg-muted-foreground",
  };

  return (
    <div className={cn("flex gap-1.5", className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          className={cn("rounded-full", sizes[size], colors[color])}
        />
      ))}
    </div>
  );
}

// Pulse loader
export function PulseLoader({
  size = "md",
  color = "primary",
  className,
}: {
  size?: "sm" | "md" | "lg";
  color?: "primary" | "white" | "muted";
  className?: string;
}) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const colors = {
    primary: "bg-primary",
    white: "bg-white",
    muted: "bg-muted-foreground",
  };

  return (
    <div className={cn("relative", sizes[size], className)}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [0.5, 1.5],
            opacity: [0.8, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          className={cn("absolute inset-0 rounded-full", colors[color])}
        />
      ))}
    </div>
  );
}

// Bar loader
export function BarLoader({
  className,
  color = "primary",
}: {
  className?: string;
  color?: "primary" | "gradient";
}) {
  return (
    <div className={cn("w-full h-1 bg-muted rounded-full overflow-hidden", className)}>
      <motion.div
        animate={{
          x: ["-100%", "200%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "w-1/3 h-full rounded-full",
          color === "primary" ? "bg-primary" : "bg-gradient-to-r from-primary via-purple-500 to-pink-500"
        )}
      />
    </div>
  );
}

// Circular progress loader
export function CircularLoader({
  size = "md",
  progress,
  showPercentage = false,
  className,
}: {
  size?: "sm" | "md" | "lg";
  progress?: number;
  showPercentage?: boolean;
  className?: string;
}) {
  const sizes = {
    sm: { width: 40, stroke: 3 },
    md: { width: 60, stroke: 4 },
    lg: { width: 80, stroke: 5 },
  };

  const { width, stroke } = sizes[size];
  const radius = (width - stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const isIndeterminate = progress === undefined;

  return (
    <div className={cn("relative", className)} style={{ width, height: width }}>
      <svg className="transform -rotate-90" width={width} height={width}>
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          strokeWidth={stroke}
          className="fill-none stroke-muted"
        />

        {/* Progress circle */}
        {isIndeterminate ? (
          <motion.circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            strokeWidth={stroke}
            strokeLinecap="round"
            className="fill-none stroke-primary"
            strokeDasharray={circumference}
            animate={{
              strokeDashoffset: [circumference, 0, circumference],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : (
          <motion.circle
            cx={width / 2}
            cy={width / 2}
            r={radius}
            strokeWidth={stroke}
            strokeLinecap="round"
            className="fill-none stroke-primary"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (circumference * (progress ?? 0)) / 100 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </svg>

      {showPercentage && progress !== undefined && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold">{Math.round(progress)}%</span>
        </div>
      )}
    </div>
  );
}

// Grid loader
export function GridLoader({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = {
    sm: "w-6 h-6 gap-0.5",
    md: "w-10 h-10 gap-1",
    lg: "w-14 h-14 gap-1.5",
  };

  const dotSizes = {
    sm: "w-1.5 h-1.5",
    md: "w-2.5 h-2.5",
    lg: "w-3.5 h-3.5",
  };

  return (
    <div className={cn("grid grid-cols-3", sizes[size], className)}>
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 0.5, 1],
            opacity: [1, 0.3, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className={cn("rounded-full bg-primary", dotSizes[size])}
        />
      ))}
    </div>
  );
}

// Wave loader
export function WaveLoader({
  className,
  barCount = 5,
}: {
  className?: string;
  barCount?: number;
}) {
  return (
    <div className={cn("flex items-center gap-1 h-8", className)}>
      {[...Array(barCount)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            height: [12, 24, 12],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.1,
          }}
          className="w-1.5 bg-primary rounded-full"
        />
      ))}
    </div>
  );
}

// Text loader
export function TextLoader({
  text = "Loading",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <span>{text}</span>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          .
        </motion.span>
      ))}
    </div>
  );
}

// Skeleton pulse
export function SkeletonPulse({
  className,
  rounded = "lg",
}: {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}) {
  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };

  return (
    <motion.div
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={cn("bg-muted", roundedClasses[rounded], className)}
    />
  );
}

// Logo loader
export function LogoLoader({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
      }}
      className={cn(
        "w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center",
        className
      )}
    >
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-2xl font-bold text-white"
      >
        E
      </motion.span>
    </motion.div>
  );
}

// Full page loader
export function PageLoader({
  text = "Loading",
}: {
  text?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
    >
      <LogoLoader />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-muted-foreground"
      >
        {text}
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-4 w-48 h-1 bg-primary/20 rounded-full overflow-hidden"
      >
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/3 h-full bg-primary rounded-full"
        />
      </motion.div>
    </motion.div>
  );
}

// Button loader
export function ButtonLoader({
  className,
}: {
  className?: string;
}) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={cn("w-5 h-5 border-2 border-current border-t-transparent rounded-full", className)}
    />
  );
}

// Card skeleton loader
export function CardSkeleton({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border/50 overflow-hidden", className)}>
      <SkeletonPulse className="aspect-square" rounded="sm" />
      <div className="p-4 space-y-3">
        <SkeletonPulse className="h-4 w-20" />
        <SkeletonPulse className="h-5 w-full" />
        <div className="flex justify-between">
          <SkeletonPulse className="h-6 w-16" />
          <SkeletonPulse className="h-4 w-12" />
        </div>
        <SkeletonPulse className="h-10 w-full" />
      </div>
    </div>
  );
}

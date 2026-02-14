"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  endTime: Date;
  onComplete?: () => void;
  variant?: "default" | "flash" | "deal";
  size?: "sm" | "md" | "lg";
}

export function CountdownTimer({
  endTime,
  onComplete,
  variant = "default",
  size = "md",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = endTime.getTime() - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.expired && onComplete) {
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onComplete]);

  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const variantClasses = {
    default: "bg-muted text-foreground",
    flash: "bg-gradient-to-r from-red-500 to-orange-500 text-white",
    deal: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
  };

  if (timeLeft.expired) {
    return (
      <div className="rounded-lg bg-gray-100 px-4 py-2 text-gray-500">
        Offer Expired
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 rounded-lg px-4 py-3",
        variantClasses[variant]
      )}
    >
      {variant === "flash" ? (
        <Flame className="h-5 w-5" />
      ) : (
        <Clock className="h-5 w-5" />
      )}
      <div className="flex items-center gap-2">
        {timeLeft.days > 0 && (
          <TimeUnit value={timeLeft.days} label="D" size={size} />
        )}
        <TimeUnit value={timeLeft.hours} label="H" size={size} />
        <span className={sizeClasses[size]}>:</span>
        <TimeUnit value={timeLeft.minutes} label="M" size={size} />
        <span className={sizeClasses[size]}>:</span>
        <TimeUnit value={timeLeft.seconds} label="S" size={size} />
      </div>
    </div>
  );
}

function TimeUnit({
  value,
  label,
  size,
}: {
  value: number;
  label: string;
  size: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className="flex flex-col items-center">
      <motion.span
        key={value}
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn("font-bold tabular-nums", sizeClasses[size])}
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
      <span className="text-xs font-medium opacity-75">{label}</span>
    </div>
  );
}

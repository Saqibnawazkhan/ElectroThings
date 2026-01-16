"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Animated gradient border
export function GradientBorder({
  children,
  className,
  borderWidth = 2,
  borderRadius = "1rem",
  gradient = "from-primary via-purple-500 to-pink-500",
  animated = true,
}: {
  children: React.ReactNode;
  className?: string;
  borderWidth?: number;
  borderRadius?: string;
  gradient?: string;
  animated?: boolean;
}) {
  return (
    <div
      className={cn("relative p-[2px]", className)}
      style={{
        borderRadius,
        padding: borderWidth,
      }}
    >
      {/* Gradient border */}
      <motion.div
        className={cn(
          "absolute inset-0 bg-gradient-to-r",
          gradient
        )}
        style={{ borderRadius }}
        animate={animated ? {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <div
        className="relative bg-background"
        style={{ borderRadius: `calc(${borderRadius} - ${borderWidth}px)` }}
      >
        {children}
      </div>
    </div>
  );
}

// Animated background gradient
export function AnimatedGradientBackground({
  children,
  className,
  colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#3b82f6"],
}: {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(45deg, ${colors.join(", ")})`,
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Mesh gradient background
export function MeshGradient({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
            top: "20%",
            right: "-10%",
          }}
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
            bottom: "-5%",
            left: "30%",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Spotlight effect
export function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-background border border-border/50",
        className
      )}
      whileHover="hover"
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0"
        style={{
          background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.15), transparent 40%)",
        }}
        variants={{
          hover: { opacity: 1 },
        }}
      />

      <div
        className="relative z-10"
        onMouseMove={(e) => {
          const rect = e.currentTarget.parentElement?.getBoundingClientRect();
          if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            e.currentTarget.parentElement?.style.setProperty("--mouse-x", `${x}px`);
            e.currentTarget.parentElement?.style.setProperty("--mouse-y", `${y}px`);
          }
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

// Aurora background
export function AuroraBackground({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-full opacity-50"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.2) 30%, rgba(139,92,246,0.3) 50%, rgba(236,72,153,0.2) 70%, transparent 100%)",
            filter: "blur(100px)",
          }}
          animate={{
            y: ["-50%", "0%", "-50%"],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-full h-full opacity-30"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.3) 25%, rgba(139,92,246,0.3) 50%, rgba(34,197,94,0.2) 75%, transparent 100%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: ["-25%", "25%", "-25%"],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Glow effect for buttons/cards
export function GlowEffect({
  children,
  className,
  color = "primary",
  intensity = "medium",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "purple" | "pink" | "cyan" | "green";
  intensity?: "low" | "medium" | "high";
}) {
  const colors = {
    primary: "rgba(59, 130, 246, VAR)",
    purple: "rgba(139, 92, 246, VAR)",
    pink: "rgba(236, 72, 153, VAR)",
    cyan: "rgba(6, 182, 212, VAR)",
    green: "rgba(34, 197, 94, VAR)",
  };

  const intensities = {
    low: 0.2,
    medium: 0.4,
    high: 0.6,
  };

  const glowColor = colors[color].replace("VAR", String(intensities[intensity]));

  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: glowColor }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

// Noise texture overlay
export function NoiseOverlay({
  opacity = 0.03,
  className,
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity,
      }}
    />
  );
}

// Gradient text
export function AnimatedGradientText({
  children,
  className,
  gradient = "from-primary via-purple-500 to-pink-500",
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
}) {
  return (
    <motion.span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent bg-[length:200%_auto]",
        gradient,
        className
      )}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

// Shiny button effect
export function ShinyButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-xl px-6 py-3 font-semibold",
        "bg-gradient-to-r from-primary to-purple-600 text-white",
        "shadow-lg shadow-primary/30",
        className
      )}
    >
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        }}
        animate={{
          translateX: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

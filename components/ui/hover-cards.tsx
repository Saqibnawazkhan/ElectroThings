"use client";

import { useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

// Perspective hover card
interface PerspectiveCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function PerspectiveCard({
  children,
  className,
  intensity = 10,
}: PerspectiveCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn("relative", className)}
    >
      {children}

      {/* Highlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          background: `radial-gradient(circle at ${useTransform(mouseX, (x) => (x + 0.5) * 100)}% ${useTransform(mouseY, (y) => (y + 0.5) * 100)}%, rgba(255,255,255,0.15), transparent 50%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}

// Glow border card on hover
interface GlowBorderCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowBorderCard({
  children,
  className,
  glowColor = "from-primary via-purple-500 to-pink-500",
}: GlowBorderCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("relative group", className)}
    >
      {/* Animated gradient border */}
      <motion.div
        className={cn(
          "absolute -inset-[2px] rounded-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          glowColor
        )}
        animate={
          isHovered
            ? {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }
            : {}
        }
        transition={{ duration: 3, repeat: Infinity }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute -inset-2 rounded-2xl bg-gradient-to-r blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500",
          glowColor
        )}
      />

      {/* Content */}
      <div className="relative bg-background rounded-2xl p-6">{children}</div>
    </motion.div>
  );
}

// Lift card on hover
interface LiftCardProps {
  children: ReactNode;
  className?: string;
  liftAmount?: number;
}

export function LiftCard({
  children,
  className,
  liftAmount = 10,
}: LiftCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -liftAmount,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("transition-shadow", className)}
    >
      {children}
    </motion.div>
  );
}

// Flip card (front and back)
interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export function FlipCard({ front, back, className }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn("relative cursor-pointer", className)}
      style={{ perspective: 1000 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

// Reveal card with sliding content
interface RevealCardProps {
  children: ReactNode;
  overlay: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function RevealCard({
  children,
  overlay,
  className,
  direction = "up",
}: RevealCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const slideVariants = {
    up: { y: "100%" },
    down: { y: "-100%" },
    left: { x: "100%" },
    right: { x: "-100%" },
  };

  const slideHoverVariants = {
    up: { y: 0 },
    down: { y: 0 },
    left: { x: 0 },
    right: { x: 0 },
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("relative overflow-hidden", className)}
    >
      {children}

      <motion.div
        initial={slideVariants[direction]}
        animate={isHovered ? slideHoverVariants[direction] : slideVariants[direction]}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/95 to-purple-600/95 text-white"
      >
        {overlay}
      </motion.div>
    </motion.div>
  );
}

// Scale card with inner shadow
interface ScaleCardProps {
  children: ReactNode;
  className?: string;
  scaleFactor?: number;
}

export function ScaleCard({
  children,
  className,
  scaleFactor = 1.05,
}: ScaleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: scaleFactor }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("relative overflow-hidden", className)}
    >
      {children}

      {/* Inner shadow on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"
      />
    </motion.div>
  );
}

// Spotlight hover card
interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn("relative overflow-hidden", className)}
    >
      {children}

      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) =>
              `radial-gradient(circle 200px at ${x}px ${y}px, rgba(255,255,255,0.15), transparent)`
          ),
        }}
      />
    </motion.div>
  );
}

// Magnetic card that follows cursor
interface MagneticCardProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticCard({
  children,
  className,
  strength = 0.3,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stack card with depth layers
interface StackCardProps {
  children: ReactNode;
  layers?: number;
  className?: string;
}

export function StackCard({ children, layers = 3, className }: StackCardProps) {
  return (
    <motion.div
      whileHover="hover"
      className={cn("relative", className)}
    >
      {/* Background layers */}
      {[...Array(layers)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-2xl bg-muted border border-border"
          style={{
            zIndex: -i - 1,
          }}
          variants={{
            hover: {
              x: (i + 1) * 8,
              y: (i + 1) * 8,
              opacity: 1 - (i + 1) * 0.2,
            },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      ))}

      {/* Main card */}
      <div className="relative z-10 rounded-2xl bg-background border border-border">
        {children}
      </div>
    </motion.div>
  );
}

// Shimmer card on hover
interface ShimmerCardProps {
  children: ReactNode;
  className?: string;
}

export function ShimmerCard({ children, className }: ShimmerCardProps) {
  return (
    <div className={cn("relative overflow-hidden group", className)}>
      {children}

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
      />
    </div>
  );
}

// Image zoom card
interface ZoomImageCardProps {
  children: ReactNode;
  className?: string;
  zoomScale?: number;
}

export function ZoomImageCard({
  children,
  className,
  zoomScale = 1.1,
}: ZoomImageCardProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl group", className)}>
      <motion.div
        whileHover={{ scale: zoomScale }}
        transition={{ duration: 0.4 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Tilt card with 3D effect
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({
  children,
  className,
  maxTilt = 15,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={cn(
        "relative rounded-2xl bg-background border border-border/50",
        className
      )}
    >
      <div style={{ transform: "translateZ(50px)" }}>{children}</div>
    </motion.div>
  );
}

// Glow card on hover
interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({
  children,
  className,
  glowColor = "rgba(59, 130, 246, 0.5)",
}: GlowCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative rounded-2xl", className)}
    >
      {/* Glow */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur-lg"
        style={{ backgroundColor: glowColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card */}
      <div className="relative rounded-2xl bg-background border border-border/50 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

// Slide up overlay card
interface SlideUpCardProps {
  image: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function SlideUpCard({
  image,
  title,
  description,
  className,
}: SlideUpCardProps) {
  return (
    <motion.div
      whileHover="hover"
      className={cn(
        "relative rounded-2xl overflow-hidden bg-background border border-border/50",
        className
      )}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden">{image}</div>

      {/* Sliding content */}
      <motion.div
        variants={{
          hover: { y: 0 },
        }}
        initial={{ y: "100%" }}
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6"
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {description && (
          <p className="text-sm text-white/80 mt-1">{description}</p>
        )}
      </motion.div>
    </motion.div>
  );
}

// Border animate card
interface BorderAnimateCardProps {
  children: ReactNode;
  className?: string;
}

export function BorderAnimateCard({
  children,
  className,
}: BorderAnimateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative p-[2px] rounded-2xl", className)}
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-purple-500 to-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Static border when not hovered */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl border border-border/50 transition-opacity duration-300",
          isHovered && "opacity-0"
        )}
      />

      {/* Content */}
      <div className="relative bg-background rounded-[14px] overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
}

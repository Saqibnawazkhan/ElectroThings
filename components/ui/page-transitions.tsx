"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Fade transition
export function FadeTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Slide up transition
export function SlideUpTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Slide from right transition
export function SlideFromRightTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Scale transition
export function ScaleTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Blur transition
export function BlurTransition({ children, className }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.4 }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Staggered children animation
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: PageTransitionProps & { staggerDelay?: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Section reveal animation
export function RevealSection({
  children,
  className,
  direction = "up",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}) {
  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax section
export function ParallaxSection({
  children,
  className,
  speed = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  return (
    <motion.div
      initial={{ y: 100 * speed }}
      whileInView={{ y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal animation (word by word)
export function TextReveal({
  text,
  className,
  delay = 0,
  wordDelay = 0.05,
}: {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}) {
  const words = text.split(" ");

  return (
    <motion.span className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + index * wordDelay,
            ease: "easeOut",
          }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Character reveal animation
export function CharacterReveal({
  text,
  className,
  delay = 0,
  charDelay = 0.02,
}: {
  text: string;
  className?: string;
  delay?: number;
  charDelay?: number;
}) {
  const characters = text.split("");

  return (
    <motion.span className={className}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.2,
            delay: delay + index * charDelay,
            ease: "easeOut",
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Scroll progress indicator
export function ScrollProgress({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left",
        className
      )}
      initial={{ scaleX: 0 }}
      style={{
        scaleX: 0,
      }}
      animate={{
        scaleX: typeof window !== "undefined" ? undefined : 0,
      }}
    />
  );
}

// Curtain reveal
export function CurtainReveal({
  children,
  className,
  color = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "background";
}) {
  const colors = {
    primary: "bg-primary",
    background: "bg-background",
  };

  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className={cn("absolute inset-0 z-10", colors[color])}
        variants={{
          hidden: { x: 0 },
          visible: { x: "100%" },
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
        transition={{ delay: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Flip card animation
export function FlipCard({
  front,
  back,
  className,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("relative cursor-pointer", className)}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      initial={false}
      whileHover={{ rotateY: 180 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
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
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
      >
        {back}
      </div>
    </motion.div>
  );
}

// Magnetic hover effect
export function MagneticHover({
  children,
  className,
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        x: 0,
        y: 0,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        e.currentTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0px, 0px)";
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  );
}

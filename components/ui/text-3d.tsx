"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Animated gradient text
export function GradientText({
  children,
  className,
  gradient = "from-primary via-purple-500 to-pink-500",
  animate = true,
}: {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  animate?: boolean;
}) {
  return (
    <motion.span
      className={cn("bg-gradient-to-r bg-clip-text text-transparent", gradient, className)}
      style={animate ? { backgroundSize: "200% auto" } : {}}
      animate={
        animate
          ? {
              backgroundPosition: ["0%", "100%", "0%"],
            }
          : {}
      }
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {children}
    </motion.span>
  );
}

// Letter by letter reveal animation
export function TextReveal({
  children,
  className,
  delay = 0,
  staggerDelay = 0.03,
}: {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}) {
  const letters = children.split("");

  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * staggerDelay,
            type: "spring",
            stiffness: 100,
          }}
          style={{ display: "inline-block" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

// Typewriter effect
export function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 50,
  cursor = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const sentenceVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: speed / 1000,
        delayChildren: delay,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <span ref={ref} className={cn("relative", className)}>
      <motion.span variants={sentenceVariants} initial="hidden" animate={controls}>
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={letterVariants}>
            {char}
          </motion.span>
        ))}
      </motion.span>
      {cursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-[2px] h-[1em] bg-primary ml-1 align-middle"
        />
      )}
    </span>
  );
}

// 3D text with depth shadow
export function Text3D({
  children,
  className,
  depth = 8,
  color = "rgba(0, 0, 0, 0.15)",
}: {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  color?: string;
}) {
  const shadows = Array.from({ length: depth }, (_, i) => `${i + 1}px ${i + 1}px 0 ${color}`).join(
    ", "
  );

  return (
    <motion.span
      className={cn("relative inline-block", className)}
      style={{ textShadow: shadows }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.span>
  );
}

// Glitch text effect
export function GlitchText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute top-0 left-0 text-cyan-500 opacity-70"
        animate={{
          x: [0, -2, 2, 0],
          y: [0, 1, -1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        aria-hidden
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-red-500 opacity-70"
        animate={{
          x: [0, 2, -2, 0],
          y: [0, -1, 1, 0],
        }}
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatDelay: 3,
          delay: 0.05,
        }}
        aria-hidden
      >
        {children}
      </motion.span>
    </span>
  );
}

// Word by word reveal
export function WordReveal({
  children,
  className,
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const words = children.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.4,
            delay: delay + index * 0.1,
            type: "spring",
            stiffness: 100,
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Scroll-triggered counter
export function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className,
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        transition: { duration: 0.3 },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={className}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 1 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {isInView && (
          <Counter from={0} to={end} duration={duration} />
        )}
      </motion.span>
      {suffix}
    </motion.span>
  );
}

function Counter({ from, to, duration }: { from: number; to: number; duration: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = from + (to - from) * easeOutQuart;

      if (ref.current) {
        ref.current.textContent = Math.floor(current).toLocaleString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [from, to, duration]);

  return <span ref={ref}>{from}</span>;
}

// Floating text
export function FloatingText({
  children,
  className,
  amplitude = 10,
  duration = 3,
}: {
  children: React.ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
}) {
  return (
    <motion.span
      animate={{
        y: [-amplitude, amplitude, -amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
}

// Shiny text effect
export function ShinyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-block overflow-hidden", className)}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
        animate={{ translateX: ["−100%", "200%"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
    </span>
  );
}

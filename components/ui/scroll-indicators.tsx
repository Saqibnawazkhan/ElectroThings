"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown, ArrowDown, Mouse, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Scroll progress bar
export function ScrollProgressBar({
  className,
  position = "top",
  color = "primary",
}: {
  className?: string;
  position?: "top" | "bottom";
  color?: "primary" | "gradient";
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 h-1 z-50 origin-left",
        position === "top" ? "top-0" : "bottom-0",
        color === "primary" ? "bg-primary" : "bg-gradient-to-r from-primary via-purple-500 to-pink-500",
        className
      )}
      style={{ scaleX }}
    />
  );
}

// Scroll down indicator
export function ScrollDownIndicator({
  className,
  variant = "chevron",
  text,
}: {
  className?: string;
  variant?: "chevron" | "arrow" | "mouse" | "text";
  text?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn("flex flex-col items-center gap-2 cursor-pointer", className)}
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
    >
      {text && (
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-muted-foreground"
        >
          {text}
        </motion.span>
      )}

      {variant === "chevron" && (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </motion.div>
      )}

      {variant === "arrow" && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <ArrowDown className="h-5 w-5 text-primary" />
        </motion.div>
      )}

      {variant === "mouse" && (
        <motion.div className="relative w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center">
          <motion.div
            animate={{ y: [4, 16, 4], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 mt-2 rounded-full bg-muted-foreground"
          />
        </motion.div>
      )}

      {variant === "text" && (
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-sm text-muted-foreground mb-1">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
        </motion.div>
      )}
    </motion.div>
  );
}

// Back to top button
export function BackToTopButton({
  className,
  threshold = 400,
}: {
  className?: string;
  threshold?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-background border border-border/50 shadow-lg flex items-center justify-center",
        className
      )}
    >
      {/* Progress ring */}
      <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 48 48">
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted/30"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
          style={{
            pathLength,
            strokeDasharray: "1 1",
          }}
        />
      </svg>

      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ChevronUp className="h-5 w-5" />
      </motion.div>
    </motion.button>
  );
}

// Section indicator dots
export function SectionIndicator({
  sections,
  activeSection,
  onChange,
  className,
  position = "right",
}: {
  sections: { id: string; label?: string }[];
  activeSection: string;
  onChange?: (id: string) => void;
  className?: string;
  position?: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: position === "right" ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4",
        position === "right" ? "right-6" : "left-6",
        className
      )}
    >
      {sections.map((section, index) => {
        const isActive = activeSection === section.id;

        return (
          <motion.button
            key={section.id}
            onClick={() => onChange?.(section.id)}
            whileHover={{ scale: 1.2 }}
            className="relative group flex items-center"
          >
            {/* Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1.2 : 1,
                backgroundColor: isActive ? "var(--primary)" : "transparent",
              }}
              className={cn(
                "w-3 h-3 rounded-full border-2 transition-colors",
                isActive ? "border-primary" : "border-muted-foreground/50 hover:border-primary"
              )}
            />

            {/* Label tooltip */}
            {section.label && (
              <motion.span
                initial={{ opacity: 0, x: position === "right" ? 10 : -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className={cn(
                  "absolute whitespace-nowrap text-sm bg-background border border-border px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity",
                  position === "right" ? "right-6" : "left-6"
                )}
              >
                {section.label}
              </motion.span>
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

// Parallax scroll section
export function ParallaxSection({
  children,
  className,
  speed = 0.5,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * speed);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// Scroll-triggered counter
export function ScrollCounter({
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
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(end * easeOut));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <motion.span
      id={`counter-${end}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("tabular-nums", className)}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  );
}

// Horizontal scroll section
export function HorizontalScrollSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto scrollbar-hide", className)}>
      <motion.div
        className="flex gap-6 pb-4"
        drag="x"
        dragConstraints={{ left: -1000, right: 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Scroll reveal text
export function ScrollRevealText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const words = children.split(" ");

  return (
    <span className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ delay: index * 0.1 }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// Sticky scroll section with snap
export function SnapScrollContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-screen overflow-y-auto snap-y snap-mandatory",
        className
      )}
    >
      {children}
    </div>
  );
}

export function SnapSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      className={cn("min-h-screen snap-start flex items-center justify-center", className)}
    >
      {children}
    </motion.section>
  );
}

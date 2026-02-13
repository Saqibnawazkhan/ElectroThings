"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScrollProgress3DProps {
  showPercentage?: boolean;
  showScrollToTop?: boolean;
  position?: "left" | "right" | "top" | "bottom";
  variant?: "bar" | "circle" | "dots";
}

export function ScrollProgress3D({
  showPercentage = true,
  showScrollToTop = true,
  position = "right",
  variant = "circle",
}: ScrollProgress3DProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const percentage = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    const unsubscribe = percentage.on("change", (v) => {
      setDisplayPercentage(Math.round(v));
    });
    return unsubscribe;
  }, [percentage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Bar variant
  if (variant === "bar") {
    return (
      <motion.div
        className={cn(
          "fixed z-50",
          position === "top" && "top-0 left-0 right-0 h-1",
          position === "bottom" && "bottom-0 left-0 right-0 h-1"
        )}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 origin-left"
          style={{ scaleX }}
        />
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 blur-sm origin-left"
          style={{ scaleX }}
        />
      </motion.div>
    );
  }

  // Circle variant
  if (variant === "circle") {
    const circumference = 2 * Math.PI * 20; // radius = 20

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
        className={cn(
          "fixed z-50 flex flex-col items-center gap-2",
          position === "right" && "right-6 bottom-6",
          position === "left" && "left-6 bottom-6"
        )}
      >
        {/* Circular progress */}
        <div className="relative">
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              cx="28"
              cy="28"
              r="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <motion.circle
              cx="28"
              cy="28"
              r="20"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-primary"
              style={{
                stroke: "url(#gradient)",
                strokeDasharray: circumference,
                strokeDashoffset: useTransform(
                  scrollYProgress,
                  [0, 1],
                  [circumference, 0]
                ),
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>

          {/* Percentage or scroll to top */}
          <button
            onClick={scrollToTop}
            className="absolute inset-0 flex items-center justify-center group"
          >
            {showScrollToTop ? (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-background shadow-lg border border-border flex items-center justify-center"
              >
                <ArrowUp className="h-4 w-4 group-hover:text-primary transition-colors" />
              </motion.div>
            ) : showPercentage ? (
              <span className="text-xs font-bold">{displayPercentage}%</span>
            ) : null}
          </button>
        </div>

        {/* Percentage text below */}
        {showPercentage && showScrollToTop && (
          <span className="text-xs font-medium text-muted-foreground">
            {displayPercentage}%
          </span>
        )}
      </motion.div>
    );
  }

  // Dots variant
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      className={cn(
        "fixed z-50 flex gap-2",
        position === "right" && "right-6 top-1/2 -translate-y-1/2 flex-col",
        position === "left" && "left-6 top-1/2 -translate-y-1/2 flex-col"
      )}
    >
      {[0, 0.25, 0.5, 0.75, 1].map((threshold, index) => (
        <motion.button
          key={index}
          onClick={() => {
            window.scrollTo({
              top: threshold * (document.body.scrollHeight - window.innerHeight),
              behavior: "smooth",
            });
          }}
          className={cn(
            "w-3 h-3 rounded-full transition-all duration-300",
            "hover:scale-125"
          )}
          animate={{
            backgroundColor:
              displayPercentage / 100 >= threshold
                ? "rgb(139, 92, 246)"
                : "rgba(139, 92, 246, 0.2)",
            scale: Math.abs(displayPercentage / 100 - threshold) < 0.15 ? 1.3 : 1,
          }}
        />
      ))}
    </motion.div>
  );
}

// Reading progress for articles/long content
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left bg-gradient-to-r from-primary via-purple-500 to-pink-500"
      style={{ scaleX }}
    >
      {/* Animated glow */}
      <motion.div
        className="absolute right-0 top-0 w-20 h-full bg-gradient-to-r from-transparent to-white/50"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  );
}

// Section indicators for single page apps
export function SectionIndicators({
  sections,
}: {
  sections: { id: string; label: string }[];
}) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id);

  useEffect(() => {
    const observers = sections.map((section) => {
      const element = document.getElementById(section.id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [sections]);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section) => (
        <motion.button
          key={section.id}
          onClick={() => {
            document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex items-center gap-3"
          whileHover={{ x: -5 }}
        >
          <span
            className={cn(
              "text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity text-right",
              activeSection === section.id && "opacity-100 text-primary"
            )}
          >
            {section.label}
          </span>
          <motion.div
            className={cn(
              "w-3 h-3 rounded-full border-2 transition-colors",
              activeSection === section.id
                ? "bg-primary border-primary"
                : "border-muted-foreground/50 group-hover:border-primary"
            )}
            animate={{
              scale: activeSection === section.id ? 1.2 : 1,
            }}
          />
        </motion.button>
      ))}
    </nav>
  );
}

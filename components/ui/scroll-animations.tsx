"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// Parallax scroll section
interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ children, speed = 0.5, className }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: springY }} className={className}>
      {children}
    </motion.div>
  );
}

// Scale on scroll
interface ScaleOnScrollProps {
  children: ReactNode;
  className?: string;
  scaleRange?: [number, number];
}

export function ScaleOnScroll({ children, className, scaleRange = [0.8, 1] }: ScaleOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ scale: springScale, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Rotate on scroll
interface RotateOnScrollProps {
  children: ReactNode;
  className?: string;
  rotationRange?: [number, number];
  axis?: "x" | "y" | "z";
}

export function RotateOnScroll({
  children,
  className,
  rotationRange = [-10, 10],
  axis = "y",
}: RotateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], rotationRange);
  const springRotation = useSpring(rotation, { stiffness: 100, damping: 30 });

  const rotationStyle = {
    rotateX: axis === "x" ? springRotation : 0,
    rotateY: axis === "y" ? springRotation : 0,
    rotateZ: axis === "z" ? springRotation : 0,
  };

  return (
    <motion.div
      ref={ref}
      style={{ ...rotationStyle, perspective: 1000, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3D perspective shift on scroll
interface PerspectiveShiftProps {
  children: ReactNode;
  className?: string;
}

export function PerspectiveShift({ children, className }: PerspectiveShiftProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: springRotateX,
        y: springY,
        opacity,
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Horizontal scroll section
interface HorizontalScrollProps {
  children: ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className }: HorizontalScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <section ref={targetRef} className={cn("relative h-[300vh]", className)}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x: springX }} className="flex gap-8">
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// Zoom on scroll (Ken Burns effect)
interface ZoomScrollProps {
  children: ReactNode;
  className?: string;
  zoomRange?: [number, number];
}

export function ZoomScroll({ children, className, zoomRange = [1, 1.5] }: ZoomScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], zoomRange);
  const springScale = useSpring(scale, { stiffness: 50, damping: 30 });

  return (
    <motion.div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ scale: springScale }}>{children}</motion.div>
    </motion.div>
  );
}

// Reveal on scroll with mask
interface RevealMaskProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
}

export function RevealMask({ children, className, direction = "left" }: RevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const clipPaths = {
    left: {
      hidden: "polygon(0 0, 0 0, 0 100%, 0 100%)",
      visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    right: {
      hidden: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    top: {
      hidden: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    bottom: {
      hidden: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      visible: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: clipPaths[direction].hidden }}
      animate={{
        clipPath: isInView ? clipPaths[direction].visible : clipPaths[direction].hidden,
      }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered fade in on scroll
interface StaggerFadeProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
}

export function StaggerFade({ children, className, itemClassName }: StaggerFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
    },
  };

  const itemTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 15,
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ perspective: 1000 }}
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants} transition={itemTransition} className={itemClassName}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

// 3D card flip on scroll
interface FlipOnScrollProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export function FlipOnScroll({ front, back, className }: FlipOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  return (
    <div ref={ref} className={cn("relative", className)} style={{ perspective: 1000 }}>
      <motion.div
        style={{
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        <div className="absolute inset-0 backface-hidden">{front}</div>
        <div
          className="absolute inset-0 backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

// Floating elements on scroll
interface FloatOnScrollProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
}

export function FloatOnScroll({ children, className, amplitude = 20 }: FloatOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, -amplitude, 0, amplitude, 0]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 5, 0, -5, 0]
  );

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{ y: springY, rotate: springRotate }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Text reveal on scroll
interface TextRevealScrollProps {
  text: string;
  className?: string;
}

export function TextRevealScroll({ text, className }: TextRevealScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={index} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const blur = useTransform(progress, range, [5, 0]);

  return (
    <motion.span
      style={{ opacity, y, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
      className="mr-3 mt-2"
    >
      {children}
    </motion.span>
  );
}

// Progress bar on scroll
interface ScrollProgressBarProps {
  className?: string;
  color?: string;
}

export function ScrollProgressBar({ className, color = "bg-primary" }: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className={cn("fixed top-0 left-0 right-0 h-1 origin-left z-50", color, className)}
    />
  );
}

"use client";

import { useRef, ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// Parallax depth layers
interface ParallaxLayerProps {
  children: ReactNode;
  depth?: number; // 0 = foreground, higher = further back
  className?: string;
}

export function ParallaxLayer({
  children,
  depth = 1,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [depth * 100, -depth * 100]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1 - depth * 0.1, 1, 1 - depth * 0.1]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.5, 1, 1, 0.5]
  );

  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      style={{
        y: springY,
        scale,
        opacity,
        zIndex: 10 - depth,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3D layers that respond to mouse
interface Mouse3DLayersProps {
  layers: ReactNode[];
  className?: string;
  intensity?: number;
}

export function Mouse3DLayers({
  layers,
  className,
  intensity = 10,
}: Mouse3DLayersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative", className)}
      style={{ perspective: 1000 }}
    >
      {layers.map((layer, index) => {
        const layerIntensity = (layers.length - index) * intensity;
        const x = useTransform(mouseX, [-1, 1], [-layerIntensity, layerIntensity]);
        const y = useTransform(mouseY, [-1, 1], [-layerIntensity, layerIntensity]);
        const springX = useSpring(x, { stiffness: 150, damping: 20 });
        const springY = useSpring(y, { stiffness: 150, damping: 20 });

        return (
          <motion.div
            key={index}
            style={{
              x: springX,
              y: springY,
              zIndex: index,
            }}
            className={index === 0 ? "relative" : "absolute inset-0"}
          >
            {layer}
          </motion.div>
        );
      })}
    </div>
  );
}

// Depth card with shadow layers
interface DepthCardProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export function DepthCard({ children, depth = 3, className }: DepthCardProps) {
  return (
    <motion.div
      whileHover="hover"
      initial="rest"
      className={cn("relative", className)}
    >
      {/* Shadow layers */}
      {[...Array(depth)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-2xl bg-black/5 dark:bg-white/5"
          variants={{
            rest: {
              x: 0,
              y: 0,
            },
            hover: {
              x: (i + 1) * 4,
              y: (i + 1) * 4,
            },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{ zIndex: -i - 1 }}
        />
      ))}

      {/* Main content */}
      <motion.div
        variants={{
          rest: { x: 0, y: 0 },
          hover: { x: -4, y: -4 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 bg-background rounded-2xl border"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Floating elements at different Z depths
interface FloatingElementProps {
  children: ReactNode;
  z?: number;
  floatRange?: number;
  duration?: number;
  className?: string;
}

export function FloatingElement({
  children,
  z = 0,
  floatRange = 10,
  duration = 3,
  className,
}: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-floatRange, floatRange, -floatRange],
        rotateX: [0, 2, 0],
        rotateY: [0, 2, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      style={{
        transformStyle: "preserve-3d",
        transform: `translateZ(${z}px)`,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stacked cards with Z-depth
interface StackedCardsProps {
  cards: ReactNode[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

export function StackedCards({
  cards,
  activeIndex = 0,
  onSelect,
  className,
}: StackedCardsProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{ perspective: 1500, perspectiveOrigin: "50% 50%" }}
    >
      {cards.map((card, index) => {
        const offset = index - activeIndex;
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={index}
            onClick={() => onSelect?.(index)}
            animate={{
              z: offset * -50,
              y: offset * 20,
              scale: 1 - Math.abs(offset) * 0.1,
              opacity: 1 - Math.abs(offset) * 0.3,
              rotateX: offset * 5,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{
              transformStyle: "preserve-3d",
              zIndex: cards.length - Math.abs(offset),
            }}
            className={cn(
              "cursor-pointer",
              index !== activeIndex && "absolute inset-0"
            )}
            whileHover={
              !isActive
                ? {
                    scale: 1 - Math.abs(offset) * 0.1 + 0.02,
                    z: offset * -50 + 20,
                  }
                : undefined
            }
          >
            {card}
          </motion.div>
        );
      })}
    </div>
  );
}

// 3D box with rotating faces
interface Box3DProps {
  front: ReactNode;
  back?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  top?: ReactNode;
  bottom?: ReactNode;
  rotateX?: number;
  rotateY?: number;
  size?: number;
  className?: string;
}

export function Box3D({
  front,
  back,
  left,
  right,
  top,
  bottom,
  rotateX = 0,
  rotateY = 0,
  size = 200,
  className,
}: Box3DProps) {
  const halfSize = size / 2;

  return (
    <div
      className={cn("relative", className)}
      style={{
        width: size,
        height: size,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          position: "relative",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            transform: `translateZ(${halfSize}px)`,
            backfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>

        {/* Back */}
        {back && (
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              transform: `rotateY(180deg) translateZ(${halfSize}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {back}
          </div>
        )}

        {/* Left */}
        {left && (
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              transform: `rotateY(-90deg) translateZ(${halfSize}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {left}
          </div>
        )}

        {/* Right */}
        {right && (
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              transform: `rotateY(90deg) translateZ(${halfSize}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {right}
          </div>
        )}

        {/* Top */}
        {top && (
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              transform: `rotateX(90deg) translateZ(${halfSize}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {top}
          </div>
        )}

        {/* Bottom */}
        {bottom && (
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              transform: `rotateX(-90deg) translateZ(${halfSize}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            {bottom}
          </div>
        )}
      </motion.div>
    </div>
  );
}

// Isometric grid layer
interface IsometricLayerProps {
  children: ReactNode;
  className?: string;
}

export function IsometricLayer({ children, className }: IsometricLayerProps) {
  return (
    <motion.div
      style={{
        transform: "rotateX(60deg) rotateZ(-45deg)",
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        rotateX: 50,
        rotateZ: -40,
        transition: { duration: 0.3 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pop out layer on scroll
interface PopOutLayerProps {
  children: ReactNode;
  className?: string;
}

export function PopOutLayer({ children, className }: PopOutLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const z = useTransform(scrollYProgress, [0, 1], [-100, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [30, 0]);

  const springZ = useSpring(z, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={ref}
      style={{ perspective: 1000 }}
      className={className}
    >
      <motion.div
        style={{
          z: springZ,
          scale: springScale,
          rotateX: springRotateX,
          opacity,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Layered text with depth
interface DepthTextProps {
  text: string;
  layers?: number;
  className?: string;
}

export function DepthText({ text, layers = 5, className }: DepthTextProps) {
  return (
    <div className={cn("relative", className)}>
      {[...Array(layers)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="absolute inset-0"
          style={{
            textShadow: `${i * 1}px ${i * 1}px 0 rgba(0,0,0,${0.1 - i * 0.02})`,
            transform: `translate(${i * -1}px, ${i * -1}px)`,
            zIndex: layers - i,
          }}
        >
          {text}
        </motion.span>
      ))}
      <span className="relative z-10">{text}</span>
    </div>
  );
}

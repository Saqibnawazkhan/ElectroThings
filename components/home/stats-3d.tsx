"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { Users, Package, Star, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  suffix: string;
  label: string;
  color: string;
  gradient: string;
}

const stats: Stat[] = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Happy Customers",
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Package,
    value: 10000,
    suffix: "+",
    label: "Products Delivered",
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "/5",
    label: "Customer Rating",
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Truck,
    value: 99,
    suffix: "%",
    label: "On-Time Delivery",
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
];

function AnimatedNumber({
  value,
  suffix,
  isDecimal = false,
}: {
  value: number;
  suffix: string;
  isDecimal?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (isDecimal) {
        setDisplayValue(latest.toFixed(1));
      } else if (latest >= 1000) {
        setDisplayValue(
          Math.floor(latest / 1000) + "," + String(Math.floor(latest) % 1000).padStart(3, "0")
        );
      } else {
        setDisplayValue(Math.floor(latest).toString());
      }
    });

    return unsubscribe;
  }, [springValue, isDecimal]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export function Stats3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={containerRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Thousands
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our growing community of satisfied customers worldwide
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.02,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
                className="group relative"
              >
                {/* Glow effect */}
                <div
                  className={cn(
                    "absolute -inset-1 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-br",
                    stat.gradient
                  )}
                />

                {/* Card */}
                <div className="relative bg-gradient-to-br from-background via-background to-muted/50 rounded-2xl border border-border/50 p-8 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {/* Icon with 3D float */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br shadow-lg",
                      stat.gradient
                    )}
                    style={{
                      transform: "translateZ(20px)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>

                  {/* Value with counter */}
                  <div
                    className={cn(
                      "text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r bg-clip-text text-transparent",
                      stat.gradient
                    )}
                  >
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      isDecimal={stat.value < 10}
                    />
                  </div>

                  {/* Label */}
                  <p className="text-muted-foreground font-medium">{stat.label}</p>

                  {/* Decorative line */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                      stat.gradient
                    )}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

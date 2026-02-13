"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Truck,
  Shield,
  CreditCard,
  Headphones,
  RotateCcw,
  Award,
  Zap,
  Gift,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $50. Fast delivery worldwide.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "Your payment information is encrypted and 100% secure.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns. No questions asked.",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round the clock customer support via chat, email & phone.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Award,
    title: "Genuine Products",
    description: "100% authentic products with manufacturer warranty.",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options including EMI & Buy Now Pay Later.",
    color: "from-indigo-500 to-violet-500",
    bgColor: "bg-indigo-500/10",
  },
  {
    icon: Zap,
    title: "Fast Processing",
    description: "Orders processed within 24 hours of confirmation.",
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-500/10",
  },
  {
    icon: Gift,
    title: "Gift Wrapping",
    description: "Complimentary gift wrapping for all orders.",
    color: "from-teal-500 to-cyan-500",
    bgColor: "bg-teal-500/10",
  },
];

export function Features3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

      {/* Floating decorations */}
      <motion.div
        style={{ y: springY }}
        className="absolute top-20 left-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 blur-2xl"
      />
      <motion.div
        style={{ y: useSpring(useTransform(scrollYProgress, [0, 1], [-50, 50]), { stiffness: 100, damping: 30 }) }}
        className="absolute bottom-20 right-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-pink-500/10 to-orange-500/10 blur-2xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
          >
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Why Choose Us</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Shop with{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Confidence
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're committed to providing you the best shopping experience with our customer-first approach.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
              }}
              style={{ perspective: 1000, transformStyle: "preserve-3d" }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={cn(
                "absolute -inset-0.5 rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300",
                `bg-gradient-to-r ${feature.color}`
              )} />

              {/* Card */}
              <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-background/95 to-muted/50 border border-border/50 shadow-lg overflow-hidden">
                {/* Top gradient line */}
                <div className={cn(
                  "absolute top-0 left-0 right-0 h-1 opacity-80",
                  `bg-gradient-to-r ${feature.color}`
                )} />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                    feature.bgColor
                  )}
                >
                  <feature.icon className={cn(
                    "h-7 w-7 bg-gradient-to-r bg-clip-text",
                    feature.color
                  )} style={{
                    color: 'transparent',
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                  }} />
                  <feature.icon className={cn(
                    "h-7 w-7 absolute",
                    feature.color.replace('from-', 'text-').split(' ')[0]
                  )} />
                </motion.div>

                {/* Content */}
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-20 h-20 opacity-5">
                  <feature.icon className="w-full h-full" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-wrap justify-center gap-8 p-6 rounded-2xl bg-gradient-to-r from-muted/50 via-background to-muted/50 border border-border/50">
            {[
              { value: "2M+", label: "Happy Customers" },
              { value: "50K+", label: "Products Sold" },
              { value: "99%", label: "Positive Reviews" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="text-center px-4"
              >
                <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

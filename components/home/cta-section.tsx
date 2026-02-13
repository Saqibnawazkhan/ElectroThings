"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Gift, ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springRotate = useSpring(rotate, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          style={{ y: springY, rotate: springRotate, scale: springScale }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl"
          >
            {/* Main gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-pink-600" />

            {/* Animated mesh gradient */}
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                backgroundSize: "200% 200%",
              }}
            />

            {/* 3D floating elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 right-20 hidden lg:block"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Zap className="h-8 w-8 text-yellow-300" />
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-10 left-20 hidden lg:block"
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Star className="h-6 w-6 text-yellow-300 fill-yellow-300" />
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-1/2 right-40 hidden xl:block"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </motion.div>

            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: 1,
                }}
                className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
              />
            </div>

            {/* Content */}
            <div className="relative p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-start gap-6 text-white">
                {/* 3D Gift icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative flex-shrink-0"
                >
                  <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl border border-white/20">
                    <Gift className="h-10 w-10" />
                  </div>
                  {/* Glow effect */}
                  <div className="absolute -inset-2 bg-white/20 rounded-3xl blur-xl -z-10" />
                </motion.div>

                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 mb-3"
                  >
                    <Sparkles className="h-4 w-4 text-yellow-300" />
                    <span className="text-sm font-medium text-white/80 uppercase tracking-wider">
                      Limited Time Offer
                    </span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl lg:text-5xl font-bold mb-4"
                  >
                    Get{" "}
                    <span className="relative">
                      <span className="relative z-10">10% Off</span>
                      <motion.span
                        animate={{ scaleX: [0, 1] }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute bottom-2 left-0 w-full h-3 bg-yellow-400/30 -z-0 origin-left"
                      />
                    </span>{" "}
                    Your First Order
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-white/80 max-w-lg text-lg"
                  >
                    Sign up for our newsletter and receive exclusive offers,
                    early access to sales, and personalized product recommendations.
                  </motion.p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register">
                  <Button
                    size="lg"
                    className="relative bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-white/25 transition-all duration-300 text-lg px-8 py-6 rounded-2xl font-semibold overflow-hidden group"
                  >
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Sign Up Now
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

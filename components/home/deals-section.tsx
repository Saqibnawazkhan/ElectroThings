"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flame, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface DealsSectionProps {
  products: Product[];
}

function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center gap-2">
      {Object.entries(timeLeft).map(([key, value], index) => (
        <div key={key} className="flex items-center">
          <motion.div
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-lg px-3 py-2 min-w-[3rem] text-center shadow-lg">
              <span className="text-2xl font-bold tabular-nums">
                {String(value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs text-muted-foreground mt-1 capitalize">{key}</span>
          </motion.div>
          {index < 2 && <span className="text-2xl font-bold mx-1 text-muted-foreground">:</span>}
        </div>
      ))}
    </div>
  );
}

export function DealsSection({ products }: DealsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dealProducts = products.filter((p) => p.originalPrice).slice(0, 5);
  const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

  // Auto-rotate deals
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % dealProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [dealProducts.length]);

  const activeDeal = dealProducts[activeIndex];
  if (!activeDeal) return null;

  const discount = Math.round(
    ((activeDeal.originalPrice! - activeDeal.price) / activeDeal.originalPrice!) * 100
  );

  return (
    <section className="py-20 overflow-hidden bg-gradient-to-b from-background via-red-500/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full mb-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Flame className="h-5 w-5 text-red-500" />
            </motion.div>
            <span className="font-semibold text-red-500">Flash Sale</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Deal of the Day
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-6">
            Limited time offers you won&apos;t want to miss
          </p>

          {/* Countdown */}
          <div className="flex justify-center items-center gap-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">Ends in:</span>
            <CountdownTimer endTime={endTime} />
          </div>
        </motion.div>

        {/* Main deal showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square"
                style={{ perspective: 1000 }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-500/30 via-orange-500/30 to-yellow-500/30 rounded-3xl blur-2xl opacity-60" />

                {/* Image container */}
                <div className="relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted border border-border/50 shadow-2xl">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={activeDeal.images[0] || "/images/placeholder.svg"}
                      alt={activeDeal.name}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>

                  {/* Discount badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute top-4 left-4"
                  >
                    <Badge className="bg-gradient-to-r from-red-500 to-orange-500 border-0 text-xl px-4 py-2 shadow-lg">
                      <Zap className="h-4 w-4 mr-1 fill-current" />
                      {discount}% OFF
                    </Badge>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Product details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-primary font-medium uppercase tracking-wider mb-2">
                    {activeDeal.category}
                  </p>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                    {activeDeal.name}
                  </h3>
                  <p className="text-muted-foreground text-lg line-clamp-3">
                    {activeDeal.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                    ${activeDeal.price}
                  </span>
                  <span className="text-2xl text-muted-foreground line-through">
                    ${activeDeal.originalPrice}
                  </span>
                  <Badge variant="secondary" className="text-green-600">
                    Save ${activeDeal.originalPrice! - activeDeal.price}
                  </Badge>
                </div>

                {/* Stock indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Available: {activeDeal.stock} units</span>
                    <span className="text-red-500 font-medium">Selling fast!</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100 - activeDeal.stock, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                    />
                  </div>
                </div>

                {/* CTA */}
                <Link href={`/products/${activeDeal.slug}`}>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-lg text-lg px-8 py-6"
                    >
                      <Zap className="mr-2 h-5 w-5 fill-current" />
                      Grab This Deal
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* Deal selector */}
            <div className="flex gap-2 pt-4">
              {dealProducts.map((product, index) => (
                <motion.button
                  key={product.id}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all",
                    index === activeIndex
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Image
                    src={product.images[0] || "/images/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

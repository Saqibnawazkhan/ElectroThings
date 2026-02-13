"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Simple hero section
export function HeroSection({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  image,
  badge,
  className,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: { text: string; href: string };
  secondaryCta?: { text: string; href: string };
  image?: string;
  badge?: string;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <Sparkles className="h-4 w-4" />
                {badge}
              </motion.div>
            )}

            {subtitle && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-primary font-medium mb-4"
              >
                {subtitle}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              {title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className={cn(
                    "inline-block mr-3",
                    i % 3 === 1 && "bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                  )}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-muted-foreground mb-8 max-w-xl"
              >
                {description}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              {primaryCta && (
                <Link href={primaryCta.href}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg shadow-primary/30 flex items-center gap-2"
                  >
                    {primaryCta.text}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.span>
                  </motion.button>
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl border-2 border-border hover:border-primary font-semibold flex items-center gap-2 transition-colors"
                  >
                    {secondaryCta.text}
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Image */}
          {image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden">
                <Image
                  src={image}
                  alt="Hero"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-xl flex items-center justify-center"
              >
                <Sparkles className="h-10 w-10 text-white" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

// Hero with video background
export function HeroVideo({
  title,
  description,
  videoSrc,
  posterSrc,
  cta,
  className,
}: {
  title: string;
  description?: string;
  videoSrc?: string;
  posterSrc?: string;
  cta?: { text: string; href: string };
  className?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section className={cn("relative h-screen min-h-[600px] overflow-hidden", className)}>
      {/* Video background */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={posterSrc}
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : posterSrc ? (
          <Image src={posterSrc} alt="Hero" fill className="object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black" />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/80 mb-8 max-w-2xl"
          >
            {description}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href={cta.href}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg flex items-center gap-3"
              >
                <Play className="h-5 w-5" />
                {cta.text}
              </motion.button>
            </Link>
          </motion.div>
        )}

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, y: { duration: 1.5, repeat: Infinity } }}
          className="absolute bottom-10"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Hero slider/carousel
export function HeroSlider({
  slides,
  autoPlayInterval = 5000,
  className,
}: {
  slides: {
    title: string;
    description?: string;
    image: string;
    cta?: { text: string; href: string };
  }[];
  autoPlayInterval?: number;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  return (
    <section className={cn("relative h-[80vh] min-h-[500px] overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 container mx-auto px-4 flex items-center">
            <div className="max-w-2xl text-white">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {slides[currentIndex].title}
              </motion.h2>
              {slides[currentIndex].description && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-white/80 mb-6"
                >
                  {slides[currentIndex].description}
                </motion.p>
              )}
              {slides[currentIndex].cta && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link href={slides[currentIndex].cta!.href}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 rounded-xl bg-white text-black font-semibold flex items-center gap-2"
                    >
                      {slides[currentIndex].cta!.text}
                      <ArrowRight className="h-5 w-5" />
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              currentIndex === index ? "bg-white w-8" : "bg-white/50"
            )}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
          className="h-full bg-white"
        />
      </div>
    </section>
  );
}

// Split hero
export function HeroSplit({
  leftContent,
  rightContent,
  className,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("min-h-screen flex flex-col lg:flex-row", className)}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-background"
      >
        {leftContent}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-primary to-purple-600 text-white"
      >
        {rightContent}
      </motion.div>
    </section>
  );
}

// Minimal hero
export function HeroMinimal({
  title,
  subtitle,
  cta,
  className,
}: {
  title: string;
  subtitle?: string;
  cta?: { text: string; href: string };
  className?: string;
}) {
  return (
    <section className={cn("py-32 md:py-48 text-center", className)}>
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            {subtitle}
          </motion.p>
        )}
        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link href={cta.href}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-foreground text-background font-semibold inline-flex items-center gap-2"
              >
                {cta.text}
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

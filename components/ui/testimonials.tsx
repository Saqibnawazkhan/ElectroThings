"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

// Simple testimonial card
export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative p-6 bg-background rounded-2xl border border-border/50 shadow-sm",
        className
      )}
    >
      {/* Quote icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, type: "spring" }}
        className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center"
      >
        <Quote className="h-5 w-5 text-white" />
      </motion.div>

      {/* Rating */}
      {testimonial.rating && (
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Star
                className={cn(
                  "h-4 w-4",
                  i < testimonial.rating!
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                )}
              />
            </motion.div>
          ))}
        </div>
      )}

      {/* Content */}
      <p className="text-muted-foreground mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>

      {/* Author */}
      <div className="flex items-center gap-4">
        {testimonial.avatar ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
        )}
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-sm text-muted-foreground">
              {testimonial.role}
              {testimonial.role && testimonial.company && " at "}
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Testimonial grid
export function TestimonialGrid({
  testimonials,
  columns = 3,
  className,
}: {
  testimonials: Testimonial[];
  columns?: 2 | 3;
  className?: string;
}) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={cn("grid grid-cols-1 gap-6", gridCols, className)}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <TestimonialCard testimonial={testimonial} />
        </motion.div>
      ))}
    </div>
  );
}

// Testimonial carousel
export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className,
}: {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, testimonials.length]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className={cn("relative", className)}>
      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-center px-4 md:px-12"
        >
          {/* Large quote */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center"
          >
            <Quote className="h-8 w-8 text-white" />
          </motion.div>

          {/* Quote text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground italic mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            &ldquo;{testimonials[currentIndex].content}&rdquo;
          </motion.p>

          {/* Rating */}
          {testimonials[currentIndex].rating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-1 mb-6"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < testimonials[currentIndex].rating!
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </motion.div>
          )}

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            {testimonials[currentIndex].avatar ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary/20 mb-4">
                <Image
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-primary" />
              </div>
            )}
            <p className="font-bold text-lg">{testimonials[currentIndex].name}</p>
            {(testimonials[currentIndex].role || testimonials[currentIndex].company) && (
              <p className="text-muted-foreground">
                {testimonials[currentIndex].role}
                {testimonials[currentIndex].role && testimonials[currentIndex].company && " at "}
                {testimonials[currentIndex].company}
              </p>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToPrev}
          className="w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center pointer-events-auto"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToNext}
          className="w-12 h-12 rounded-full bg-background border border-border shadow-lg flex items-center justify-center pointer-events-auto"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index
                ? "bg-primary w-6"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}

// Featured testimonial
export function FeaturedTestimonial({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "relative p-8 md:p-12 rounded-3xl overflow-hidden",
        "bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5",
        "border border-border/50",
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/10 to-primary/10 rounded-full blur-3xl" />

      <div className="relative flex flex-col md:flex-row gap-8 items-center">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: 0.2 }}
          className="shrink-0"
        >
          {testimonial.avatar ? (
            <div className="relative w-32 h-32 rounded-2xl overflow-hidden ring-4 ring-primary/20">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <User className="h-16 w-16 text-white" />
            </div>
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <Quote className="h-10 w-10 text-primary/30 mx-auto md:mx-0" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl mb-6 leading-relaxed"
          >
            {testimonial.content}
          </motion.p>

          {testimonial.rating && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-1 justify-center md:justify-start mb-4"
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < testimonial.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  )}
                />
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="font-bold text-lg">{testimonial.name}</p>
            {(testimonial.role || testimonial.company) && (
              <p className="text-muted-foreground">
                {testimonial.role}
                {testimonial.role && testimonial.company && " at "}
                <span className="text-primary">{testimonial.company}</span>
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Masonry testimonials
export function TestimonialMasonry({
  testimonials,
  className,
}: {
  testimonials: Testimonial[];
  className?: string;
}) {
  return (
    <div className={cn("columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6", className)}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="break-inside-avoid"
        >
          <TestimonialCard testimonial={testimonial} />
        </motion.div>
      ))}
    </div>
  );
}

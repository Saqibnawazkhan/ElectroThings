"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tech Enthusiast",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    rating: 5,
    text: "Absolutely blown away by the quality of products! The wireless headphones I bought have incredible sound quality and the noise cancellation is top-notch. Fast shipping too!",
    product: "Wireless Pro Headphones",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    rating: 5,
    text: "Best online electronics store I've used. The prices are competitive and the customer service is exceptional. My new laptop arrived in perfect condition.",
    product: "ProBook Laptop 15",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Digital Marketer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    rating: 5,
    text: "Love the 3D product views! It really helps to see what you're buying. The smartwatch I ordered exceeded my expectations. Will definitely shop here again!",
    product: "Smart Watch Pro X",
  },
  {
    id: 4,
    name: "David Park",
    role: "Gaming Streamer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    rating: 5,
    text: "As a professional streamer, I need reliable gear. ElectroThings delivers every time. The gaming keyboard I bought has perfect response time and RGB lighting.",
    product: "RGB Mechanical Keyboard",
  },
  {
    id: 5,
    name: "Jessica Williams",
    role: "Photographer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    rating: 5,
    text: "The camera accessories I bought here are professional quality at amazing prices. Fast delivery and excellent packaging. Highly recommend!",
    product: "Camera Lens Kit Pro",
  },
];

export function Testimonials3D() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        duration: 0.4,
        ease: "easeIn" as const,
      },
    }),
  };

  return (
    <section className="py-24 overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Customer Love</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our{" "}
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our happy customers have to say about their experience.
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative max-w-4xl mx-auto" style={{ perspective: 1200 }}>
          {/* Background decorations */}
          <div className="absolute -inset-10 bg-gradient-to-r from-primary/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl" />

          {/* Main card */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformStyle: "preserve-3d" }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-background via-background to-muted/50 rounded-3xl p-8 md:p-12 border border-border/50 shadow-2xl">
                {/* Quote icon */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg"
                >
                  <Quote className="h-8 w-8 text-white fill-current" />
                </motion.div>

                {/* Content */}
                <div className="pt-4">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                      >
                        <Star
                          className={cn(
                            "h-6 w-6",
                            i < activeTestimonial.rating
                              ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
                              : "fill-muted text-muted"
                          )}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial text */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-2xl leading-relaxed mb-8 text-foreground/90"
                  >
                    "{activeTestimonial.text}"
                  </motion.p>

                  {/* Product badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
                  >
                    <span className="text-sm text-muted-foreground">Purchased:</span>
                    <span className="text-sm font-semibold text-primary">
                      {activeTestimonial.product}
                    </span>
                  </motion.div>

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="relative w-16 h-16 rounded-2xl overflow-hidden ring-4 ring-primary/20"
                    >
                      <Image
                        src={activeTestimonial.avatar}
                        alt={activeTestimonial.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                    <div>
                      <h4 className="font-bold text-lg">{activeTestimonial.name}</h4>
                      <p className="text-muted-foreground">{activeTestimonial.role}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full w-12 h-12 border-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "bg-gradient-to-r from-primary to-purple-500 w-8"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full w-12 h-12 border-2"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "4.9", label: "Average Rating" },
            { value: "99%", label: "Satisfaction Rate" },
            { value: "24/7", label: "Customer Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50"
            >
              <motion.p
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring" }}
                className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

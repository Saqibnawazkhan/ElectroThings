"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, X, Gift, Truck, Sparkles, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Announcement bar at top of page
interface AnnouncementBarProps {
  messages: { text: string; link?: string }[];
  className?: string;
}

export function AnnouncementBar({ messages, className }: AnnouncementBarProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  if (!isVisible) return null;

  const currentMessage = messages[currentIndex];

  return (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className={cn(
        "relative bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white py-2.5 px-4 overflow-hidden",
        className
      )}
    >
      {/* Animated shine */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      />

      <div className="container mx-auto flex items-center justify-center gap-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" />
            <span>{currentMessage.text}</span>
            {currentMessage.link && (
              <Link
                href={currentMessage.link}
                className="underline underline-offset-2 hover:no-underline ml-1"
              >
                Shop Now
                <ArrowRight className="inline h-3 w-3 ml-1" />
              </Link>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

// Hero promotional banner
interface HeroBannerProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
  badge?: string;
  className?: string;
}

export function HeroBanner({
  title,
  subtitle,
  ctaText,
  ctaLink,
  image,
  badge,
  className,
}: HeroBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-purple-600/90 text-white",
        className
      )}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%)] bg-[length:20px_20px]" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
        <div className="flex-1 space-y-4">
          {badge && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm font-semibold"
            >
              <Gift className="h-4 w-4" />
              {badge}
            </motion.span>
          )}

          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-md"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href={ctaLink}>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-lg"
              >
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.2 }}
            className="relative w-64 h-64 md:w-80 md:h-80"
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain drop-shadow-2xl"
            />
          </motion.div>
        )}
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
      />
    </motion.div>
  );
}

// Split promotional banners (side by side)
interface SplitBannersProps {
  banners: Array<{
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    icon: React.ReactNode;
    gradient: string;
  }>;
  className?: string;
}

export function SplitBanners({ banners, className }: SplitBannersProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-6", className)}>
      {banners.map((banner, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02, y: -5 }}
          className={cn(
            "relative overflow-hidden rounded-2xl p-6 md:p-8 text-white",
            banner.gradient
          )}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -right-20 -top-20 w-60 h-60 border-[30px] border-white rounded-full"
            />
          </div>

          <div className="relative z-10 space-y-4">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center"
            >
              {banner.icon}
            </motion.div>

            <h3 className="text-2xl font-bold">{banner.title}</h3>
            <p className="text-white/80">{banner.subtitle}</p>

            <Link href={banner.ctaLink}>
              <Button
                variant="secondary"
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                {banner.ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Flash sale countdown banner
interface FlashSaleBannerProps {
  endTime: Date;
  title?: string;
  className?: string;
}

export function FlashSaleBanner({
  endTime,
  title = "Flash Sale Ends In",
  className,
}: FlashSaleBannerProps) {
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-6 text-white text-center",
        className
      )}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Zap className="h-6 w-6 fill-current" />
          <span className="text-xl font-bold">{title}</span>
          <Zap className="h-6 w-6 fill-current" />
        </motion.div>

        <div className="flex justify-center gap-4">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="text-center">
              <motion.div
                key={value}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white text-red-500 rounded-xl px-4 py-3 min-w-[4rem] shadow-lg"
              >
                <span className="text-3xl font-bold tabular-nums">
                  {String(value).padStart(2, "0")}
                </span>
              </motion.div>
              <p className="text-sm mt-1 capitalize">{key}</p>
            </div>
          ))}
        </div>

        <Link href="/products?sale=true" className="inline-block mt-4">
          <Button className="bg-white text-red-500 hover:bg-white/90 shadow-lg">
            Shop Flash Sale
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// Free shipping banner
export function FreeShippingBanner({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white",
        className
      )}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Truck className="h-10 w-10" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold">Free Shipping</h3>
            <p className="text-white/80">On all orders over $50</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Same-day dispatch</span>
          </div>
          <Link href="/shipping">
            <Button variant="secondary" className="bg-white text-emerald-600 hover:bg-white/90">
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// Mobile app download banner
export function AppDownloadBanner({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-12",
        className
      )}
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/30 to-orange-500/30 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm">
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </span>

          <h2 className="text-3xl md:text-4xl font-bold">
            Shop on the Go with Our Mobile App
          </h2>
          <p className="text-white/70">
            Get exclusive app-only deals, instant notifications, and a seamless shopping experience.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-5 py-3 bg-white text-slate-900 rounded-xl font-semibold"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <div className="text-left">
                <p className="text-xs">Download on the</p>
                <p className="text-sm font-bold">App Store</p>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-5 py-3 bg-white/10 text-white rounded-xl font-semibold border border-white/20"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
              </svg>
              <div className="text-left">
                <p className="text-xs">Get it on</p>
                <p className="text-sm font-bold">Google Play</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Phone mockup placeholder */}
        <div className="relative w-48 h-80 bg-gradient-to-br from-slate-700 to-slate-800 rounded-[3rem] border-4 border-slate-700 shadow-2xl flex items-center justify-center">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-900 rounded-full" />
          <span className="text-white/30 text-sm">App Preview</span>
        </div>
      </div>
    </motion.div>
  );
}

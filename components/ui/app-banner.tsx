"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Apple, PlayCircle, Star, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if on mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Check if banner was dismissed
    const dismissed = localStorage.getItem("app-banner-dismissed");
    if (!dismissed && window.innerWidth < 768) {
      // Show banner after 3 seconds on mobile
      const timer = setTimeout(() => setIsVisible(true), 3000);
      return () => clearTimeout(timer);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("app-banner-dismissed", "true");
  };

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground safe-area-inset-bottom"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shrink-0"
            >
              <Smartphone className="h-8 w-8 text-primary" />
            </motion.div>

            <div className="flex-1">
              <h3 className="font-semibold">Get the App</h3>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <Star className="h-3 w-3 fill-current" />
                <span>4.9 rating • 10K+ downloads</span>
              </div>
              <p className="text-xs opacity-75">
                Shop faster, track orders & get exclusive deals
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-white text-primary hover:bg-white/90"
            >
              <Apple className="mr-1 h-4 w-4" />
              iOS
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="flex-1 bg-white text-primary hover:bg-white/90"
            >
              <PlayCircle className="mr-1 h-4 w-4" />
              Android
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Desktop promotional banner
export function PromotionalBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-2 px-4"
    >
      <div className="container mx-auto flex items-center justify-center gap-4 text-sm">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎉
        </motion.div>
        <p>
          <span className="font-semibold">New Year Sale!</span> Get up to 50% off
          on selected items.{" "}
          <a href="/products" className="underline hover:no-underline">
            Shop Now
          </a>
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-auto hover:bg-white/20 p-1 rounded transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

// Download App CTA for footer
export function DownloadAppCTA() {
  return (
    <div className="bg-muted/50 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Download className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold mb-1">Download Our App</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get exclusive app-only deals and track your orders on the go.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Apple className="mr-2 h-4 w-4" />
              App Store
            </Button>
            <Button size="sm" variant="outline">
              <PlayCircle className="mr-2 h-4 w-4" />
              Play Store
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

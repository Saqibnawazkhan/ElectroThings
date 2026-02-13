"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Mail, Sparkles, Send, Check, ArrowRight, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function Newsletter3D() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Successfully subscribed! Check your inbox for exclusive offers.");
    setEmail("");
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const benefits = [
    { icon: Zap, text: "Early access to deals" },
    { icon: Sparkles, text: "Exclusive discounts" },
    { icon: Send, text: "New product alerts" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 relative overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[10%] w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-500/30 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-[15%] w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/30 to-orange-500/30 blur-xl"
      />
      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-[5%] w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 blur-lg"
      />

      <motion.div
        style={{
          y: springY,
          rotateX: springRotateX,
          scale: springScale,
          transformStyle: "preserve-3d",
        }}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          {/* 3D Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 rounded-[2rem] blur-2xl opacity-60" />

            {/* Main card */}
            <div className="relative bg-gradient-to-br from-background/95 via-background/90 to-muted/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-border/50 shadow-2xl overflow-hidden">
              {/* Inner decorations */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-pink-500" />

              {/* Floating mail icons */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-8 right-8 opacity-10"
              >
                <Mail className="w-32 h-32" />
              </motion.div>

              <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
                  >
                    <Mail className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Newsletter</span>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  >
                    Stay in the{" "}
                    <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                      Loop
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground text-lg max-w-xl mx-auto"
                  >
                    Subscribe to our newsletter and never miss out on exclusive deals, new products, and tech tips.
                  </motion.p>
                </div>

                {/* Benefits */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-wrap justify-center gap-4 mb-10"
                >
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.text}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border/50"
                    >
                      <benefit.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{benefit.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="max-w-md mx-auto"
                >
                  <div className="relative">
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isSubmitting}
                          className={cn(
                            "h-14 pl-5 pr-12 rounded-xl text-lg transition-all duration-300",
                            "bg-background/50 border-2 border-border/50",
                            "focus:border-primary focus:ring-4 focus:ring-primary/20",
                            isSuccess && "border-green-500"
                          )}
                        />
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting || isSuccess}
                          className={cn(
                            "h-14 px-8 rounded-xl text-lg font-semibold transition-all duration-300",
                            "bg-gradient-to-r from-primary to-purple-600",
                            "hover:from-primary/90 hover:to-purple-600/90",
                            "shadow-lg hover:shadow-xl hover:shadow-primary/25",
                            isSuccess && "bg-green-500 hover:bg-green-500"
                          )}
                        >
                          {isSubmitting ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Send className="h-5 w-5" />
                            </motion.div>
                          ) : isSuccess ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              <Check className="h-5 w-5" />
                            </motion.div>
                          ) : (
                            <>
                              Subscribe
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </div>

                    {/* Success message */}
                    {isSuccess && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-500 text-sm mt-3 text-center"
                      >
                        Thanks for subscribing! Check your inbox soon.
                      </motion.p>
                    )}
                  </div>
                </motion.form>

                {/* Trust badges */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-sm text-muted-foreground mt-6"
                >
                  Join <span className="font-semibold text-foreground">50,000+</span> subscribers. No spam, unsubscribe anytime.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary to-blue-600 text-primary-foreground"
        >
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <motion.div
                initial={{ rotate: -10 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center"
              >
                <Gift className="h-7 w-7" />
              </motion.div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  Get 10% Off Your First Order
                </h2>
                <p className="text-primary-foreground/80 max-w-md">
                  Sign up for our newsletter and receive exclusive offers,
                  early access to sales, and product updates.
                </p>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="whitespace-nowrap shadow-lg hover:shadow-xl transition-shadow"
                >
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

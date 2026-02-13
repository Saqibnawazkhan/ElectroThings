"use client";

import { motion } from "framer-motion";
import {
  Smartphone,
  Headphones,
  Monitor,
  Laptop,
  Watch,
  Camera,
  Gamepad2,
  Speaker,
} from "lucide-react";

const brands = [
  { name: "TechPro", icon: Smartphone },
  { name: "AudioMax", icon: Headphones },
  { name: "VisualTech", icon: Monitor },
  { name: "PowerBook", icon: Laptop },
  { name: "SmartTime", icon: Watch },
  { name: "PixelPro", icon: Camera },
  { name: "GameZone", icon: Gamepad2 },
  { name: "SoundWave", icon: Speaker },
];

export function BrandsSection() {
  return (
    <section className="py-12 border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Trusted by Leading Brands
          </p>
        </motion.div>

        {/* Infinite scroll marquee */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10" />

          {/* Scrolling container */}
          <motion.div
            animate={{
              x: [0, -50 * brands.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            className="flex gap-12"
          >
            {/* Duplicate brands for seamless loop */}
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <motion.div
                key={`${brand.name}-${index}`}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-3 shrink-0 px-6 py-4 rounded-lg bg-background border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
              >
                <brand.icon className="h-6 w-6 text-primary" />
                <span className="font-semibold text-lg">{brand.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Static grid for mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 md:hidden">
          {brands.slice(0, 4).map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-background border"
            >
              <brand.icon className="h-8 w-8 text-primary" />
              <span className="font-medium text-sm">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

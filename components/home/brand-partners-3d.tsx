"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const brands = [
  { name: "Apple", logo: "🍎" },
  { name: "Samsung", logo: "📱" },
  { name: "Sony", logo: "🎧" },
  { name: "Microsoft", logo: "💻" },
  { name: "Google", logo: "🔍" },
  { name: "LG", logo: "📺" },
  { name: "Dell", logo: "🖥️" },
  { name: "HP", logo: "⌨️" },
  { name: "Lenovo", logo: "💼" },
  { name: "ASUS", logo: "🎮" },
  { name: "Bose", logo: "🔊" },
  { name: "JBL", logo: "🎵" },
];

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

function Marquee({ children, direction = "left", speed = 40, className }: MarqueeProps) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : 0 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex shrink-0 gap-8"
      >
        {children}
      </motion.div>
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-100%" }}
        animate={{ x: direction === "left" ? "-100%" : 0 }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex shrink-0 gap-8"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function BrandPartners3D() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-background via-muted/30 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container mx-auto px-4 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
            Trusted Partners
          </p>
          <h2 className="text-2xl md:text-3xl font-bold">
            Authorized Dealer for{" "}
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Top Brands
            </span>
          </h2>
        </motion.div>
      </div>

      {/* First marquee row */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <Marquee direction="left" speed={35}>
          {brands.map((brand, index) => (
            <motion.div
              key={`${brand.name}-1-${index}`}
              whileHover={{
                scale: 1.1,
                rotateY: 15,
                z: 50,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="group"
            >
              <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-background/80 to-muted/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <motion.span
                  className="text-4xl"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {brand.logo}
                </motion.span>
                <span className="font-bold text-lg whitespace-nowrap group-hover:text-primary transition-colors">
                  {brand.name}
                </span>
              </div>
            </motion.div>
          ))}
        </Marquee>
      </div>

      {/* Second marquee row (reversed) */}
      <div className="relative mt-6">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <Marquee direction="right" speed={45}>
          {[...brands].reverse().map((brand, index) => (
            <motion.div
              key={`${brand.name}-2-${index}`}
              whileHover={{
                scale: 1.1,
                rotateY: -15,
                z: 50,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="group"
            >
              <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-br from-muted/50 to-background/80 backdrop-blur-sm border border-border/50 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-xl">
                <motion.span
                  className="text-4xl"
                  whileHover={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  {brand.logo}
                </motion.span>
                <span className="font-bold text-lg whitespace-nowrap group-hover:text-purple-500 transition-colors">
                  {brand.name}
                </span>
              </div>
            </motion.div>
          ))}
        </Marquee>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-4 mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "100+", label: "Brand Partners" },
            { value: "50K+", label: "Products Listed" },
            { value: "15+", label: "Years Experience" },
            { value: "100%", label: "Authentic Products" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-background/50 to-muted/30 border border-border/50"
            >
              <motion.p
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
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

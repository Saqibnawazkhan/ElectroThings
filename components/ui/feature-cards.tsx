"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
}

// Simple feature card
export function FeatureCard({
  feature,
  index = 0,
  className,
}: {
  feature: Feature;
  index?: number;
  className?: string;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group p-6 rounded-2xl bg-background border border-border/50 transition-shadow hover:shadow-xl",
        className
      )}
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        className={cn(
          "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
          feature.color || "bg-primary/10"
        )}
      >
        <Icon className={cn("h-7 w-7", feature.color ? "text-white" : "text-primary")} />
      </motion.div>

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

// Feature card with hover reveal
export function FeatureCardReveal({
  feature,
  index = 0,
  className,
}: {
  feature: Feature & { details?: string[] };
  index?: number;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-6 rounded-2xl bg-background border border-border/50 overflow-hidden h-full",
        className
      )}
    >
      {/* Normal state */}
      <motion.div
        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? -20 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
            feature.color || "bg-gradient-to-br from-primary to-purple-600"
          )}
        >
          <Icon className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
        <p className="text-muted-foreground text-sm">{feature.description}</p>
      </motion.div>

      {/* Hover state */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 p-6 bg-gradient-to-br from-primary to-purple-600 text-white flex flex-col"
      >
        <Icon className="h-8 w-8 mb-4" />
        <h3 className="text-lg font-bold mb-4">{feature.title}</h3>
        {feature.details && (
          <ul className="space-y-2 flex-1">
            {feature.details.map((detail, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-2 text-sm"
              >
                <Check className="h-4 w-4" />
                {detail}
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  );
}

// Feature card with icon animation
export function FeatureCardAnimated({
  feature,
  index = 0,
  className,
}: {
  feature: Feature;
  index?: number;
  className?: string;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover="hover"
      className={cn(
        "group relative p-8 rounded-2xl bg-background border border-border/50 text-center",
        className
      )}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5"
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: 1 },
        }}
      />

      {/* Icon with pulse */}
      <motion.div
        className={cn(
          "relative w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center",
          feature.color || "bg-gradient-to-br from-primary to-purple-600"
        )}
        variants={{
          hover: { scale: 1.1, rotate: 5 },
        }}
      >
        <Icon className="h-10 w-10 text-white" />

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-primary/30"
          variants={{
            hover: {
              scale: [1, 1.4, 1.4],
              opacity: [0.5, 0, 0],
            },
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>

      {/* Title */}
      <h3 className="relative text-xl font-bold mb-3">{feature.title}</h3>

      {/* Description */}
      <p className="relative text-muted-foreground">{feature.description}</p>

      {/* Learn more link */}
      <motion.div
        className="relative mt-4 flex items-center justify-center gap-2 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        variants={{
          hover: { x: 5 },
        }}
      >
        Learn more <ArrowRight className="h-4 w-4" />
      </motion.div>
    </motion.div>
  );
}

// Feature grid
export function FeatureGrid({
  features,
  columns = 3,
  variant = "default",
  className,
}: {
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "default" | "reveal" | "animated";
  className?: string;
}) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  const CardComponent =
    variant === "reveal"
      ? FeatureCardReveal
      : variant === "animated"
      ? FeatureCardAnimated
      : FeatureCard;

  return (
    <div className={cn("grid grid-cols-1 gap-6", gridCols[columns], className)}>
      {features.map((feature, index) => (
        <CardComponent key={index} feature={feature as any} index={index} />
      ))}
    </div>
  );
}

// Horizontal feature card
export function FeatureCardHorizontal({
  feature,
  index = 0,
  className,
}: {
  feature: Feature;
  index?: number;
  className?: string;
}) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ x: 5 }}
      className={cn(
        "flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors",
        className
      )}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 10 }}
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
          feature.color || "bg-primary/10"
        )}
      >
        <Icon className={cn("h-6 w-6", feature.color ? "text-white" : "text-primary")} />
      </motion.div>
      <div>
        <h3 className="font-semibold mb-1">{feature.title}</h3>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
      </div>
    </motion.div>
  );
}

// Feature comparison card
export function FeatureComparison({
  title,
  features,
  highlighted = false,
  className,
}: {
  title: string;
  features: { name: string; included: boolean }[];
  highlighted?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative p-6 rounded-2xl border overflow-hidden",
        highlighted
          ? "bg-gradient-to-br from-primary to-purple-600 text-white border-transparent"
          : "bg-background border-border/50",
        className
      )}
    >
      {highlighted && (
        <motion.div
          className="absolute top-0 right-0 px-4 py-1 text-xs font-bold bg-yellow-400 text-yellow-900"
          initial={{ x: 20, rotate: 45 }}
          animate={{ x: 0, rotate: 0 }}
        >
          POPULAR
        </motion.div>
      )}

      <h3 className="text-xl font-bold mb-6">{title}</h3>

      <ul className="space-y-3">
        {features.map((feature, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex items-center gap-3 text-sm",
              !feature.included && !highlighted && "text-muted-foreground line-through"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center",
                feature.included
                  ? highlighted
                    ? "bg-white text-primary"
                    : "bg-green-500 text-white"
                  : "bg-muted"
              )}
            >
              {feature.included && <Check className="h-3 w-3" />}
            </div>
            {feature.name}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

// Feature stats card
export function FeatureStats({
  stats,
  className,
}: {
  stats: { value: string; label: string; icon?: LucideIcon }[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-6", className)}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-border/50"
          >
            {Icon && (
              <motion.div
                whileHover={{ rotate: 10 }}
                className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center"
              >
                <Icon className="h-6 w-6 text-primary" />
              </motion.div>
            )}
            <motion.div
              initial={{ scale: 0.5 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </motion.div>
        );
      })}
    </div>
  );
}

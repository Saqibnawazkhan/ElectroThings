"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Sparkles, Zap, Crown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingPlan {
  name: string;
  description?: string;
  price: number | string;
  period?: string;
  features: { name: string; included: boolean }[];
  highlighted?: boolean;
  badge?: string;
  icon?: React.ReactNode;
  ctaText?: string;
  onSelect?: () => void;
}

// Standard pricing card
export function PricingCard({
  plan,
  index = 0,
  className,
}: {
  plan: PricingPlan;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "relative p-8 rounded-2xl border overflow-hidden",
        plan.highlighted
          ? "bg-gradient-to-br from-primary to-purple-600 text-white border-transparent shadow-2xl shadow-primary/30"
          : "bg-background border-border/50",
        className
      )}
    >
      {/* Badge */}
      {plan.badge && (
        <motion.div
          initial={{ x: 100, rotate: 45 }}
          animate={{ x: 0, rotate: 0 }}
          className={cn(
            "absolute -top-1 -right-1 px-8 py-1 text-xs font-bold",
            plan.highlighted
              ? "bg-yellow-400 text-yellow-900"
              : "bg-primary text-white"
          )}
          style={{ transformOrigin: "top right" }}
        >
          {plan.badge}
        </motion.div>
      )}

      {/* Icon */}
      {plan.icon && (
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-6",
            plan.highlighted ? "bg-white/20" : "bg-primary/10"
          )}
        >
          {plan.icon}
        </motion.div>
      )}

      {/* Name & Description */}
      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
      {plan.description && (
        <p className={cn("text-sm mb-6", plan.highlighted ? "text-white/80" : "text-muted-foreground")}>
          {plan.description}
        </p>
      )}

      {/* Price */}
      <div className="mb-6">
        <motion.div
          initial={{ scale: 0.5 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          className="flex items-baseline gap-1"
        >
          {typeof plan.price === "number" ? (
            <>
              <span className="text-4xl font-bold">${plan.price}</span>
              {plan.period && (
                <span className={plan.highlighted ? "text-white/60" : "text-muted-foreground"}>
                  /{plan.period}
                </span>
              )}
            </>
          ) : (
            <span className="text-4xl font-bold">{plan.price}</span>
          )}
        </motion.div>
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className={cn(
              "flex items-center gap-3 text-sm",
              !feature.included && (plan.highlighted ? "text-white/40" : "text-muted-foreground/50")
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                feature.included
                  ? plan.highlighted
                    ? "bg-white text-primary"
                    : "bg-green-500 text-white"
                  : plan.highlighted
                  ? "bg-white/20"
                  : "bg-muted"
              )}
            >
              {feature.included ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
            </div>
            <span className={!feature.included ? "line-through" : ""}>{feature.name}</span>
          </motion.li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={plan.onSelect}
        className={cn(
          "w-full py-3 rounded-xl font-semibold transition-all",
          plan.highlighted
            ? "bg-white text-primary hover:bg-white/90"
            : "bg-primary text-white hover:bg-primary/90"
        )}
      >
        {plan.ctaText || "Get Started"}
      </motion.button>
    </motion.div>
  );
}

// Pricing toggle (monthly/yearly)
export function PricingToggle({
  isYearly,
  onToggle,
  monthlyLabel = "Monthly",
  yearlyLabel = "Yearly",
  discount,
  className,
}: {
  isYearly: boolean;
  onToggle: (isYearly: boolean) => void;
  monthlyLabel?: string;
  yearlyLabel?: string;
  discount?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <span
        className={cn("text-sm font-medium", !isYearly ? "text-foreground" : "text-muted-foreground")}
      >
        {monthlyLabel}
      </span>

      <motion.button
        onClick={() => onToggle(!isYearly)}
        className="relative w-16 h-8 rounded-full bg-muted p-1"
      >
        <motion.div
          animate={{ x: isYearly ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-6 h-6 rounded-full bg-primary shadow-sm"
        />
      </motion.button>

      <span className={cn("text-sm font-medium", isYearly ? "text-foreground" : "text-muted-foreground")}>
        {yearlyLabel}
      </span>

      {discount && isYearly && (
        <motion.span
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="px-2 py-1 text-xs font-bold rounded-full bg-green-500 text-white"
        >
          Save {discount}%
        </motion.span>
      )}
    </div>
  );
}

// Pricing grid
export function PricingGrid({
  plans,
  className,
}: {
  plans: PricingPlan[];
  className?: string;
}) {
  const gridCols =
    plans.length === 2
      ? "md:grid-cols-2 max-w-3xl"
      : plans.length === 3
      ? "md:grid-cols-3 max-w-5xl"
      : "md:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={cn("grid grid-cols-1 gap-6 mx-auto", gridCols, className)}>
      {plans.map((plan, index) => (
        <PricingCard key={index} plan={plan} index={index} />
      ))}
    </div>
  );
}

// Compact pricing card
export function PricingCardCompact({
  plan,
  className,
}: {
  plan: PricingPlan;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "p-4 rounded-xl border flex items-center justify-between gap-4",
        plan.highlighted
          ? "bg-primary/5 border-primary/30"
          : "bg-background border-border/50",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {plan.icon && (
          <div
            className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              plan.highlighted ? "bg-primary text-white" : "bg-muted"
            )}
          >
            {plan.icon}
          </div>
        )}
        <div>
          <h4 className="font-semibold">{plan.name}</h4>
          <p className="text-sm text-muted-foreground">{plan.description}</p>
        </div>
      </div>

      <div className="text-right">
        <div className="font-bold">
          {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
          {plan.period && <span className="text-sm text-muted-foreground">/{plan.period}</span>}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={plan.onSelect}
          className="mt-1 text-sm text-primary font-medium hover:underline"
        >
          Select
        </motion.button>
      </div>
    </motion.div>
  );
}

// Premium pricing card with 3D effect
export function PricingCard3D({
  plan,
  className,
}: {
  plan: PricingPlan;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        rotateY: isHovered ? 5 : 0,
        rotateX: isHovered ? -5 : 0,
      }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative", className)}
    >
      {/* Glow effect */}
      <motion.div
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-primary to-purple-600 blur-xl"
      />

      <div
        className={cn(
          "relative p-8 rounded-2xl border overflow-hidden bg-background",
          plan.highlighted && "border-primary"
        )}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5" />

        {/* Content */}
        <div className="relative">
          {plan.badge && (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-3 w-3" />
              {plan.badge}
            </div>
          )}

          <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
          {plan.description && (
            <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
          )}

          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              ${plan.price}
            </span>
            {plan.period && <span className="text-muted-foreground">/{plan.period}</span>}
          </div>

          <ul className="space-y-4 mb-8">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "flex items-center gap-3 text-sm",
                  !feature.included && "text-muted-foreground/50"
                )}
              >
                <div
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center",
                    feature.included ? "bg-green-500 text-white" : "bg-muted"
                  )}
                >
                  {feature.included ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                </div>
                {feature.name}
              </motion.li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={plan.onSelect}
            className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30"
          >
            {plan.ctaText || "Get Started"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Pricing comparison table header
export function PricingTableHeader({
  plans,
  className,
}: {
  plans: { name: string; price: number | string; period?: string; highlighted?: boolean }[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4", className)} style={{ gridTemplateColumns: `1fr repeat(${plans.length}, 150px)` }}>
      <div />
      {plans.map((plan, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cn(
            "text-center p-4 rounded-t-xl",
            plan.highlighted && "bg-primary text-white"
          )}
        >
          <h4 className="font-bold">{plan.name}</h4>
          <div className="text-2xl font-bold mt-1">
            {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
          </div>
          {plan.period && <div className="text-sm opacity-70">/{plan.period}</div>}
        </motion.div>
      ))}
    </div>
  );
}

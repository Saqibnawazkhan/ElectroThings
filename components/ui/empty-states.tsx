"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Heart,
  Package,
  AlertCircle,
  FileQuestion,
  WifiOff,
  Inbox,
  Lock,
  Clock,
  Wrench,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Frown,
  Coffee,
  Rocket,
  Ghost,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  variant?: "default" | "minimal" | "card" | "illustrated";
}

// Floating animation for icons
const floatingAnimation = {
  y: [0, -10, 0],
};

const floatingTransition = {
  duration: 3,
  repeat: Infinity as number,
  ease: "easeInOut" as const,
};

// Pulse animation for background
const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.5, 0.8, 0.5],
};

const pulseTransition = {
  duration: 2,
  repeat: Infinity as number,
  ease: "easeInOut" as const,
};

// Enhanced base component with variants
export function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className,
  variant = "default",
}: EmptyStateProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (variant === "minimal") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}
      >
        <motion.div variants={itemVariants} className="mb-4 text-muted-foreground">
          {icon}
        </motion.div>
        <motion.h3 variants={itemVariants} className="text-lg font-medium mb-1">
          {title}
        </motion.h3>
        <motion.p variants={itemVariants} className="text-sm text-muted-foreground max-w-sm">
          {description}
        </motion.p>
      </motion.div>
    );
  }

  if (variant === "card") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-border/50 bg-gradient-to-b from-muted/30 to-transparent",
          className
        )}
      >
        <motion.div
          variants={itemVariants}
          animate={floatingAnimation}
          transition={floatingTransition}
          className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6"
        >
          {icon}
        </motion.div>
        <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-2">
          {title}
        </motion.h3>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-md mb-6">
          {description}
        </motion.p>
        {action && (
          <motion.div variants={itemVariants}>
            {action.href ? (
              <Link href={action.href}>
                <Button className="gap-2">
                  {action.label}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <Button onClick={action.onClick} className="gap-2">
                {action.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        )}
      </motion.div>
    );
  }

  if (variant === "illustrated") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn("relative flex flex-col items-center justify-center py-20 px-4 text-center overflow-hidden", className)}
      >
        {/* Background decorations */}
        <motion.div
          animate={pulseAnimation}
          transition={pulseTransition}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={pulseAnimation}
          transition={{ ...pulseTransition, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl"
        />

        <motion.div
          variants={itemVariants}
          animate={floatingAnimation}
          transition={floatingTransition}
          className="relative w-32 h-32 mb-8"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-xl" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-purple-500/10 border border-border/50 flex items-center justify-center">
            {icon}
          </div>
        </motion.div>

        <motion.h3 variants={itemVariants} className="text-2xl font-bold mb-3">
          {title}
        </motion.h3>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-lg mb-8 text-lg">
          {description}
        </motion.p>
        <motion.div variants={itemVariants} className="flex gap-3">
          {action && (
            action.href ? (
              <Link href={action.href}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg shadow-primary/30 flex items-center gap-2"
                >
                  {action.label}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.onClick}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-semibold shadow-lg shadow-primary/30 flex items-center gap-2"
              >
                {action.label}
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            )
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Link href={secondaryAction.href}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 rounded-xl border-2 border-border hover:border-primary font-semibold transition-colors"
                >
                  {secondaryAction.label}
                </motion.button>
              </Link>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={secondaryAction.onClick}
                className="px-6 py-3 rounded-xl border-2 border-border hover:border-primary font-semibold transition-colors"
              >
                {secondaryAction.label}
              </motion.button>
            )
          )}
        </motion.div>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}
    >
      <motion.div
        variants={itemVariants}
        animate={floatingAnimation}
        transition={floatingTransition}
        className="relative w-24 h-24 mb-6"
      >
        <motion.div
          animate={pulseAnimation}
          transition={pulseTransition}
          className="absolute inset-0 rounded-full bg-muted"
        />
        <div className="relative w-full h-full rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </motion.div>
      <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-2">
        {title}
      </motion.h3>
      <motion.p variants={itemVariants} className="text-muted-foreground max-w-md mb-6">
        {description}
      </motion.p>
      {action && (
        <motion.div variants={itemVariants}>
          {action.href ? (
            <Link href={action.href}>
              <Button>{action.label}</Button>
            </Link>
          ) : (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Preset empty states
export function EmptyCart({ variant = "default" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<ShoppingCart className="h-12 w-12 text-muted-foreground" />}
      title="Your cart is empty"
      description="Looks like you haven't added any items to your cart yet. Start shopping to fill it up!"
      action={{ label: "Start Shopping", href: "/products" }}
    />
  );
}

export function EmptyWishlist({ variant = "default" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<Heart className="h-12 w-12 text-muted-foreground" />}
      title="Your wishlist is empty"
      description="Save items you love to your wishlist. Review them anytime and easily move them to cart."
      action={{ label: "Discover Products", href: "/products" }}
    />
  );
}

export function EmptySearchResults({ query, variant = "default" }: { query: string; variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<Search className="h-12 w-12 text-muted-foreground" />}
      title="No results found"
      description={`We couldn't find any products matching "${query}". Try adjusting your search or browse our categories.`}
      action={{ label: "Browse All Products", href: "/products" }}
    />
  );
}

export function EmptyOrders({ variant = "default" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<Package className="h-12 w-12 text-muted-foreground" />}
      title="No orders yet"
      description="You haven't placed any orders yet. Once you do, you'll be able to track them here."
      action={{ label: "Start Shopping", href: "/products" }}
    />
  );
}

export function EmptyCategory({ variant = "default" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<AlertCircle className="h-12 w-12 text-muted-foreground" />}
      title="No products in this category"
      description="This category doesn't have any products yet. Check back later or explore other categories."
      action={{ label: "Browse Categories", href: "/products" }}
    />
  );
}

export function EmptyInbox({ variant = "default" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<Inbox className="h-12 w-12 text-muted-foreground" />}
      title="Your inbox is empty"
      description="You're all caught up! No new messages or notifications to display."
    />
  );
}

export function NotFound({ variant = "illustrated" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<Ghost className="h-16 w-16 text-muted-foreground" />}
      title="Page not found"
      description="Oops! The page you're looking for doesn't exist or has been moved to another dimension."
      action={{ label: "Go Home", href: "/" }}
      secondaryAction={{ label: "Browse Products", href: "/products" }}
    />
  );
}

export function Offline({ variant = "default" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<WifiOff className="h-12 w-12 text-muted-foreground" />}
      title="You're offline"
      description="Please check your internet connection and try again."
    />
  );
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
  variant = "default",
}: {
  message?: string;
  onRetry?: () => void;
  variant?: EmptyStateProps["variant"];
}) {
  return (
    <EmptyState
      variant={variant}
      icon={<Frown className="h-12 w-12 text-destructive" />}
      title="Oops! Something went wrong"
      description={message}
      action={onRetry ? { label: "Try Again", onClick: onRetry } : undefined}
    />
  );
}

export function AccessDenied({ variant = "illustrated" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<Lock className="h-14 w-14 text-muted-foreground" />}
      title="Access Denied"
      description="You don't have permission to view this page. Please sign in or contact support if you think this is an error."
      action={{ label: "Sign In", href: "/login" }}
      secondaryAction={{ label: "Go Home", href: "/" }}
    />
  );
}

export function MaintenanceState({ variant = "illustrated" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<Wrench className="h-14 w-14 text-muted-foreground" />}
      title="Under Maintenance"
      description="We're performing some scheduled maintenance. We'll be back soon with improvements!"
    />
  );
}

export function ComingSoon({ variant = "illustrated" }: { variant?: EmptyStateProps["variant"] }) {
  return (
    <EmptyState
      variant={variant}
      icon={<Rocket className="h-14 w-14 text-primary" />}
      title="Coming Soon"
      description="We're working on something exciting! Check back soon for updates."
      action={{ label: "Notify Me", href: "#" }}
    />
  );
}

// Loading state with animated spinner
export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 rounded-full border-4 border-muted border-t-primary mb-4"
      />
      <p className="text-muted-foreground">{message}</p>
    </motion.div>
  );
}

// Success state with confetti-like animation
export function SuccessState({
  title = "Success!",
  description,
  action,
}: {
  title?: string;
  description: string;
  action?: { label: string; href?: string; onClick?: () => void };
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="relative w-24 h-24 mb-6"
      >
        {/* Sparkle particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * 50],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * 50],
            }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
            className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary"
          />
        ))}
        <div className="w-full h-full rounded-full bg-green-500/20 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.3 }}
          >
            <Sparkles className="h-12 w-12 text-green-500" />
          </motion.div>
        </div>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-semibold mb-2 text-green-500"
      >
        {title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground max-w-md mb-6"
      >
        {description}
      </motion.p>
      {action && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {action.href ? (
            <Link href={action.href}>
              <Button>{action.label}</Button>
            </Link>
          ) : (
            <Button onClick={action.onClick}>{action.label}</Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

// Empty state with custom illustration slot
export function CustomEmptyState({
  illustration,
  title,
  description,
  action,
  className,
}: {
  illustration: React.ReactNode;
  title: string;
  description: string;
  action?: { label: string; href?: string; onClick?: () => void };
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center py-16 px-4 text-center", className)}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring" }}
        className="mb-6"
      >
        {illustration}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {action && (
        action.href ? (
          <Link href={action.href}>
            <Button>{action.label}</Button>
          </Link>
        ) : (
          <Button onClick={action.onClick}>{action.label}</Button>
        )
      )}
    </motion.div>
  );
}

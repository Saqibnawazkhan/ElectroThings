"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Home, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface AnimatedBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "pills" | "arrows" | "minimal" | "gradient";
  separator?: "chevron" | "slash" | "dot" | "arrow";
  showHome?: boolean;
}

// Separator components
const separators = {
  chevron: <ChevronRight className="h-4 w-4 text-muted-foreground/50" />,
  slash: <span className="text-muted-foreground/50 mx-1">/</span>,
  dot: <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />,
  arrow: <span className="text-muted-foreground/50">→</span>,
};

export function AnimatedBreadcrumbs({
  items,
  className,
  variant = "default",
  separator = "chevron",
  showHome = true,
}: AnimatedBreadcrumbsProps) {
  const allItems = showHome
    ? [{ label: "Home", href: "/", icon: <Home className="h-4 w-4" /> }, ...items]
    : items;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  if (variant === "pills") {
    return (
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn("flex items-center gap-2", className)}
        aria-label="Breadcrumb"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted text-sm font-medium transition-colors"
                  >
                    {item.icon}
                    {index > 0 && item.label}
                  </motion.div>
                </Link>
              ) : (
                <motion.span
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium",
                    isLast ? "bg-primary/10 text-primary" : "bg-muted/50"
                  )}
                >
                  {item.icon}
                  {item.label}
                </motion.span>
              )}

              {!isLast && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                >
                  {separators[separator]}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </motion.nav>
    );
  }

  if (variant === "arrows") {
    return (
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn("flex items-center", className)}
        aria-label="Breadcrumb"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center"
            >
              {item.href && !isLast ? (
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ x: 2 }}
                    className={cn(
                      "relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium",
                      "bg-muted/50 hover:bg-muted transition-colors",
                      index === 0 && "rounded-l-lg",
                      // Arrow shape on right side
                      "after:absolute after:right-0 after:top-0 after:h-full after:w-4 after:translate-x-1/2",
                      "after:border-y-[16px] after:border-l-[16px] after:border-y-transparent after:border-l-muted/50"
                    )}
                  >
                    {item.icon}
                    {index > 0 && item.label}
                  </motion.div>
                </Link>
              ) : (
                <motion.span
                  className={cn(
                    "relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-r-lg",
                    "bg-primary text-primary-foreground"
                  )}
                >
                  {item.icon}
                  {item.label}
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </motion.nav>
    );
  }

  if (variant === "minimal") {
    return (
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn("flex items-center gap-1", className)}
        aria-label="Breadcrumb"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center gap-1"
            >
              {item.href && !isLast ? (
                <Link href={item.href}>
                  <motion.span
                    whileHover={{ color: "var(--primary)" }}
                    className="text-sm text-muted-foreground hover:underline underline-offset-4"
                  >
                    {item.label}
                  </motion.span>
                </Link>
              ) : (
                <span className="text-sm font-medium">{item.label}</span>
              )}

              {!isLast && (
                <span className="text-muted-foreground/50 text-sm">/</span>
              )}
            </motion.div>
          );
        })}
      </motion.nav>
    );
  }

  if (variant === "gradient") {
    return (
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn("flex items-center gap-2 p-2 rounded-xl bg-gradient-to-r from-muted/50 to-transparent", className)}
        aria-label="Breadcrumb"
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center gap-2"
            >
              {item.href && !isLast ? (
                <Link href={item.href}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.icon}
                    {index > 0 && item.label}
                  </motion.span>
                </Link>
              ) : (
                <motion.span
                  className="flex items-center gap-1.5 text-sm font-medium bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                >
                  {item.icon && <span className="text-primary">{item.icon}</span>}
                  {item.label}
                </motion.span>
              )}

              {!isLast && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                >
                  {separators[separator]}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.nav>
    );
  }

  // Default variant
  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex items-center gap-2", className)}
      aria-label="Breadcrumb"
    >
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;

        return (
          <motion.div
            key={index}
            variants={itemVariants}
            className="flex items-center gap-2"
          >
            {item.href && !isLast ? (
              <Link href={item.href}>
                <motion.span
                  whileHover={{ color: "var(--primary)" }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.icon}
                  {index > 0 && item.label}
                </motion.span>
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-medium">
                {item.icon}
                {item.label}
              </span>
            )}

            {!isLast && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.05 }}
              >
                {separators[separator]}
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
}

// Collapsible breadcrumbs for long paths
export function CollapsibleBreadcrumbs({
  items,
  maxVisible = 3,
  className,
}: {
  items: BreadcrumbItem[];
  maxVisible?: number;
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const showHome = true;
  const allItems = showHome
    ? [{ label: "Home", href: "/", icon: <Home className="h-4 w-4" /> }, ...items]
    : items;

  const shouldCollapse = allItems.length > maxVisible;
  const visibleItems = shouldCollapse && !isExpanded
    ? [allItems[0], { label: "...", collapsed: true }, ...allItems.slice(-maxVisible + 1)]
    : allItems;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex items-center gap-2", className)}
      aria-label="Breadcrumb"
    >
      {visibleItems.map((item: any, index) => {
        const isLast = index === visibleItems.length - 1;

        if (item.collapsed) {
          return (
            <div key="collapsed" className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted/50 hover:bg-muted text-sm text-muted-foreground"
              >
                <span>...</span>
                <ChevronDown className="h-3 w-3" />
              </motion.button>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            </div>
          );
        }

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2"
          >
            {item.href && !isLast ? (
              <Link href={item.href}>
                <motion.span
                  whileHover={{ color: "var(--primary)" }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.icon}
                  {index > 0 && item.label}
                </motion.span>
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 text-sm font-medium">
                {item.icon}
                {item.label}
              </span>
            )}

            {!isLast && (
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
}

// Breadcrumbs with dropdown for each level
export function DropdownBreadcrumbs({
  items,
  className,
}: {
  items: (BreadcrumbItem & { siblings?: BreadcrumbItem[] })[];
  className?: string;
}) {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const showHome = true;
  const allItems = showHome
    ? [{ label: "Home", href: "/", icon: <Home className="h-4 w-4" /> }, ...items]
    : items;

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("flex items-center gap-2", className)}
      aria-label="Breadcrumb"
    >
      {allItems.map((item: any, index) => {
        const isLast = index === allItems.length - 1;
        const hasSiblings = item.siblings && item.siblings.length > 0;

        return (
          <div key={index} className="flex items-center gap-2">
            <div className="relative">
              {item.href && !isLast ? (
                <div className="flex items-center">
                  <Link href={item.href}>
                    <motion.span
                      whileHover={{ color: "var(--primary)" }}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.icon}
                      {index > 0 && item.label}
                    </motion.span>
                  </Link>
                  {hasSiblings && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="ml-1 p-0.5 rounded hover:bg-muted"
                    >
                      <ChevronDown className={cn(
                        "h-3 w-3 text-muted-foreground transition-transform",
                        openDropdown === index && "rotate-180"
                      )} />
                    </motion.button>
                  )}
                </div>
              ) : (
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  {item.icon}
                  {item.label}
                </span>
              )}

              {/* Dropdown */}
              {hasSiblings && openDropdown === index && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-1 py-1 min-w-[150px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-lg shadow-lg z-50"
                >
                  {item.siblings.map((sibling: BreadcrumbItem, sibIndex: number) => (
                    <Link key={sibIndex} href={sibling.href || "#"}>
                      <motion.div
                        whileHover={{ x: 2, backgroundColor: "var(--muted)" }}
                        className="px-3 py-2 text-sm hover:bg-muted transition-colors cursor-pointer"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {sibling.label}
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {!isLast && (
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            )}
          </div>
        );
      })}
    </motion.nav>
  );
}

// Breadcrumbs with progress indicator
export function ProgressBreadcrumbs({
  items,
  currentStep,
  className,
}: {
  items: { label: string; completed?: boolean }[];
  currentStep: number;
  className?: string;
}) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("flex items-center gap-4", className)}
      aria-label="Progress"
    >
      {items.map((item, index) => {
        const isCompleted = item.completed || index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                  backgroundColor: isCompleted
                    ? "var(--primary)"
                    : isCurrent
                    ? "var(--primary)"
                    : "transparent",
                }}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors",
                  isCompleted || isCurrent
                    ? "border-primary text-primary-foreground"
                    : "border-muted-foreground/30 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ) : (
                  index + 1
                )}
              </motion.div>
              <span
                className={cn(
                  "text-sm font-medium hidden sm:inline",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </div>

            {index < items.length - 1 && (
              <div className="w-12 h-0.5 bg-muted-foreground/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-primary"
                />
              </div>
            )}
          </motion.div>
        );
      })}
    </motion.nav>
  );
}

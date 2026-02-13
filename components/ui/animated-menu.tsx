"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  badge?: string;
  external?: boolean;
}

// Dropdown menu with animations
export function AnimatedDropdown({
  trigger,
  items,
  align = "left",
  className,
}: {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: "left" | "right" | "center";
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const alignments = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={className}
      >
        {trigger}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={cn(
                "absolute top-full mt-2 py-2 min-w-[200px] z-50",
                "bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl",
                alignments[align]
              )}
            >
              {items.map((item, index) => (
                <DropdownItem
                  key={index}
                  item={item}
                  onClose={() => setIsOpen(false)}
                  delay={index * 0.05}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropdownItem({
  item,
  onClose,
  delay,
}: {
  item: MenuItem;
  onClose: () => void;
  delay: number;
}) {
  const [isSubOpen, setIsSubOpen] = useState(false);

  if (item.children) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setIsSubOpen(true)}
        onMouseLeave={() => setIsSubOpen(false)}
      >
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay }}
          className="w-full flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors"
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.label}
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </motion.button>

        <AnimatePresence>
          {isSubOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-full top-0 ml-1 py-2 min-w-[180px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl"
            >
              {item.children.map((child, idx) => (
                <DropdownItem
                  key={idx}
                  item={child}
                  onClose={onClose}
                  delay={idx * 0.03}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const content = (
    <>
      <span className="flex items-center gap-2">
        {item.icon}
        {item.label}
      </span>
      <div className="flex items-center gap-2">
        {item.badge && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
            {item.badge}
          </span>
        )}
        {item.external && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
      </div>
    </>
  );

  const className = "w-full flex items-center justify-between px-4 py-2 hover:bg-muted transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      {item.href ? (
        <Link
          href={item.href}
          onClick={onClose}
          target={item.external ? "_blank" : undefined}
          className={className}
        >
          {content}
        </Link>
      ) : (
        <button onClick={onClose} className={className}>
          {content}
        </button>
      )}
    </motion.div>
  );
}

// Mega menu
export function MegaMenu({
  trigger,
  children,
  className,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-1"
      >
        {trigger}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute left-1/2 -translate-x-1/2 top-full mt-4 p-6",
              "bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl",
              "min-w-[600px]",
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile slide menu
export function MobileMenu({
  items,
  className,
}: {
  items: MenuItem[];
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpand = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn("p-2 rounded-lg hover:bg-muted transition-colors", className)}
      >
        <Menu className="h-6 w-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[300px] bg-background border-r border-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h2 className="text-lg font-semibold">Menu</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Items */}
              <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
                {items.map((item, index) => (
                  <MobileMenuItem
                    key={index}
                    item={item}
                    index={index}
                    isExpanded={expandedItems.includes(item.label)}
                    onToggle={() => toggleExpand(item.label)}
                    onClose={() => setIsOpen(false)}
                  />
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileMenuItem({
  item,
  index,
  isExpanded,
  onToggle,
  onClose,
}: {
  item: MenuItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const hasChildren = item.children && item.children.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      {hasChildren ? (
        <>
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors"
          >
            <span className="flex items-center gap-3">
              {item.icon}
              {item.label}
            </span>
            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pl-6 py-1 space-y-1">
                  {item.children!.map((child, idx) => (
                    <Link
                      key={idx}
                      href={child.href || "#"}
                      onClick={onClose}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    >
                      {child.icon}
                      {child.label}
                      {child.badge && (
                        <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                          {child.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : item.href ? (
        <Link
          href={item.href}
          onClick={onClose}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
        >
          {item.icon}
          {item.label}
          {item.badge && (
            <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
              {item.badge}
            </span>
          )}
        </Link>
      ) : (
        <button
          onClick={onClose}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
        >
          {item.icon}
          {item.label}
        </button>
      )}
    </motion.div>
  );
}

// Context menu
export function ContextMenu({
  children,
  items,
}: {
  children: React.ReactNode;
  items: MenuItem[];
}) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleClose = () => setPosition(null);

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>

      <AnimatePresence>
        {position && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ left: position.x, top: position.y }}
              className="fixed z-50 py-2 min-w-[160px] bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl"
            >
              {items.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => {
                    handleClose();
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 hover:bg-muted transition-colors text-sm"
                >
                  {item.icon}
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// Pill navigation
export function PillNavigation({
  items,
  activeItem,
  onChange,
  className,
}: {
  items: { label: string; value: string }[];
  activeItem: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-2 p-1 bg-muted rounded-xl", className)}>
      {items.map((item) => (
        <motion.button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={cn(
            "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            activeItem === item.value ? "text-foreground" : "text-muted-foreground hover:text-foreground"
          )}
        >
          {activeItem === item.value && (
            <motion.div
              layoutId="pill-indicator"
              className="absolute inset-0 bg-background rounded-lg shadow-sm"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

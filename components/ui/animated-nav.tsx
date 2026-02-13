"use client";

import { useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavItem[];
}

// Animated underline nav link
interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={cn("relative py-2 group", className)}>
      <span
        className={cn(
          "transition-colors",
          isActive ? "text-primary" : "text-foreground hover:text-primary"
        )}
      >
        {children}
      </span>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isActive ? 1 : 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </Link>
  );
}

// Pill navigation with animated indicator
interface PillNavProps {
  items: { label: string; value: string }[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PillNav({ items, activeValue, onChange, className }: PillNavProps) {
  return (
    <div
      className={cn(
        "relative inline-flex p-1 bg-muted rounded-full",
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.value}
          onClick={() => onChange(item.value)}
          className={cn(
            "relative px-4 py-2 text-sm font-medium transition-colors z-10",
            activeValue === item.value
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {item.label}
        </button>
      ))}

      {/* Animated pill indicator */}
      <motion.div
        layoutId="pillIndicator"
        className="absolute inset-y-1 bg-gradient-to-r from-primary to-purple-600 rounded-full shadow-lg"
        style={{
          left: `${(items.findIndex((i) => i.value === activeValue) * 100) / items.length}%`,
          width: `${100 / items.length}%`,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    </div>
  );
}

// Dropdown menu with animations
interface DropdownMenuProps {
  trigger: ReactNode;
  items: NavItem[];
  className?: string;
}

export function DropdownMenu({ trigger, items, className }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 py-2">
        {trigger}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-56 py-2 bg-background rounded-xl border shadow-xl z-50"
          >
            {items.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && (
                    <span className="text-muted-foreground">{item.icon}</span>
                  )}
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mega menu with columns
interface MegaMenuColumn {
  title: string;
  items: NavItem[];
}

interface MegaMenuProps {
  trigger: ReactNode;
  columns: MegaMenuColumn[];
  featured?: ReactNode;
  className?: string;
}

export function MegaMenu({ trigger, columns, featured, className }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 py-2">
        {trigger}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-screen max-w-5xl bg-background rounded-2xl border shadow-2xl z-50 overflow-hidden"
          >
            <div className="grid grid-cols-4 divide-x">
              {columns.map((column, colIndex) => (
                <motion.div
                  key={column.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: colIndex * 0.1 }}
                  className="p-6"
                >
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.items.map((item, itemIndex) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: colIndex * 0.1 + itemIndex * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon && (
                            <span className="text-muted-foreground group-hover:text-primary transition-colors">
                              {item.icon}
                            </span>
                          )}
                          <span>{item.label}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              {featured && (
                <div className="p-6 bg-gradient-to-br from-muted/50 to-muted">
                  {featured}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile menu with slide animation
interface MobileMenuProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ items, isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background shadow-2xl z-50"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-lg">Menu</span>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            <nav className="p-4">
              <ul className="space-y-1">
                {items.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <MobileMenuItem item={item} onClose={onClose} />
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileMenuItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
      >
        {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
        <span className="font-medium">{item.label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-3">
          {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
          <span className="font-medium">{item.label}</span>
        </div>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-6"
          >
            {item.children!.map((child, index) => (
              <motion.li
                key={child.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={child.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {child.icon}
                  <span>{child.label}</span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// Breadcrumb with animations
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center gap-2 text-sm", className)}>
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2"
        >
          {index > 0 && (
            <span className="text-muted-foreground">/</span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium">{item.label}</span>
          )}
        </motion.div>
      ))}
    </nav>
  );
}

// Tab navigation with animated indicator
interface TabNavProps {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onChange: (value: string) => void;
  className?: string;
}

export function TabNav({ tabs, activeTab, onChange, className }: TabNavProps) {
  return (
    <div className={cn("relative border-b", className)}>
      <div className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative py-4 text-sm font-medium transition-colors",
              activeTab === tab.value
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}

            {activeTab === tab.value && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-purple-500"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export function AnimatedTabs({
  tabs,
  defaultTab,
  onChange,
  className,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [tabBounds, setTabBounds] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTabEl = tabRefs.current.get(activeTab);
    const containerEl = containerRef.current;
    if (activeTabEl && containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      const tabRect = activeTabEl.getBoundingClientRect();
      setTabBounds({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center gap-1 p-1 bg-muted/50 rounded-xl backdrop-blur-sm",
        className
      )}
    >
      {/* Animated background */}
      <motion.div
        className="absolute h-[calc(100%-8px)] bg-background rounded-lg shadow-sm border border-border/50"
        initial={false}
        animate={{
          left: tabBounds.left,
          width: tabBounds.width,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      {tabs.map((tab, index) => (
        <motion.button
          key={tab.id}
          ref={(el) => {
            if (el) tabRefs.current.set(tab.id, el);
          }}
          onClick={() => handleTabClick(tab.id)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            "relative z-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
            activeTab === tab.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="flex items-center gap-2">
            {tab.icon && (
              <motion.span
                animate={{
                  scale: activeTab === tab.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.icon}
              </motion.span>
            )}
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground"
              >
                {tab.badge}
              </motion.span>
            )}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

// Pill-style tabs with underline indicator
export function PillTabs({
  tabs,
  defaultTab,
  onChange,
  className,
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {tabs.map((tab, index) => (
        <motion.button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
            activeTab === tab.id
              ? "bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30"
              : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <span className="flex items-center gap-2">
            {tab.icon}
            {tab.label}
          </span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="pill-highlight"
              className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}

// Vertical tabs with content
interface VerticalTabsProps extends AnimatedTabsProps {
  children: React.ReactNode[];
}

export function VerticalTabs({
  tabs,
  defaultTab,
  onChange,
  children,
  className,
}: VerticalTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeIndex = tabs.findIndex((t) => t.id === activeTab);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={cn("flex gap-6", className)}>
      {/* Tab list */}
      <div className="relative flex flex-col gap-1 min-w-[200px]">
        {/* Active indicator */}
        <motion.div
          className="absolute left-0 w-1 bg-gradient-to-b from-primary to-purple-500 rounded-full"
          animate={{
            top: activeIndex * 44 + 8,
            height: 28,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />

        {tabs.map((tab, index) => (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 text-left rounded-lg transition-colors",
              activeTab === tab.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                {tab.badge}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children[activeIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

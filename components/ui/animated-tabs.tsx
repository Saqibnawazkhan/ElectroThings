"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  variant?: "default" | "pills" | "underline" | "bordered" | "gradient" | "glow" | "segmented";
}

export function AnimatedTabs({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  className,
  variant = "default",
}: AnimatedTabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeTab = controlledActiveTab ?? internalActiveTab;
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeElement = containerRef.current?.querySelector(
      `[data-tab-id="${activeTab}"]`
    ) as HTMLElement;
    if (activeElement && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = activeElement.getBoundingClientRect();
      setIndicatorStyle({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  if (variant === "pills") {
    return (
      <div
        ref={containerRef}
        className={cn("flex gap-2 p-1.5 bg-muted/50 rounded-xl", className)}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
              whileHover={{ scale: tab.disabled ? 1 : 1.02 }}
              whileTap={{ scale: tab.disabled ? 1 : 0.98 }}
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                tab.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="pill-indicator"
                  className="absolute inset-0 bg-background rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex items-center gap-2",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && (
                  <span className="px-1.5 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                    {tab.badge}
                  </span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  if (variant === "underline") {
    return (
      <div ref={containerRef} className={cn("relative border-b border-border", className)}>
        <div className="flex">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                data-tab-id={tab.id}
                onClick={() => !tab.disabled && handleTabClick(tab.id)}
                disabled={tab.disabled}
                className={cn(
                  "relative px-6 py-3 text-sm font-medium transition-colors",
                  tab.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                  {tab.badge !== undefined && (
                    <span className="px-1.5 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                      {tab.badge}
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
        <motion.div
          className="absolute bottom-0 h-0.5 bg-primary rounded-full"
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </div>
    );
  }

  if (variant === "bordered") {
    return (
      <div
        ref={containerRef}
        className={cn("flex p-1 bg-muted/30 rounded-xl border border-border/50", className)}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
              whileHover={{ scale: tab.disabled ? 1 : 1.02 }}
              whileTap={{ scale: tab.disabled ? 1 : 0.98 }}
              className={cn(
                "relative px-4 py-2 rounded-lg text-sm font-medium transition-all",
                tab.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer",
                isActive
                  ? "bg-background shadow-sm border border-border/50"
                  : "hover:bg-muted/50"
              )}
            >
              <span
                className={cn(
                  "flex items-center gap-2",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 text-xs rounded-full",
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div ref={containerRef} className={cn("flex gap-2", className)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
              whileHover={{ scale: tab.disabled ? 1 : 1.05 }}
              whileTap={{ scale: tab.disabled ? 1 : 0.95 }}
              className={cn(
                "relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all overflow-hidden",
                tab.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer",
                isActive
                  ? "text-white shadow-lg shadow-primary/30"
                  : "text-muted-foreground hover:text-foreground bg-muted/50"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="gradient-indicator"
                  className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary bg-[length:200%_100%]"
                  animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
                  transition={{
                    backgroundPosition: { duration: 2, repeat: Infinity, ease: "linear" },
                    layout: { type: "spring", stiffness: 400, damping: 30 },
                  }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && (
                  <span
                    className={cn(
                      "px-1.5 py-0.5 text-xs rounded-full",
                      isActive ? "bg-white/20" : "bg-primary/10 text-primary"
                    )}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <div ref={containerRef} className={cn("flex gap-2", className)}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
              whileHover={{ scale: tab.disabled ? 1 : 1.02 }}
              whileTap={{ scale: tab.disabled ? 1 : 0.98 }}
              className={cn(
                "relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all",
                tab.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <>
                  <motion.div
                    layoutId="glow-bg"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                  <motion.div
                    layoutId="glow-effect"
                    className="absolute inset-0 rounded-xl"
                    style={{ boxShadow: "0 0 20px rgba(var(--primary-rgb), 0.3)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                </>
              )}
              <span className="relative z-10 flex items-center gap-2">
                {tab.icon}
                {tab.label}
                {tab.badge !== undefined && (
                  <motion.span
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground"
                  >
                    {tab.badge}
                  </motion.span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  if (variant === "segmented") {
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative flex p-1 bg-muted rounded-xl overflow-hidden",
          className
        )}
      >
        <motion.div
          className="absolute top-1 bottom-1 bg-background rounded-lg shadow-sm"
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              data-tab-id={tab.id}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "relative z-10 flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                tab.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <span className="flex items-center justify-center gap-2">
                {tab.icon && (
                  <motion.span
                    animate={{ scale: isActive ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab.icon}
                  </motion.span>
                )}
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Default variant
  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center gap-1 p-1 bg-muted/50 rounded-xl backdrop-blur-sm",
        className
      )}
    >
      <motion.div
        className="absolute h-[calc(100%-8px)] bg-background rounded-lg shadow-sm border border-border/50"
        initial={false}
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            data-tab-id={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "relative z-10 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
              tab.disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              {tab.icon && (
                <motion.span animate={{ scale: isActive ? 1.1 : 1 }} transition={{ duration: 0.2 }}>
                  {tab.icon}
                </motion.span>
              )}
              {tab.label}
              {tab.badge !== undefined && (
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
        );
      })}
    </div>
  );
}

// Tabs with content panel
interface TabPanelProps {
  tabs: (Tab & { content: React.ReactNode })[];
  defaultTab?: string;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
  variant?: AnimatedTabsProps["variant"];
}

export function TabPanels({
  tabs,
  defaultTab,
  className,
  tabsClassName,
  contentClassName,
  variant = "default",
}: TabPanelProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      <AnimatedTabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant={variant}
        className={tabsClassName}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn("mt-4", contentClassName)}
        >
          {activeContent}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Vertical tabs with content
interface VerticalTabsProps {
  tabs: (Tab & { content?: React.ReactNode })[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  children?: React.ReactNode[];
  className?: string;
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

  const activeContent = tabs[activeIndex]?.content || (children ? children[activeIndex] : null);

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

        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: tab.disabled ? 0 : 4 }}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-left rounded-lg transition-colors",
                tab.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                  {tab.badge}
                </span>
              )}
            </motion.button>
          );
        })}
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
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Scrollable tabs for mobile
export function ScrollableTabs({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  className,
}: Omit<AnimatedTabsProps, "variant">) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeTab = controlledActiveTab ?? internalActiveTab;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeElement = scrollRef.current?.querySelector(
      `[data-tab-id="${activeTab}"]`
    ) as HTMLElement;
    if (activeElement && scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const elementLeft = activeElement.offsetLeft;
      const elementWidth = activeElement.offsetWidth;
      const scrollLeft = elementLeft - containerWidth / 2 + elementWidth / 2;
      scrollRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeTab]);

  const handleTabClick = (tabId: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mb-2",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            data-tab-id={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
            whileHover={{ scale: tab.disabled ? 1 : 1.02 }}
            whileTap={{ scale: tab.disabled ? 1 : 0.98 }}
            className={cn(
              "relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              tab.disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            )}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 text-xs rounded-full",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

// Icon-only tabs
export function IconTabs({
  tabs,
  activeTab: controlledActiveTab,
  defaultTab,
  onChange,
  className,
}: {
  tabs: { id: string; icon: React.ReactNode; tooltip?: string }[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (id: string) => void;
  className?: string;
}) {
  const [internalActiveTab, setInternalActiveTab] = useState(defaultTab || tabs[0]?.id);
  const activeTab = controlledActiveTab ?? internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (!controlledActiveTab) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  return (
    <div className={cn("flex gap-1 p-1 bg-muted/50 rounded-xl", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={tab.tooltip}
            className={cn(
              "relative p-2.5 rounded-lg transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="icon-indicator"
                className="absolute inset-0 bg-background rounded-lg shadow-sm"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.icon}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

// PillTabs for backward compatibility
export function PillTabs({
  tabs,
  defaultTab,
  onChange,
  className,
}: {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: tab.disabled ? 1 : 1.05 }}
            whileTap={{ scale: tab.disabled ? 1 : 0.95 }}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
              tab.disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer",
              isActive
                ? "bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

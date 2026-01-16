"use client";

import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { GripVertical, X, Check, ChevronRight, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string;
  className?: string;
  staggerDelay?: number;
}

// Basic animated list with staggered items
export function AnimatedList<T>({
  items,
  renderItem,
  keyExtractor,
  className,
  staggerDelay = 0.05,
}: AnimatedListProps<T>) {
  return (
    <motion.ul
      className={cn("space-y-2", className)}
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.li
            key={keyExtractor(item)}
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 },
            }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.3 }}
            layout
          >
            {renderItem(item, index)}
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

// Reorderable list with drag and drop
interface ReorderableItem {
  id: string;
  content: React.ReactNode;
}

export function ReorderableList({
  items,
  onReorder,
  className,
}: {
  items: ReorderableItem[];
  onReorder: (items: ReorderableItem[]) => void;
  className?: string;
}) {
  return (
    <Reorder.Group
      axis="y"
      values={items}
      onReorder={onReorder}
      className={cn("space-y-2", className)}
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.id}
          value={item}
          className="cursor-grab active:cursor-grabbing"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileDrag={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
            className="flex items-center gap-3 p-4 bg-background border border-border/50 rounded-xl"
          >
            <GripVertical className="h-5 w-5 text-muted-foreground shrink-0" />
            <div className="flex-1">{item.content}</div>
          </motion.div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}

// Swipeable list item
export function SwipeableListItem({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  className,
}: {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  className?: string;
}) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background actions */}
      <div className="absolute inset-0 flex">
        <div className="flex-1 flex items-center justify-start px-4 bg-green-500 text-white">
          {leftAction || <Check className="h-6 w-6" />}
        </div>
        <div className="flex-1 flex items-center justify-end px-4 bg-red-500 text-white">
          {rightAction || <X className="h-6 w-6" />}
        </div>
      </div>

      {/* Main content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.3}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(e, { offset, velocity }) => {
          setIsDragging(false);
          const swipe = offset.x * velocity.x;
          if (swipe < -10000) onSwipeLeft?.();
          if (swipe > 10000) onSwipeRight?.();
        }}
        className="relative bg-background"
      >
        {children}
      </motion.div>
    </div>
  );
}

// Expandable list item
export function ExpandableListItem({
  title,
  subtitle,
  children,
  defaultExpanded = false,
  className,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  className?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <motion.div
      className={cn(
        "border border-border/50 rounded-xl overflow-hidden",
        className
      )}
      layout
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="text-left">
          <h4 className="font-medium">{title}</h4>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 pt-0 border-t border-border/50">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Selection list
export function SelectionList({
  items,
  selectedIds,
  onSelectionChange,
  multiSelect = false,
  className,
}: {
  items: { id: string; title: string; subtitle?: string }[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  multiSelect?: boolean;
  className?: string;
}) {
  const toggleSelection = (id: string) => {
    if (multiSelect) {
      onSelectionChange(
        selectedIds.includes(id)
          ? selectedIds.filter((i) => i !== id)
          : [...selectedIds, id]
      );
    } else {
      onSelectionChange(selectedIds.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => {
        const isSelected = selectedIds.includes(item.id);

        return (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => toggleSelection(item.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
              "w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left",
              isSelected
                ? "border-primary bg-primary/5"
                : "border-border/50 hover:border-border"
            )}
          >
            {/* Selection indicator */}
            <motion.div
              animate={{
                scale: isSelected ? 1 : 0.8,
                backgroundColor: isSelected ? "var(--primary)" : "transparent",
              }}
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                isSelected ? "border-primary" : "border-muted-foreground/30"
              )}
            >
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Check className="h-4 w-4 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              {item.subtitle && (
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// Timeline list
export function TimelineList({
  items,
  className,
}: {
  items: {
    id: string;
    title: string;
    description?: string;
    date?: string;
    status?: "completed" | "current" | "upcoming";
  }[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-0", className)}>
      {items.map((item, index) => {
        const isCompleted = item.status === "completed";
        const isCurrent = item.status === "current";

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 pb-8 last:pb-0"
          >
            {/* Line */}
            {index < items.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
            )}

            {/* Dot */}
            <motion.div
              animate={isCurrent ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
              className={cn(
                "absolute left-0 top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center",
                isCompleted && "bg-primary border-primary",
                isCurrent && "bg-primary/20 border-primary",
                !isCompleted && !isCurrent && "bg-muted border-border"
              )}
            >
              {isCompleted && <Check className="h-3 w-3 text-white" />}
              {isCurrent && <div className="w-2 h-2 rounded-full bg-primary" />}
            </motion.div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{item.title}</h4>
                {item.date && (
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                )}
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// Action list item with menu
export function ActionListItem({
  title,
  subtitle,
  icon,
  actions,
  onClick,
  className,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: { label: string; onClick: () => void }[];
  onClick?: () => void;
  className?: string;
}) {
  const [showActions, setShowActions] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={cn(
        "relative flex items-center gap-3 p-4 bg-background border border-border/50 rounded-xl",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
          {icon}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{title}</h4>
        {subtitle && (
          <p className="text-sm text-muted-foreground truncate">{subtitle}</p>
        )}
      </div>

      {actions && actions.length > 0 && (
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </motion.button>

          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute right-0 top-full mt-1 py-1 bg-background border border-border rounded-lg shadow-lg z-10 min-w-[120px]"
              >
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onClick();
                      setShowActions(false);
                    }}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-muted transition-colors"
                  >
                    {action.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

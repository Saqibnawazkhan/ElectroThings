"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Check,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Grid3X3,
  List,
  LayoutGrid,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Filter chip component
interface FilterChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  count?: number;
  className?: string;
}

export function FilterChip({
  label,
  active = false,
  onClick,
  onRemove,
  count,
  className,
}: FilterChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/80",
        className
      )}
    >
      {label}
      {count !== undefined && (
        <span
          className={cn(
            "px-1.5 py-0.5 text-xs rounded-full",
            active ? "bg-primary-foreground/20" : "bg-background"
          )}
        >
          {count}
        </span>
      )}
      {active && onRemove && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1"
        >
          <X className="h-3.5 w-3.5" />
        </motion.span>
      )}
    </motion.button>
  );
}

// Filter chips group
interface FilterChipsProps {
  options: { label: string; value: string; count?: number }[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiSelect?: boolean;
  className?: string;
}

export function FilterChips({
  options,
  selected,
  onChange,
  multiSelect = true,
  className,
}: FilterChipsProps) {
  const handleClick = (value: string) => {
    if (multiSelect) {
      onChange(
        selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value]
      );
    } else {
      onChange(selected.includes(value) ? [] : [value]);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <FilterChip
          key={option.value}
          label={option.label}
          count={option.count}
          active={selected.includes(option.value)}
          onClick={() => handleClick(option.value)}
          onRemove={() => onChange(selected.filter((v) => v !== option.value))}
        />
      ))}
    </div>
  );
}

// Dropdown filter
interface DropdownFilterProps {
  label: string;
  options: { label: string; value: string }[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiSelect?: boolean;
  searchable?: boolean;
  className?: string;
}

export function DropdownFilter({
  label,
  options,
  value,
  onChange,
  multiSelect = false,
  searchable = false,
  className,
}: DropdownFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string) => {
    if (multiSelect) {
      const newValue = selectedValues.includes(optionValue)
        ? selectedValues.filter((v) => v !== optionValue)
        : [...selectedValues, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const displayLabel = selectedValues.length > 0
    ? selectedValues.length === 1
      ? options.find((o) => o.value === selectedValues[0])?.label
      : `${selectedValues.length} selected`
    : label;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between gap-2 px-4 py-2 min-w-[150px]",
          "rounded-lg border border-border bg-background text-sm",
          "hover:bg-muted transition-colors",
          selectedValues.length > 0 && "border-primary"
        )}
      >
        <span className={selectedValues.length > 0 ? "font-medium" : "text-muted-foreground"}>
          {displayLabel}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full left-0 mt-2 w-full min-w-[200px] z-50 py-2 rounded-xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl"
          >
            {searchable && (
              <div className="px-2 pb-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-muted/50 border-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            )}

            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2 text-sm text-left",
                      "hover:bg-muted transition-colors",
                      isSelected && "bg-primary/10 text-primary"
                    )}
                  >
                    {option.label}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {multiSelect && selectedValues.length > 0 && (
              <div className="px-2 pt-2 border-t border-border mt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onChange([])}
                  className="w-full py-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Range slider filter
interface RangeFilterProps {
  label: string;
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  step?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function RangeFilter({
  label,
  min,
  max,
  value,
  onChange,
  step = 1,
  prefix = "",
  suffix = "",
  className,
}: RangeFilterProps) {
  const [localValue, setLocalValue] = useState(value);

  const handleMinChange = (newMin: number) => {
    const newValue: [number, number] = [Math.min(newMin, localValue[1] - step), localValue[1]];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleMaxChange = (newMax: number) => {
    const newValue: [number, number] = [localValue[0], Math.max(newMax, localValue[0] + step)];
    setLocalValue(newValue);
    onChange(newValue);
  };

  const minPercent = ((localValue[0] - min) / (max - min)) * 100;
  const maxPercent = ((localValue[1] - min) / (max - min)) * 100;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {prefix}{localValue[0].toLocaleString()}{suffix} - {prefix}{localValue[1].toLocaleString()}{suffix}
        </span>
      </div>

      <div className="relative h-2">
        {/* Track background */}
        <div className="absolute inset-0 rounded-full bg-muted" />

        {/* Active track */}
        <motion.div
          className="absolute h-full rounded-full bg-primary"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background"
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background"
        />
      </div>
    </div>
  );
}

// Sort dropdown
interface SortOption {
  label: string;
  value: string;
  direction?: "asc" | "desc";
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SortDropdown({
  options,
  value,
  onChange,
  className,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm hover:bg-muted transition-colors"
      >
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        <span>{selectedOption?.label || "Sort by"}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full right-0 mt-2 min-w-[180px] z-50 py-2 rounded-xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl"
          >
            {options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-2 text-sm",
                  "hover:bg-muted transition-colors",
                  value === option.value && "bg-primary/10 text-primary"
                )}
              >
                <span>{option.label}</span>
                {option.direction && (
                  option.direction === "asc" ? (
                    <ArrowUp className="h-4 w-4" />
                  ) : (
                    <ArrowDown className="h-4 w-4" />
                  )
                )}
                {value === option.value && !option.direction && (
                  <Check className="h-4 w-4" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// View toggle (grid/list)
interface ViewToggleProps {
  value: "grid" | "list" | "compact";
  onChange: (value: "grid" | "list" | "compact") => void;
  className?: string;
}

export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
  const options = [
    { value: "grid" as const, icon: <LayoutGrid className="h-4 w-4" /> },
    { value: "list" as const, icon: <List className="h-4 w-4" /> },
    { value: "compact" as const, icon: <Grid3X3 className="h-4 w-4" /> },
  ];

  return (
    <div className={cn("flex gap-1 p-1 bg-muted rounded-lg", className)}>
      {options.map((option) => (
        <motion.button
          key={option.value}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(option.value)}
          className={cn(
            "relative p-2 rounded-md transition-colors",
            value === option.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {value === option.value && (
            <motion.div
              layoutId="view-toggle-bg"
              className="absolute inset-0 bg-background rounded-md shadow-sm"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{option.icon}</span>
        </motion.button>
      ))}
    </div>
  );
}

// Filter sidebar panel
interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  onReset?: () => void;
  onApply?: () => void;
  className?: string;
}

export function FilterPanel({
  isOpen,
  onClose,
  children,
  title = "Filters",
  onReset,
  onApply,
  className,
}: FilterPanelProps) {
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "fixed left-0 top-0 bottom-0 z-50 w-[300px] bg-background border-r border-border",
              "flex flex-col",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                <h2 className="font-semibold">{title}</h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {children}
            </div>

            {/* Footer */}
            <div className="flex gap-2 p-4 border-t border-border">
              {onReset && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onReset}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </motion.button>
              )}
              {onApply && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onApply}
                  className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                >
                  Apply Filters
                </motion.button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Active filters display
interface ActiveFiltersProps {
  filters: { key: string; label: string; value: string }[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
  className?: string;
}

export function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
  className,
}: ActiveFiltersProps) {
  if (filters.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {filters.map((filter, index) => (
        <motion.div
          key={filter.key}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <FilterChip
            label={`${filter.label}: ${filter.value}`}
            active
            onRemove={() => onRemove(filter.key)}
          />
        </motion.div>
      ))}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClearAll}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        Clear all
      </motion.button>
    </motion.div>
  );
}

// Filter trigger button
export function FilterButton({
  activeCount = 0,
  onClick,
  className,
}: {
  activeCount?: number;
  onClick: () => void;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-background text-sm font-medium hover:bg-muted transition-colors",
        activeCount > 0 && "border-primary",
        className
      )}
    >
      <Filter className="h-4 w-4" />
      Filters
      {activeCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground"
        >
          {activeCount}
        </motion.span>
      )}
    </motion.button>
  );
}

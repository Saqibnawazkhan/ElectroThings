"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SizeOption {
  label: string;
  value: string;
  available?: boolean;
}

interface SizeSelectorProps {
  sizes: SizeOption[];
  selected?: string;
  onSelect?: (size: SizeOption) => void;
  variant?: "default" | "outline" | "pill";
}

export function SizeSelector({
  sizes,
  selected,
  onSelect,
  variant = "default",
}: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState(selected);

  const handleSelect = (size: SizeOption) => {
    if (size.available === false) return;
    setSelectedSize(size.value);
    onSelect?.(size);
  };

  const variantStyles = {
    default: {
      base: "border-2 rounded-lg",
      selected: "border-primary bg-primary text-white",
      unselected: "border-gray-300 bg-white hover:border-gray-400",
      unavailable: "border-gray-200 bg-gray-100 text-gray-400 line-through",
    },
    outline: {
      base: "border-2 rounded-lg",
      selected: "border-primary text-primary bg-primary/10",
      unselected: "border-gray-300 hover:border-primary",
      unavailable: "border-gray-200 text-gray-300 line-through",
    },
    pill: {
      base: "rounded-full border-2",
      selected: "border-primary bg-primary text-white",
      unselected: "border-gray-300 bg-gray-50 hover:bg-gray-100",
      unavailable: "border-gray-200 bg-gray-100 text-gray-400 line-through",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className="flex flex-wrap gap-3">
      {sizes.map((size) => {
        const isSelected = selectedSize === size.value;
        const isAvailable = size.available !== false;

        return (
          <motion.button
            key={size.value}
            whileHover={isAvailable ? { scale: 1.05 } : {}}
            whileTap={isAvailable ? { scale: 0.95 } : {}}
            onClick={() => handleSelect(size)}
            disabled={!isAvailable}
            className={cn(
              styles.base,
              "px-4 py-2 font-medium transition-all",
              isAvailable
                ? isSelected
                  ? styles.selected
                  : styles.unselected
                : styles.unavailable,
              !isAvailable && "cursor-not-allowed"
            )}
          >
            {size.label}
          </motion.button>
        );
      })}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ColorOption {
  name: string;
  value: string;
  hex: string;
}

interface ColorPickerProps {
  colors: ColorOption[];
  selected?: string;
  onSelect?: (color: ColorOption) => void;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

export function ColorPicker({
  colors,
  selected,
  onSelect,
  size = "md",
}: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(selected);

  const handleSelect = (color: ColorOption) => {
    setSelectedColor(color.value);
    onSelect?.(color);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => {
        const isSelected = selectedColor === color.value;

        return (
          <motion.button
            key={color.value}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(color)}
            className={cn(
              "relative rounded-full border-2 transition-all",
              sizeClasses[size],
              isSelected
                ? "border-primary shadow-lg"
                : "border-gray-300 hover:border-gray-400"
            )}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          >
            {isSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Check className="h-4 w-4 text-white drop-shadow-lg" />
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

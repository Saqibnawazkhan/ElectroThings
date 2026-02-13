"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Variant {
  name: string;
  value: string;
  available: boolean;
  priceModifier?: number;
}

interface VariantGroup {
  name: string;
  type: "button" | "color";
  variants: Variant[];
}

interface VariantSelectorProps {
  variantGroups: VariantGroup[];
  onVariantChange?: (selections: Record<string, string>) => void;
  className?: string;
}

// Mock variant data for demo
export const mockVariants: VariantGroup[] = [
  {
    name: "Color",
    type: "color",
    variants: [
      { name: "Space Black", value: "#1d1d1f", available: true },
      { name: "Silver", value: "#f5f5f7", available: true },
      { name: "Gold", value: "#fad7bd", available: true },
      { name: "Deep Purple", value: "#5c5c8a", available: false },
    ],
  },
  {
    name: "Storage",
    type: "button",
    variants: [
      { name: "128GB", value: "128", available: true, priceModifier: 0 },
      { name: "256GB", value: "256", available: true, priceModifier: 100 },
      { name: "512GB", value: "512", available: true, priceModifier: 200 },
      { name: "1TB", value: "1024", available: false, priceModifier: 400 },
    ],
  },
];

export function VariantSelector({
  variantGroups,
  onVariantChange,
  className,
}: VariantSelectorProps) {
  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    variantGroups.forEach((group) => {
      const firstAvailable = group.variants.find((v) => v.available);
      if (firstAvailable) {
        initial[group.name] = firstAvailable.value;
      }
    });
    return initial;
  });

  const handleSelect = (groupName: string, value: string) => {
    const newSelections = { ...selections, [groupName]: value };
    setSelections(newSelections);
    onVariantChange?.(newSelections);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {variantGroups.map((group) => (
        <div key={group.name}>
          <Label className="text-sm font-medium mb-2 block">
            {group.name}:{" "}
            <span className="font-normal text-muted-foreground">
              {group.variants.find((v) => v.value === selections[group.name])?.name}
            </span>
          </Label>

          <div className="flex flex-wrap gap-2">
            {group.type === "color"
              ? group.variants.map((variant) => (
                  <motion.button
                    key={variant.value}
                    whileHover={{ scale: variant.available ? 1.1 : 1 }}
                    whileTap={{ scale: variant.available ? 0.95 : 1 }}
                    onClick={() =>
                      variant.available && handleSelect(group.name, variant.value)
                    }
                    disabled={!variant.available}
                    className={cn(
                      "relative w-10 h-10 rounded-full border-2 transition-all",
                      selections[group.name] === variant.value
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "border-muted hover:border-muted-foreground",
                      !variant.available && "opacity-40 cursor-not-allowed"
                    )}
                    style={{ backgroundColor: variant.value }}
                    title={variant.name}
                  >
                    {selections[group.name] === variant.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Check
                          className={cn(
                            "h-5 w-5",
                            variant.value === "#f5f5f7" || variant.value === "#fad7bd"
                              ? "text-black"
                              : "text-white"
                          )}
                        />
                      </motion.div>
                    )}
                    {!variant.available && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-muted-foreground/50 rotate-45" />
                      </div>
                    )}
                  </motion.button>
                ))
              : group.variants.map((variant) => (
                  <motion.div
                    key={variant.value}
                    whileHover={{ scale: variant.available ? 1.02 : 1 }}
                    whileTap={{ scale: variant.available ? 0.98 : 1 }}
                  >
                    <Button
                      variant={
                        selections[group.name] === variant.value
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() =>
                        variant.available && handleSelect(group.name, variant.value)
                      }
                      disabled={!variant.available}
                      className={cn(
                        "min-w-[70px]",
                        !variant.available && "opacity-50 line-through"
                      )}
                    >
                      {variant.name}
                      {variant.priceModifier && variant.priceModifier > 0 && (
                        <span className="ml-1 text-xs opacity-75">
                          +${variant.priceModifier}
                        </span>
                      )}
                    </Button>
                  </motion.div>
                ))}
          </div>
        </div>
      ))}
    </div>
  );
}

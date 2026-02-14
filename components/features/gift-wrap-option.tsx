"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface GiftWrapOption {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface GiftWrapSelectorProps {
  options: GiftWrapOption[];
  onSelect?: (option: GiftWrapOption | null) => void;
}

export function GiftWrapSelector({ options, onSelect }: GiftWrapSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [includeMessage, setIncludeMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleSelect = (option: GiftWrapOption) => {
    const newSelected = selected === option.id ? null : option.id;
    setSelected(newSelected);
    onSelect?.(newSelected ? option : null);
  };

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 p-2">
          <Gift className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">Gift Wrap Options</h3>
          <p className="text-sm text-muted-foreground">
            Make your gift extra special
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selected === option.id;

          return (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(option)}
              className={cn(
                "relative overflow-hidden rounded-lg border-2 p-3 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              )}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 rounded-full bg-primary p-1">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
              <div className="mb-2 aspect-video overflow-hidden rounded-lg">
                <img
                  src={option.image}
                  alt={option.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.name}</span>
                  <span className="font-semibold text-primary">
                    +${option.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {option.description}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-3"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeMessage}
              onChange={(e) => setIncludeMessage(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm font-medium">Include gift message</span>
          </label>

          {includeMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your gift message here..."
                maxLength={200}
                className="w-full rounded-lg border p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {message.length}/200 characters
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

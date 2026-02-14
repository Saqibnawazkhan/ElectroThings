"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: "USD", symbol: "$", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", flag: "🇦🇺" },
];

export function CurrencySelector({
  onChange,
}: {
  onChange?: (currency: Currency) => void;
}) {
  const [selected, setSelected] = useState<Currency>(currencies[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (currency: Currency) => {
    setSelected(currency);
    setIsOpen(false);
    onChange?.(currency);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border px-3 py-2 hover:bg-muted"
      >
        <DollarSign className="h-4 w-4" />
        <span className="font-medium">{selected.code}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 w-64 rounded-lg border bg-white shadow-xl z-50"
          >
            <div className="p-2">
              {currencies.map((currency) => {
                const isSelected = selected.code === currency.code;

                return (
                  <motion.button
                    key={currency.code}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                    onClick={() => handleSelect(currency)}
                    className="w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{currency.flag}</span>
                      <div>
                        <div className="font-medium">{currency.code}</div>
                        <div className="text-xs text-muted-foreground">
                          {currency.name}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-primary" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

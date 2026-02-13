"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, X, Check, Loader2, Percent, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PromoCode {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
  description: string;
  minOrder?: number;
}

// Mock valid promo codes
const validPromoCodes: PromoCode[] = [
  {
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    description: "10% off for new customers",
  },
  {
    code: "SAVE20",
    discount: 20,
    type: "fixed",
    description: "$20 off your order",
    minOrder: 100,
  },
  {
    code: "FLASH25",
    discount: 25,
    type: "percentage",
    description: "Flash sale - 25% off!",
    minOrder: 50,
  },
  {
    code: "FREESHIP",
    discount: 0,
    type: "fixed",
    description: "Free shipping on any order",
  },
];

interface PromoCodeInputProps {
  subtotal: number;
  onApply: (discount: number, code: string) => void;
  onRemove: () => void;
  appliedCode?: string;
  className?: string;
}

export function PromoCodeInput({
  subtotal,
  onApply,
  onRemove,
  appliedCode,
  className,
}: PromoCodeInputProps) {
  const [code, setCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const appliedPromo = appliedCode
    ? validPromoCodes.find((p) => p.code === appliedCode)
    : null;

  const handleApply = async () => {
    if (!code.trim()) {
      toast.error("Please enter a promo code");
      return;
    }

    setIsValidating(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const promo = validPromoCodes.find(
      (p) => p.code.toLowerCase() === code.toLowerCase()
    );

    if (!promo) {
      toast.error("Invalid promo code");
      setIsValidating(false);
      return;
    }

    if (promo.minOrder && subtotal < promo.minOrder) {
      toast.error(`Minimum order of $${promo.minOrder} required for this code`);
      setIsValidating(false);
      return;
    }

    const discount =
      promo.type === "percentage"
        ? (subtotal * promo.discount) / 100
        : promo.discount;

    onApply(discount, promo.code);
    toast.success(`Promo code applied! ${promo.description}`);
    setCode("");
    setIsValidating(false);
  };

  const handleRemove = () => {
    onRemove();
    toast.success("Promo code removed");
  };

  const handleSuggestionClick = (promoCode: string) => {
    setCode(promoCode);
    setShowSuggestions(false);
  };

  if (appliedPromo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950 dark:border-green-800",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
            {appliedPromo.type === "percentage" ? (
              <Percent className="h-4 w-4 text-green-600" />
            ) : (
              <Gift className="h-4 w-4 text-green-600" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-green-700 dark:text-green-300">
                {appliedPromo.code}
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                <Check className="mr-1 h-3 w-3" />
                Applied
              </Badge>
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">
              {appliedPromo.description}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="text-green-600 hover:text-green-700 hover:bg-green-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Enter promo code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="pl-9"
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
          />
        </div>
        <Button onClick={handleApply} disabled={isValidating || !code.trim()}>
          {isValidating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Apply"
          )}
        </Button>
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-lg border bg-background shadow-lg p-2"
          >
            <p className="text-xs text-muted-foreground px-2 mb-2">
              Available codes:
            </p>
            <div className="space-y-1">
              {validPromoCodes.map((promo) => (
                <button
                  key={promo.code}
                  onClick={() => handleSuggestionClick(promo.code)}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-md hover:bg-muted text-left transition-colors",
                    promo.minOrder && subtotal < promo.minOrder && "opacity-50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Tag className="h-3 w-3 text-primary" />
                    <span className="font-mono text-sm">{promo.code}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {promo.description}
                    {promo.minOrder && subtotal < promo.minOrder && (
                      <span className="text-destructive">
                        {" "}(Min ${promo.minOrder})
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

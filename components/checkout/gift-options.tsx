"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Check, Sparkles, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface GiftOption {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

const giftWrapOptions: GiftOption[] = [
  {
    id: "standard",
    name: "Standard Gift Wrap",
    price: 4.99,
    description: "Elegant wrapping paper with ribbon",
  },
  {
    id: "premium",
    name: "Premium Gift Box",
    price: 9.99,
    description: "Luxury gift box with tissue paper and bow",
  },
  {
    id: "eco",
    name: "Eco-Friendly Wrap",
    price: 5.99,
    description: "Recycled kraft paper with twine",
  },
];

interface GiftOptionsProps {
  onUpdate: (isGift: boolean, wrapOption: string | null, message: string) => void;
  className?: string;
}

export function GiftOptions({ onUpdate, className }: GiftOptionsProps) {
  const [isGift, setIsGift] = useState(false);
  const [selectedWrap, setSelectedWrap] = useState<string | null>(null);
  const [giftMessage, setGiftMessage] = useState("");
  const [includeReceipt, setIncludeReceipt] = useState(true);

  const handleGiftToggle = (checked: boolean) => {
    setIsGift(checked);
    if (!checked) {
      setSelectedWrap(null);
      setGiftMessage("");
    }
    onUpdate(checked, selectedWrap, giftMessage);
  };

  const handleWrapSelect = (value: string) => {
    setSelectedWrap(value);
    onUpdate(isGift, value, giftMessage);
  };

  const handleMessageChange = (value: string) => {
    setGiftMessage(value);
    onUpdate(isGift, selectedWrap, value);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Gift className="h-5 w-5" />
          Gift Options
        </h3>
        <Badge variant="outline" className="text-xs">
          <Sparkles className="mr-1 h-3 w-3" />
          Optional
        </Badge>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Gift Toggle */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="is-gift"
              checked={isGift}
              onCheckedChange={handleGiftToggle}
            />
            <div className="flex-1">
              <Label
                htmlFor="is-gift"
                className="font-medium cursor-pointer"
              >
                This order is a gift
              </Label>
              <p className="text-sm text-muted-foreground">
                We&apos;ll hide the price and add special wrapping
              </p>
            </div>
          </div>

          <AnimatePresence>
            {isGift && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Gift Wrap Options */}
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium mb-3 block">
                    Choose gift wrapping (optional)
                  </Label>
                  <RadioGroup value={selectedWrap || ""} onValueChange={handleWrapSelect}>
                    <div className="grid gap-3">
                      {giftWrapOptions.map((option, index) => (
                        <motion.div
                          key={option.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Label htmlFor={option.id} className="cursor-pointer">
                            <div
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg border transition-all",
                                selectedWrap === option.id
                                  ? "border-primary bg-primary/5"
                                  : "hover:border-muted-foreground/50"
                              )}
                            >
                              <RadioGroupItem value={option.id} id={option.id} />
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900 flex items-center justify-center">
                                <Gift
                                  className={cn(
                                    "h-6 w-6",
                                    option.id === "standard" && "text-pink-500",
                                    option.id === "premium" && "text-purple-500",
                                    option.id === "eco" && "text-green-500"
                                  )}
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{option.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {option.description}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">
                                  +${option.price.toFixed(2)}
                                </p>
                              </div>
                              {selectedWrap === option.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                                >
                                  <Check className="h-3 w-3 text-primary-foreground" />
                                </motion.div>
                              )}
                            </div>
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Gift Message */}
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium mb-2 block">
                    <MessageSquare className="inline mr-2 h-4 w-4" />
                    Add a gift message (optional)
                  </Label>
                  <Textarea
                    placeholder="Write a personal message to include with your gift..."
                    value={giftMessage}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    rows={3}
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {giftMessage.length}/200 characters
                  </p>
                </div>

                {/* Gift Receipt */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Checkbox
                    id="include-receipt"
                    checked={includeReceipt}
                    onCheckedChange={(checked) =>
                      setIncludeReceipt(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="include-receipt"
                    className="text-sm cursor-pointer"
                  >
                    Include a gift receipt (no prices shown)
                  </Label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

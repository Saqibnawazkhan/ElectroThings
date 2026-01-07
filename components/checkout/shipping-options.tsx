"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Truck, Zap, Clock, Package, Check, CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: React.ReactNode;
  recommended?: boolean;
}

const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "Regular delivery",
    price: 9.99,
    estimatedDays: "5-7 business days",
    icon: <Package className="h-5 w-5" />,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "Fast delivery",
    price: 19.99,
    estimatedDays: "2-3 business days",
    icon: <Truck className="h-5 w-5" />,
    recommended: true,
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next day delivery",
    price: 34.99,
    estimatedDays: "1 business day",
    icon: <Zap className="h-5 w-5" />,
  },
  {
    id: "scheduled",
    name: "Scheduled Delivery",
    description: "Choose your delivery date",
    price: 14.99,
    estimatedDays: "Pick a date",
    icon: <CalendarDays className="h-5 w-5" />,
  },
];

interface ShippingOptionsProps {
  subtotal: number;
  onSelect: (option: ShippingOption) => void;
  className?: string;
}

export function ShippingOptions({
  subtotal,
  onSelect,
  className,
}: ShippingOptionsProps) {
  const [selectedId, setSelectedId] = useState("express");
  const freeShippingThreshold = 100;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const option = shippingOptions.find((o) => o.id === id);
    if (option) {
      onSelect(option);
    }
  };

  // Calculate estimated delivery date
  const getEstimatedDate = (days: string) => {
    if (days === "Pick a date") return "Select date";
    const daysNum = parseInt(days.split("-")[1] || days.split(" ")[0]);
    const date = new Date();
    date.setDate(date.getDate() + daysNum);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Shipping Method
        </h3>
        {!qualifiesForFreeShipping && (
          <Badge variant="outline" className="text-xs">
            ${(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping
          </Badge>
        )}
      </div>

      <RadioGroup value={selectedId} onValueChange={handleSelect}>
        <div className="grid gap-3">
          {shippingOptions.map((option, index) => {
            const isFree = qualifiesForFreeShipping && option.id === "standard";
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Label htmlFor={option.id} className="cursor-pointer">
                  <Card
                    className={cn(
                      "transition-all",
                      selectedId === option.id
                        ? "border-primary ring-2 ring-primary ring-offset-2"
                        : "hover:border-muted-foreground/50",
                      option.recommended && "relative overflow-hidden"
                    )}
                  >
                    {option.recommended && (
                      <div className="absolute top-0 right-0">
                        <Badge className="rounded-none rounded-bl-lg">
                          Recommended
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <div
                          className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            option.id === "standard" && "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
                            option.id === "express" && "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
                            option.id === "overnight" && "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
                            option.id === "scheduled" && "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                          )}
                        >
                          {option.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{option.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{option.estimatedDays}</span>
                            <span>•</span>
                            <span>Est. {getEstimatedDate(option.estimatedDays)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {isFree ? (
                            <div>
                              <span className="font-semibold text-green-600">
                                FREE
                              </span>
                              <p className="text-xs text-muted-foreground line-through">
                                ${option.price.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <span className="font-semibold">
                              ${option.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {selectedId === option.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-center gap-2 mt-3 pt-3 border-t text-sm text-primary"
                        >
                          <Check className="h-4 w-4" />
                          Selected shipping method
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </Label>
              </motion.div>
            );
          })}
        </div>
      </RadioGroup>

      {qualifiesForFreeShipping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg text-green-700 dark:text-green-300"
        >
          <Check className="h-4 w-4" />
          <span className="text-sm">
            You qualify for free standard shipping!
          </span>
        </motion.div>
      )}
    </div>
  );
}

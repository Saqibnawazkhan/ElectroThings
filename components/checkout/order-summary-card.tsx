"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Package,
  Truck,
  Shield,
  Gift,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cart-store";
import { cn } from "@/lib/utils";

interface OrderSummaryCardProps {
  showItems?: boolean;
  discount?: number;
  discountCode?: string;
  className?: string;
}

export function OrderSummaryCard({
  showItems = true,
  discount = 0,
  discountCode,
  className,
}: OrderSummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { items, getSubtotal, getItemCount } = useCartStore();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = (subtotal - discount) * 0.08; // 8% tax
  const total = subtotal - discount + shipping + tax;

  const savings = items.reduce((acc, item) => {
    if (item.product.originalPrice) {
      return (
        acc +
        (item.product.originalPrice - item.product.price) * item.quantity
      );
    }
    return acc;
  }, 0);

  return (
    <Card className={cn("sticky top-24", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Summary
          </CardTitle>
          <Badge variant="secondary">{itemCount} items</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Items Preview */}
        {showItems && items.length > 0 && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full justify-between -mx-2 mb-2"
            >
              <span className="text-sm font-medium">
                {isExpanded ? "Hide" : "Show"} items
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  {items.slice(0, 3).map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted shrink-0">
                        <Image
                          src={
                            item.product.images[0] || "/images/placeholder.svg"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center">
                          {item.quantity}
                        </Badge>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{items.length - 3} more items
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <Separator className="my-4" />
          </div>
        )}

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discount > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex justify-between text-sm text-green-600"
            >
              <span className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                Discount
                {discountCode && (
                  <Badge variant="outline" className="text-xs ml-1">
                    {discountCode}
                  </Badge>
                )}
              </span>
              <span>-${discount.toFixed(2)}</span>
            </motion.div>
          )}

          {savings > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span className="flex items-center gap-1">
                <Gift className="h-3 w-3" />
                You save
              </span>
              <span>-${savings.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <Truck className="h-3 w-3" />
              Shipping
            </span>
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              <span>${shipping.toFixed(2)}</span>
            )}
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">Total</span>
          <span className="font-bold text-2xl">${total.toFixed(2)}</span>
        </div>

        {/* Free Shipping Progress */}
        {shipping > 0 && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-4 w-4 text-primary" />
              <span>
                Add{" "}
                <span className="font-semibold">${(100 - subtotal).toFixed(2)}</span>{" "}
                more for free shipping!
              </span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((subtotal / 100) * 100, 100)}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            Secure
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Truck className="h-3 w-3" />
            Fast Delivery
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Gift className="h-3 w-3" />
            Gift Options
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

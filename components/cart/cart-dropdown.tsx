"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCartStore } from "@/lib/store/cart-store";

export function CartDropdown() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, getSubtotal, getItemCount } = useCartStore();
  const itemCount = getItemCount();
  const subtotal = getSubtotal();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {mounted && itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Shopping Cart</h3>
            <span className="text-sm text-muted-foreground">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-6 text-center">
            <ShoppingCart className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground mb-4">
              Your cart is empty
            </p>
            <Link href="/products" onClick={() => setIsOpen(false)}>
              <Button variant="outline" size="sm">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[300px]">
              <AnimatePresence mode="popLayout">
                {items.slice(0, 5).map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="p-3 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="relative w-14 h-14 rounded-md overflow-hidden bg-muted shrink-0"
                      >
                        <Image
                          src={item.product.images[0] || "/images/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="text-sm font-medium hover:text-primary line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length > 5 && (
                <div className="p-3 text-center text-sm text-muted-foreground">
                  +{items.length - 5} more items
                </div>
              )}
            </ScrollArea>

            <Separator />

            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full" size="sm">
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={() => setIsOpen(false)}>
                  <Button className="w-full" size="sm">
                    Checkout
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

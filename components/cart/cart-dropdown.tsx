"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
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
import { cn } from "@/lib/utils";

export function CartDropdown() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { items, removeItem, getSubtotal, getItemCount } = useCartStore();
  const itemCount = getItemCount();
  const subtotal = getSubtotal();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger animation when item count changes
  useEffect(() => {
    if (itemCount > 0) {
      setJustAdded(true);
      const timer = setTimeout(() => setJustAdded(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative overflow-visible",
            justAdded && "animate-bounce"
          )}
        >
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.div>
          <AnimatePresence>
            {mounted && itemCount > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                className="absolute -top-1 -right-1"
              >
                <Badge
                  variant="destructive"
                  className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0 shadow-lg shadow-red-500/30"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Shine effect */}
          {mounted && itemCount > 0 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl" align="end">
        <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/5 to-purple-500/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ShoppingBag className="h-5 w-5 text-primary" />
              </motion.div>
              <h3 className="font-semibold">Shopping Cart</h3>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </Badge>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative mx-auto w-20 h-20 mb-4"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full animate-pulse" />
              <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-muted-foreground" />
              </div>
            </motion.div>
            <p className="text-sm font-medium mb-1">Your cart is empty</p>
            <p className="text-xs text-muted-foreground mb-4">
              Add items to get started
            </p>
            <Link href="/products" onClick={() => setIsOpen(false)}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="bg-gradient-to-r from-primary to-purple-600">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Start Shopping
                </Button>
              </motion.div>
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

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, ShoppingCart, Trash2, MoveUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cart-store";
import { Product } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Save for later store using localStorage
function useSaveForLater() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("save-for-later");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const addItem = (product: Product) => {
    const newItems = [...items, product];
    setItems(newItems);
    localStorage.setItem("save-for-later", JSON.stringify(newItems));
  };

  const removeItem = (productId: string) => {
    const newItems = items.filter((item) => item.id !== productId);
    setItems(newItems);
    localStorage.setItem("save-for-later", JSON.stringify(newItems));
  };

  const isInSaveForLater = (productId: string) => {
    return items.some((item) => item.id === productId);
  };

  return { items, addItem, removeItem, isInSaveForLater };
}

interface SaveForLaterProps {
  className?: string;
}

export function SaveForLater({ className }: SaveForLaterProps) {
  const [mounted, setMounted] = useState(false);
  const { items, removeItem } = useSaveForLater();
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMoveToCart = (product: Product) => {
    addToCart(product);
    removeItem(product.id);
    toast.success("Moved to cart");
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
    toast.success("Removed from saved items");
  };

  if (!mounted || items.length === 0) return null;

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bookmark className="h-5 w-5" />
          Saved for Later
          <Badge variant="secondary">{items.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                {/* Product Image */}
                <Link
                  href={`/products/${product.slug}`}
                  className="relative w-16 h-16 rounded-md overflow-hidden bg-muted shrink-0"
                >
                  <Image
                    src={product.images[0] || "/images/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-medium text-sm hover:text-primary line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <p className="text-sm font-semibold mt-1">
                    ${product.price}
                    {product.originalPrice && (
                      <span className="ml-2 text-xs text-muted-foreground line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </p>
                  {product.stock === 0 && (
                    <Badge variant="secondary" className="mt-1 text-xs">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleMoveToCart(product)}
                    disabled={product.stock === 0}
                    title="Move to cart"
                  >
                    <MoveUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    onClick={() => handleRemove(product.id)}
                    title="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {items.length > 0 && (
          <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Items saved for 30 days</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => {
                items.forEach((item) => {
                  if (item.stock > 0) {
                    addToCart(item);
                    removeItem(item.id);
                  }
                });
                toast.success("All available items moved to cart");
              }}
            >
              <ShoppingCart className="mr-1 h-3 w-3" />
              Move all to cart
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Export hook for use in other components
export { useSaveForLater };

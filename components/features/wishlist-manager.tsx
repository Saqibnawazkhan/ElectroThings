"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ShoppingCart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface WishlistManagerProps {
  items: WishlistItem[];
  onRemove?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onShare?: () => void;
}

export function WishlistManager({
  items,
  onRemove,
  onAddToCart,
  onShare,
}: WishlistManagerProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Wishlist</h2>
          <p className="text-muted-foreground">{items.length} items</p>
        </div>
        {onShare && items.length > 0 && (
          <button
            onClick={onShare}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted"
          >
            <Share2 className="h-4 w-4" />
            Share Wishlist
          </button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold line-clamp-2">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">
                    ${item.price}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      item.inStock ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {onAddToCart && (
                  <button
                    onClick={() => onAddToCart(item.id)}
                    disabled={!item.inStock}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </button>
                )}
                {onRemove && (
                  <button
                    onClick={() => onRemove(item.id)}
                    className="rounded-lg border p-2 hover:bg-red-50 hover:border-red-500 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-muted-foreground">
            Start adding items you love to your wishlist
          </p>
        </motion.div>
      )}
    </div>
  );
}

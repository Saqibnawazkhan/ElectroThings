"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/product-grid";
import { useWishlistStore } from "@/lib/store/wishlist-store";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { items, clearWishlist } = useWishlistStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
          <p className="text-muted-foreground mb-6">
            Save items you love to your wishlist. Review them anytime and easily
            move them to cart.
          </p>
          <Link href="/products">
            <Button size="lg">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Start Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-muted-foreground mt-1">
              {items.length} {items.length === 1 ? "item" : "items"} saved
            </p>
          </div>
          <Button variant="outline" onClick={clearWishlist}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>

        <AnimatePresence mode="popLayout">
          <ProductGrid products={items} />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

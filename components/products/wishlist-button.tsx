"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { Product } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: Product;
  variant?: "default" | "icon";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function WishlistButton({
  product,
  variant = "default",
  size = "sm",
  className,
}: WishlistButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (isWishlisted) {
      removeItem(product.id);
      toast.success("Removed from wishlist");
    } else {
      addItem(product);
      toast.success("Added to wishlist");
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size={variant === "icon" ? "icon" : size}
        className={className}
      >
        <Heart className={cn(variant === "icon" ? "h-5 w-5" : "mr-2 h-4 w-4")} />
        {variant !== "icon" && "Add to Wishlist"}
      </Button>
    );
  }

  if (variant === "icon") {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggle}
        className={cn(
          "relative overflow-hidden",
          isWishlisted && "bg-red-50 border-red-200 hover:bg-red-100 dark:bg-red-950 dark:border-red-800",
          className
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isWishlisted ? "filled" : "empty"}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
              )}
            />
          </motion.div>
        </AnimatePresence>

        {/* Heart burst animation */}
        <AnimatePresence>
          {isWishlisted && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute w-1 h-1 bg-red-500 rounded-full"
                  initial={{ scale: 0, x: 0, y: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    x: Math.cos((i * 60 * Math.PI) / 180) * 20,
                    y: Math.sin((i * 60 * Math.PI) / 180) * 20,
                  }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size={size}
      onClick={handleToggle}
      className={cn(
        "relative overflow-hidden transition-colors",
        isWishlisted && "bg-red-50 border-red-200 text-red-600 hover:bg-red-100 hover:text-red-700 dark:bg-red-950 dark:border-red-800 dark:text-red-400",
        className
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={isWishlisted ? "remove" : "add"}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center"
        >
          <Heart
            className={cn(
              "mr-2 h-4 w-4 transition-colors",
              isWishlisted && "fill-current"
            )}
          />
          {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
        </motion.div>
      </AnimatePresence>
    </Button>
  );
}

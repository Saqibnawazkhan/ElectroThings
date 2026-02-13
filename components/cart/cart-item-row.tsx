"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { Product } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CartItemRowProps {
  product: Product;
  quantity: number;
}

export function CartItemRow({ product, quantity }: CartItemRowProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(quantity.toString());
  const { updateQuantity, removeItem } = useCartStore();
  const { addItem: addToWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }
    updateQuantity(product.id, newQuantity);
    setLocalQuantity(newQuantity.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuantity(value);
  };

  const handleInputBlur = () => {
    const parsed = parseInt(localQuantity);
    if (isNaN(parsed) || parsed < 1) {
      setLocalQuantity(quantity.toString());
    } else if (parsed > product.stock) {
      setLocalQuantity(product.stock.toString());
      updateQuantity(product.id, product.stock);
    } else {
      updateQuantity(product.id, parsed);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeItem(product.id);
      toast.success("Item removed from cart");
    }, 300);
  };

  const handleMoveToWishlist = () => {
    addToWishlist(product);
    removeItem(product.id);
    toast.success("Moved to wishlist");
  };

  const itemTotal = product.price * quantity;
  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -100, height: 0 }}
          className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
        >
          {/* Product Image */}
          <Link
            href={`/products/${product.slug}`}
            className="relative w-full sm:w-28 h-28 rounded-lg overflow-hidden bg-muted shrink-0"
          >
            <Image
              src={product.images[0] || "/images/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform"
              sizes="112px"
            />
            {discount > 0 && (
              <Badge
                variant="destructive"
                className="absolute top-1 left-1 text-xs"
              >
                -{discount}%
              </Badge>
            )}
          </Link>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <Link
                  href={`/products/${product.slug}`}
                  className="font-medium hover:text-primary transition-colors line-clamp-2"
                >
                  {product.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.category}
                </p>
                {product.stock < 10 && (
                  <p className="text-xs text-orange-600 mt-1">
                    Only {product.stock} left in stock
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">${itemTotal.toFixed(2)}</p>
                {quantity > 1 && (
                  <p className="text-xs text-muted-foreground">
                    ${product.price} each
                  </p>
                )}
                {product.originalPrice && (
                  <p className="text-xs text-muted-foreground line-through">
                    ${(product.originalPrice * quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input
                    type="text"
                    value={localQuantity}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-12 h-8 text-center border-0 focus-visible:ring-0 p-0"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Quick quantity buttons */}
                {product.stock >= 5 && (
                  <div className="hidden sm:flex gap-1">
                    {[2, 5].map((q) => (
                      <Button
                        key={q}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-8 px-2 text-xs",
                          quantity === q && "bg-muted"
                        )}
                        onClick={() => handleQuantityChange(q)}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-8 px-2 text-xs",
                    inWishlist && "text-red-500"
                  )}
                  onClick={handleMoveToWishlist}
                >
                  {inWishlist ? (
                    <Check className="h-4 w-4 mr-1" />
                  ) : (
                    <Heart className="h-4 w-4 mr-1" />
                  )}
                  <span className="hidden sm:inline">
                    {inWishlist ? "In Wishlist" : "Save"}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-destructive hover:text-destructive"
                  onClick={handleRemove}
                >
                  <Trash2 className="h-4 w-4 sm:mr-1" />
                  <span className="hidden sm:inline">Remove</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

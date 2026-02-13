"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { useCartStore } from "@/lib/store/cart-store";
import { useQuickViewStore } from "@/lib/store/quick-view-store";
import { toast } from "sonner";

interface ProductHoverCardProps {
  product: Product;
  children: React.ReactNode;
}

export function ProductHoverCard({ product, children }: ProductHoverCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        className="w-80 p-0 overflow-hidden"
        side="right"
        align="start"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Product Image */}
          <div className="relative h-48 bg-muted">
            <Image
              src={product.images[0] || "/images/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="320px"
            />
            {discount > 0 && (
              <Badge className="absolute top-2 left-2" variant="destructive">
                -{discount}%
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge className="absolute top-2 right-2" variant="secondary">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {product.category}
              </p>
              <Link
                href={`/products/${product.slug}`}
                className="font-semibold hover:text-primary transition-colors line-clamp-1"
              >
                {product.name}
              </Link>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Stock */}
            {product.stock > 0 && product.stock < 10 && (
              <p className="text-sm text-orange-600">
                Only {product.stock} left in stock
              </p>
            )}

            {/* Description Preview */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openQuickView(product);
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  );
}

// Category hover card
interface CategoryHoverCardProps {
  name: string;
  slug: string;
  productCount: number;
  image: string;
  children: React.ReactNode;
}

export function CategoryHoverCard({
  name,
  slug,
  productCount,
  image,
  children,
}: CategoryHoverCardProps) {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-64 p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative h-32 bg-muted">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
              sizes="256px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-white/80">{productCount} products</p>
            </div>
          </div>
          <div className="p-3">
            <Link href={`/categories/${slug}`}>
              <Button size="sm" className="w-full">
                Browse Category
              </Button>
            </Link>
          </div>
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Heart, Eye, GitCompare, Sparkles } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/cart-store";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { useQuickViewStore } from "@/lib/store/quick-view-store";
import { useCompareStore } from "@/lib/store/compare-store";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductCardBadge } from "@/components/products/product-badges";
import { TiltCard } from "@/components/ui/tilt-card";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const openQuickView = useQuickViewStore((state) => state.openQuickView);
  const { addItem: addToCompare, removeItem: removeFromCompare, isInCompare, canAdd } = useCompareStore();
  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(product);
      toast.success("Added to wishlist");
    }
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product.id);
      toast.success("Removed from comparison");
    } else {
      if (!canAdd()) {
        toast.error("You can compare up to 4 products");
        return;
      }
      addToCompare(product);
      toast.success("Added to comparison");
    }
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        type: "spring",
        stiffness: 100
      }}
      style={{ perspective: 1000 }}
    >
      <TiltCard tiltAmount={8} glareEnable={true} scale={1.03}>
        <Link href={`/products/${product.slug}`}>
          <Card className="group h-full overflow-hidden transition-all duration-500 border-2 border-transparent hover:border-primary/20 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)] dark:hover:shadow-[0_20px_50px_rgba(120,_119,_198,_0.3)] bg-gradient-to-br from-background via-background to-muted/30">
            {/* 3D Floating glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
              {/* 3D Image container */}
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.1, rotateY: 5 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted via-muted/50 to-background">
                    <div className="text-center p-8">
                      <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground/40 mb-4" />
                      <p className="text-sm text-muted-foreground font-medium">{product.name}</p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={product.images[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onError={() => setImageError(true)}
                    priority={index < 4}
                    unoptimized
                  />
                )}
              </motion.div>

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                initial={{ y: 20 }}
                whileHover={{ y: 0 }}
              />

              {/* Sparkle effect on hover */}
              <motion.div
                className="absolute top-4 right-4 text-yellow-400"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileHover={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="h-6 w-6 animate-pulse" />
              </motion.div>

              {/* Action buttons with 3D pop effect */}
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0 }}
                      >
                        <Button
                          variant={inWishlist ? "default" : "secondary"}
                          size="icon"
                          className="h-9 w-9 shadow-lg backdrop-blur-sm bg-background/80 hover:scale-110 transition-transform duration-200"
                          onClick={handleWishlist}
                        >
                          <Heart className={`h-4 w-4 ${inWishlist ? "fill-current" : ""}`} />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.05 }}
                      >
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-9 w-9 shadow-lg backdrop-blur-sm bg-background/80 hover:scale-110 transition-transform duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openQuickView(product);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Quick View</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Button
                          variant={inCompare ? "default" : "secondary"}
                          size="icon"
                          className="h-9 w-9 shadow-lg backdrop-blur-sm bg-background/80 hover:scale-110 transition-transform duration-200"
                          onClick={handleCompare}
                        >
                          <GitCompare className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>{inCompare ? "Remove from Compare" : "Add to Compare"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              {/* Top-left badges with 3D effect */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                {discount > 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Badge className="shadow-lg bg-gradient-to-r from-red-500 to-pink-500 border-0" variant="destructive">
                      -{discount}% OFF
                    </Badge>
                  </motion.div>
                )}
                <ProductCardBadge
                  productId={product.id}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  stock={product.stock}
                />
              </div>

              {/* Bottom-left stock badges */}
              {product.stock < 10 && product.stock > 0 && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="absolute bottom-2 left-2"
                >
                  <Badge variant="secondary" className="backdrop-blur-sm bg-background/80 shadow-lg">
                    Only {product.stock} left
                  </Badge>
                </motion.div>
              )}
              {product.stock === 0 && (
                <Badge className="absolute bottom-2 left-2 backdrop-blur-sm" variant="outline">
                  Out of Stock
                </Badge>
              )}
            </div>

            <CardContent className="p-4 relative">
              {/* Subtle 3D depth line */}
              <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">
                {product.category}
              </p>
              <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">
                {product.name}
              </h3>
              <div className="flex items-center gap-1 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Star
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]"
                            : "fill-muted text-muted"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.reviewCount})
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <motion.span
                  className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  ${product.price}
                </motion.span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <motion.div
                className="w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{ translateX: ["−100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:animate-bounce relative z-10" />
                  <span className="relative z-10">
                    {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </span>
                </Button>
              </motion.div>
            </CardFooter>
          </Card>
        </Link>
      </TiltCard>
    </motion.div>
  );
}

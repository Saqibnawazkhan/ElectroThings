"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronUp, ChevronDown, Star, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCompareStore } from "@/lib/store/compare-store";
import { cn } from "@/lib/utils";

export function CompareDrawer() {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { items, removeItem, clearAll } = useCompareStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  const allSpecs = items.reduce((acc, product) => {
    if (product.specifications) {
      Object.keys(product.specifications).forEach((key) => {
        if (!acc.includes(key)) acc.push(key);
      });
    }
    return acc;
  }, [] as string[]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <Badge variant="secondary">{items.length}/4</Badge>
            <span className="font-semibold">Compare Products</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                clearAll();
              }}
            >
              Clear All
            </Button>
            <Button variant="ghost" size="icon">
              {isExpanded ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronUp className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Compact View */}
        {!isExpanded && (
          <div className="px-4 pb-3">
            <div className="flex gap-3">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0"
                >
                  <Image
                    src={product.images[0] || "/images/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {items.length < 4 &&
                Array.from({ length: 4 - items.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-16 h-16 rounded-lg border-2 border-dashed border-muted-foreground/30 shrink-0 flex items-center justify-center"
                  >
                    <span className="text-xs text-muted-foreground">+</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Expanded Comparison Table */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <ScrollArea className="w-full">
                <div className="min-w-[600px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-t">
                        <th className="p-4 text-left w-40 bg-muted/50">
                          Product
                        </th>
                        {items.map((product) => (
                          <th
                            key={product.id}
                            className="p-4 min-w-[200px] border-l"
                          >
                            <div className="relative">
                              <button
                                onClick={() => removeItem(product.id)}
                                className="absolute -top-2 -right-2 bg-muted rounded-full p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <Link
                                href={`/products/${product.slug}`}
                                className="block"
                              >
                                <div className="relative w-24 h-24 mx-auto rounded-lg overflow-hidden bg-muted">
                                  <Image
                                    src={
                                      product.images[0] ||
                                      "/images/placeholder.svg"
                                    }
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="96px"
                                  />
                                </div>
                                <p className="mt-2 font-medium text-sm line-clamp-2 hover:text-primary">
                                  {product.name}
                                </p>
                              </Link>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Price */}
                      <tr className="border-t">
                        <td className="p-4 font-medium bg-muted/50">Price</td>
                        {items.map((product) => (
                          <td
                            key={product.id}
                            className="p-4 text-center border-l"
                          >
                            <span className="text-lg font-bold">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="ml-2 text-sm text-muted-foreground line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>

                      {/* Rating */}
                      <tr className="border-t">
                        <td className="p-4 font-medium bg-muted/50">Rating</td>
                        {items.map((product) => (
                          <td
                            key={product.id}
                            className="p-4 text-center border-l"
                          >
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{product.rating}</span>
                              <span className="text-muted-foreground text-sm">
                                ({product.reviewCount})
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Stock */}
                      <tr className="border-t">
                        <td className="p-4 font-medium bg-muted/50">
                          Availability
                        </td>
                        {items.map((product) => (
                          <td
                            key={product.id}
                            className="p-4 text-center border-l"
                          >
                            {product.stock > 0 ? (
                              <span className="text-green-600 flex items-center justify-center gap-1">
                                <Check className="h-4 w-4" />
                                In Stock
                              </span>
                            ) : (
                              <span className="text-red-500">Out of Stock</span>
                            )}
                          </td>
                        ))}
                      </tr>

                      {/* Category */}
                      <tr className="border-t">
                        <td className="p-4 font-medium bg-muted/50">Category</td>
                        {items.map((product) => (
                          <td
                            key={product.id}
                            className="p-4 text-center border-l"
                          >
                            {product.category}
                          </td>
                        ))}
                      </tr>

                      {/* Specifications */}
                      {allSpecs.map((spec) => (
                        <tr key={spec} className="border-t">
                          <td className="p-4 font-medium bg-muted/50">{spec}</td>
                          {items.map((product) => (
                            <td
                              key={product.id}
                              className="p-4 text-center border-l"
                            >
                              {product.specifications?.[spec] || (
                                <Minus className="h-4 w-4 mx-auto text-muted-foreground" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

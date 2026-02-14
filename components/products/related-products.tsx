"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
}

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  onAddToCart?: (id: string) => void;
  onWishlist?: (id: string) => void;
}

export function RelatedProducts({
  products,
  title = "You May Also Like",
  onAddToCart,
  onWishlist,
}: RelatedProductsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{title}</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-square overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>

            <div className="absolute top-2 right-2 flex flex-col gap-2">
              {onWishlist && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onWishlist(product.id)}
                  className="rounded-full bg-white p-2 shadow-lg hover:bg-red-50"
                >
                  <Heart className="h-4 w-4" />
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-full bg-white p-2 shadow-lg hover:bg-blue-50"
              >
                <Eye className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="p-4 space-y-3">
              <h3 className="font-semibold line-clamp-2 min-h-[3em]">
                {product.name}
              </h3>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ${product.price}
                </span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span>★</span>
                </div>
              </div>

              {onAddToCart && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAddToCart(product.id)}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

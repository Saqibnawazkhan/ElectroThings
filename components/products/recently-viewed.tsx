"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRecentlyViewedStore } from "@/lib/store/recently-viewed-store";

export function RecentlyViewed() {
  const [mounted, setMounted] = useState(false);
  const items = useRecentlyViewedStore((state) => state.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || items.length === 0) return null;

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Recently Viewed</h2>
            </div>
            <Link href="/products">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {items.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="group w-[140px] sm:w-[160px]">
                    <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                      <Image
                        src={product.images[0] || "/images/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="160px"
                      />
                    </div>
                    <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold">${product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

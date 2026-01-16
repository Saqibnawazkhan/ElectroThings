"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/data";
import { Product } from "@/types";

const trendingSearches = [
  "iPhone",
  "Headphones",
  "Gaming",
  "Laptop",
  "Smartwatch",
];

interface SearchBarProps {
  className?: string;
  onClose?: () => void;
}

export function SearchBar({ className, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length >= 2) {
      const products = getProducts();
      const filtered = products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(query.length > 0);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setIsOpen(false);
      onClose?.();
    }
  };

  const handleSuggestionClick = (slug: string) => {
    router.push(`/products/${slug}`);
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  const handleTrendingClick = (term: string) => {
    router.push(`/products?search=${encodeURIComponent(term)}`);
    setQuery("");
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch}>
        <motion.div
          className="relative"
          whileFocus={{ scale: 1.02 }}
        >
          <motion.div
            className="absolute left-3 top-1/2 -translate-y-1/2"
            animate={{
              scale: isOpen ? 1.1 : 1,
              color: isOpen ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"
            }}
            transition={{ duration: 0.2 }}
          >
            <Search className="h-4 w-4" />
          </motion.div>
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search products..."
            className="pl-10 pr-10 w-full bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 focus:border-primary focus:bg-background focus:shadow-lg focus:shadow-primary/10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          <AnimatePresence>
            {query && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hover:bg-red-500/10 hover:text-red-500"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 rounded-md pointer-events-none"
            animate={{
              boxShadow: isOpen
                ? "0 0 0 2px hsl(var(--primary) / 0.2), 0 0 20px hsl(var(--primary) / 0.1)"
                : "0 0 0 0px transparent",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-xl overflow-hidden z-50"
          >
            {suggestions.length > 0 ? (
              <div className="p-2">
                <p className="text-xs text-muted-foreground px-2 pb-2 flex items-center gap-1">
                  <Search className="h-3 w-3" />
                  Products
                </p>
                {suggestions.map((product, index) => (
                  <motion.button
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-all duration-200 text-left group"
                    onClick={() => handleSuggestionClick(product.slug)}
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                      <Image
                        src={product.images[0] || "/images/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="text-primary font-semibold">${product.price}</span>
                        <span className="mx-2">•</span>
                        {product.category}
                      </p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      className="text-primary"
                    >
                      →
                    </motion.div>
                  </motion.button>
                ))}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="border-t border-border/50 mt-2 pt-2"
                >
                  <button
                    className="w-full text-sm text-primary hover:bg-primary/5 rounded-lg text-left px-3 py-2 transition-colors flex items-center gap-2"
                    onClick={handleSearch}
                  >
                    <Search className="h-4 w-4" />
                    See all results for &quot;{query}&quot;
                  </button>
                </motion.div>
              </div>
            ) : query.length === 0 ? (
              <div className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </motion.div>
                  <span className="text-sm font-medium">Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term, index) => (
                    <motion.button
                      key={term}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm bg-gradient-to-r from-muted to-muted/50 rounded-full hover:from-primary/10 hover:to-purple-500/10 hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/20"
                      onClick={() => handleTrendingClick(term)}
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center"
                >
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                </motion.div>
                <p className="text-muted-foreground text-sm">
                  No products found for &quot;{query}&quot;
                </p>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Try a different search term
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

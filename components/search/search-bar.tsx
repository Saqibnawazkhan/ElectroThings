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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Search products..."
            className="pl-10 pr-10 w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg overflow-hidden z-50"
          >
            {suggestions.length > 0 ? (
              <div className="p-2">
                <p className="text-xs text-muted-foreground px-2 pb-2">Products</p>
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-muted transition-colors text-left"
                    onClick={() => handleSuggestionClick(product.slug)}
                  >
                    <div className="relative w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product.images[0] || "/images/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">${product.price}</p>
                    </div>
                  </button>
                ))}
                <div className="border-t mt-2 pt-2">
                  <button
                    className="w-full text-sm text-primary hover:underline text-left px-2 py-1"
                    onClick={handleSearch}
                  >
                    See all results for &quot;{query}&quot;
                  </button>
                </div>
              </div>
            ) : query.length === 0 ? (
              <div className="p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-3">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term) => (
                    <button
                      key={term}
                      className="px-3 py-1.5 text-sm bg-muted rounded-full hover:bg-muted/80 transition-colors"
                      onClick={() => handleTrendingClick(term)}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No products found for &quot;{query}&quot;
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

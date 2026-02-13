"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, Grid2X2, LayoutList, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

interface ProductSortBarProps {
  productCount: number;
  searchTerm?: string;
}

const sortOptions = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
  { value: "rating", label: "Best Rating" },
  { value: "newest", label: "Newest First" },
];

export function ProductSortBar({ productCount, searchTerm }: ProductSortBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sortBy") || "default";
  const viewMode = searchParams.get("view") || "grid";

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "" || value === "default") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      return newParams.toString();
    },
    [searchParams]
  );

  const updateSort = (value: string) => {
    const queryString = createQueryString({ sortBy: value });
    router.push(`/products${queryString ? `?${queryString}` : ""}`);
  };

  const updateView = (value: string) => {
    if (!value) return;
    const queryString = createQueryString({ view: value });
    router.push(`/products${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b"
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Package className="h-4 w-4" />
        <span className="text-sm">
          <span className="font-semibold text-foreground">{productCount}</span>{" "}
          product{productCount !== 1 ? "s" : ""} found
          {searchTerm && (
            <span>
              {" "}for{" "}
              <span className="font-medium text-foreground">&quot;{searchTerm}&quot;</span>
            </span>
          )}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
          <Select value={currentSort} onValueChange={updateSort}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <ToggleGroup
          type="single"
          value={viewMode}
          onValueChange={updateView}
          className="hidden sm:flex"
        >
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid2X2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            <LayoutList className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </motion.div>
  );
}

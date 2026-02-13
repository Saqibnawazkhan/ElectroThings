"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Category } from "@/types";

interface ProductFiltersProps {
  categories: Category[];
}

const MAX_PRICE = 2000;

export function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);

  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sortBy") || "";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  // Sync price range with URL params
  useEffect(() => {
    const min = currentMinPrice ? parseInt(currentMinPrice) : 0;
    const max = currentMaxPrice ? parseInt(currentMaxPrice) : MAX_PRICE;
    setPriceRange([min, max]);
  }, [currentMinPrice, currentMaxPrice]);

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      return newParams.toString();
    },
    [searchParams]
  );

  const updateFilter = (key: string, value: string | null) => {
    const queryString = createQueryString({ [key]: value });
    router.push(`/products${queryString ? `?${queryString}` : ""}`);
  };

  const updatePriceRange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyPriceRange = () => {
    const queryString = createQueryString({
      minPrice: priceRange[0] > 0 ? priceRange[0].toString() : null,
      maxPrice: priceRange[1] < MAX_PRICE ? priceRange[1].toString() : null,
    });
    router.push(`/products${queryString ? `?${queryString}` : ""}`);
  };

  const clearFilters = () => {
    setPriceRange([0, MAX_PRICE]);
    router.push("/products");
  };

  const hasActiveFilters =
    currentCategory || currentSort || currentMinPrice || currentMaxPrice;

  const activeFilterCount = [
    currentCategory,
    currentSort,
    currentMinPrice || currentMaxPrice,
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Active Filters */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            <Label className="text-muted-foreground">Active Filters</Label>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-auto py-1 px-2 text-xs"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentCategory && (
              <Badge variant="secondary" className="gap-1">
                {categories.find((c) => c.slug === currentCategory)?.name}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("category", null)}
                />
              </Badge>
            )}
            {(currentMinPrice || currentMaxPrice) && (
              <Badge variant="secondary" className="gap-1">
                ${currentMinPrice || 0} - ${currentMaxPrice || MAX_PRICE}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => {
                    setPriceRange([0, MAX_PRICE]);
                    const queryString = createQueryString({
                      minPrice: null,
                      maxPrice: null,
                    });
                    router.push(`/products${queryString ? `?${queryString}` : ""}`);
                  }}
                />
              </Badge>
            )}
          </div>
          <Separator />
        </motion.div>
      )}

      <Accordion type="multiple" defaultValue={["category", "price"]} className="w-full">
        {/* Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Category
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              <Button
                variant={!currentCategory ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => updateFilter("category", null)}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.slug}
                  variant={currentCategory === category.slug ? "secondary" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => updateFilter("category", category.slug)}
                >
                  {category.name}
                  <span className="text-muted-foreground text-xs">
                    {category.productCount}
                  </span>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Price Range
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2 px-1">
              <Slider
                value={priceRange}
                onValueChange={updatePriceRange}
                max={MAX_PRICE}
                step={10}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">${priceRange[0]}</span>
                <span className="text-muted-foreground">to</span>
                <span className="font-medium">${priceRange[1]}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={applyPriceRange}
              >
                Apply Price Filter
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            {hasActiveFilters && (
              <Badge variant="secondary">{activeFilterCount}</Badge>
            )}
          </div>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCompareStore } from "@/lib/store/compare-store";
import { Product } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CompareButtonProps {
  product: Product;
  variant?: "icon" | "default";
  className?: string;
}

export function CompareButton({
  product,
  variant = "icon",
  className,
}: CompareButtonProps) {
  const [mounted, setMounted] = useState(false);
  const { addItem, removeItem, isInCompare, canAdd } = useCompareStore();
  const inCompare = isInCompare(product.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    if (inCompare) {
      removeItem(product.id);
      toast.success("Removed from comparison");
    } else {
      if (!canAdd()) {
        toast.error("You can compare up to 4 products");
        return;
      }
      addItem(product);
      toast.success("Added to comparison");
    }
  };

  if (!mounted) {
    return variant === "icon" ? (
      <Button variant="secondary" size="icon" className={className}>
        <GitCompare className="h-4 w-4" />
      </Button>
    ) : (
      <Button variant="outline" size="sm" className={className}>
        <GitCompare className="mr-2 h-4 w-4" />
        Compare
      </Button>
    );
  }

  if (variant === "icon") {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={inCompare ? "default" : "secondary"}
            size="icon"
            onClick={handleToggle}
            className={cn(
              "transition-colors",
              inCompare && "bg-primary text-primary-foreground",
              className
            )}
          >
            <motion.div
              animate={{ rotate: inCompare ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <GitCompare className="h-4 w-4" />
            </motion.div>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {inCompare ? "Remove from compare" : "Add to compare"}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button
      variant={inCompare ? "default" : "outline"}
      size="sm"
      onClick={handleToggle}
      className={className}
    >
      <GitCompare className="mr-2 h-4 w-4" />
      {inCompare ? "In Compare" : "Compare"}
    </Button>
  );
}

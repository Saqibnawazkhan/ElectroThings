"use client";

import { motion } from "framer-motion";
import { X, Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  specs: Record<string, string | number | boolean>;
}

interface ComparisonPanelProps {
  products: Product[];
  onRemove?: (id: string) => void;
  onClose?: () => void;
}

export function ProductComparisonPanel({
  products,
  onRemove,
  onClose,
}: ComparisonPanelProps) {
  if (products.length === 0) {
    return null;
  }

  // Get all unique spec keys
  const allSpecs = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl"
    >
      <div className="container mx-auto max-w-7xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Compare Products</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white p-4 text-left font-semibold">
                  Feature
                </th>
                {products.map((product) => (
                  <th key={product.id} className="p-4 min-w-[200px]">
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-24 w-24 object-cover rounded-lg"
                        />
                        {onRemove && (
                          <button
                            onClick={() => onRemove(product.id)}
                            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-lg font-bold text-primary">
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allSpecs.map((spec, index) => (
                <tr
                  key={spec}
                  className={cn(
                    "border-t",
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  )}
                >
                  <td className="sticky left-0 bg-inherit p-4 font-medium">
                    {spec}
                  </td>
                  {products.map((product) => {
                    const value = product.specs[spec];
                    return (
                      <td key={product.id} className="p-4 text-center">
                        {typeof value === "boolean" ? (
                          value ? (
                            <Check className="mx-auto h-5 w-5 text-green-600" />
                          ) : (
                            <Minus className="mx-auto h-5 w-5 text-gray-400" />
                          )
                        ) : (
                          <span>{value || "-"}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

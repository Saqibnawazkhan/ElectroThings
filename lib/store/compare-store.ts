import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface CompareStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearAll: () => void;
  isInCompare: (productId: string) => boolean;
  canAdd: () => boolean;
}

const MAX_COMPARE_ITEMS = 4;

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const { items } = get();
        if (items.length >= MAX_COMPARE_ITEMS) return;
        if (items.some((item) => item.id === product.id)) return;
        set({ items: [...items, product] });
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      clearAll: () => {
        set({ items: [] });
      },

      isInCompare: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      canAdd: () => {
        return get().items.length < MAX_COMPARE_ITEMS;
      },
    }),
    {
      name: "compare-storage",
    }
  )
);

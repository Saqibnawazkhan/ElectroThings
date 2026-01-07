import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

const MAX_ITEMS = 10;

interface RecentlyViewedStore {
  items: Product[];
  addItem: (product: Product) => void;
  clearAll: () => void;
  getItems: () => Product[];
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const items = get().items;
        // Remove if already exists
        const filtered = items.filter((item) => item.id !== product.id);
        // Add to beginning and limit to MAX_ITEMS
        const newItems = [product, ...filtered].slice(0, MAX_ITEMS);
        set({ items: newItems });
      },

      clearAll: () => {
        set({ items: [] });
      },

      getItems: () => {
        return get().items;
      },
    }),
    {
      name: "recently-viewed-storage",
    }
  )
);

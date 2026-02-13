"use client";

import { QuickViewModal } from "./quick-view-modal";
import { useQuickViewStore } from "@/lib/store/quick-view-store";

export function QuickViewProvider() {
  const { product, isOpen, closeQuickView } = useQuickViewStore();

  return (
    <QuickViewModal product={product} isOpen={isOpen} onClose={closeQuickView} />
  );
}

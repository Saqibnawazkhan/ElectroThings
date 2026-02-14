interface CartItem {
  price: number;
  quantity: number;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return subtotal * taxRate;
}

export function calculateShipping(
  subtotal: number,
  shippingCost: number,
  freeShippingThreshold: number = 50
): number {
  return subtotal >= freeShippingThreshold ? 0 : shippingCost;
}

export function calculateDiscount(
  subtotal: number,
  discountCode?: { type: "percentage" | "fixed"; value: number }
): number {
  if (!discountCode) return 0;

  if (discountCode.type === "percentage") {
    return (subtotal * discountCode.value) / 100;
  }

  return Math.min(discountCode.value, subtotal);
}

export function calculateTotal(
  subtotal: number,
  tax: number,
  shipping: number,
  discount: number = 0
): number {
  return Math.max(0, subtotal + tax + shipping - discount);
}

export function calculateSavings(
  items: Array<{ price: number; originalPrice?: number; quantity: number }>
): number {
  return items.reduce((sum, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);
}

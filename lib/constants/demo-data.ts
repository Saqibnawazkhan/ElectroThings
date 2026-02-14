export const DEMO_PRODUCTS = [
  {
    id: "demo-1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 1234,
    inStock: true,
    category: "audio",
  },
  {
    id: "demo-2",
    name: "Smart Watch Pro",
    price: 449.99,
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    category: "wearables",
  },
  {
    id: "demo-3",
    name: "Gaming Console X",
    price: 499.99,
    originalPrice: 599.99,
    rating: 4.9,
    reviewCount: 2156,
    inStock: false,
    category: "gaming",
  },
];

export const DEMO_REVIEWS = [
  {
    id: "review-1",
    rating: 5,
    author: "John D.",
    date: "2026-02-10",
    title: "Excellent product!",
    comment: "Best purchase I've made this year. Highly recommended!",
    verified: true,
  },
  {
    id: "review-2",
    rating: 4,
    author: "Sarah M.",
    date: "2026-02-08",
    title: "Good value",
    comment: "Great product for the price. Fast shipping too.",
    verified: true,
  },
];

export const DEMO_SHIPPING_ADDRESSES = [
  {
    id: "addr-1",
    name: "Home",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    isDefault: true,
  },
  {
    id: "addr-2",
    name: "Office",
    address: "456 Business Ave",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    isDefault: false,
  },
];

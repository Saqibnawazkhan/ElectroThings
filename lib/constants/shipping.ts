export const SHIPPING_OPTIONS = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 5.99,
    icon: "truck",
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    price: 12.99,
    icon: "zap",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 24.99,
    icon: "rocket",
  },
  {
    id: "free",
    name: "Free Shipping",
    description: "7-10 business days",
    price: 0,
    icon: "gift",
  },
];

export const FREE_SHIPPING_THRESHOLD = 50;

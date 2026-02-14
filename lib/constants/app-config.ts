export const APP_CONFIG = {
  name: "ElectroThings",
  description: "Your one-stop shop for electronics",
  url: "https://electrothings.com",
  version: "1.0.0",

  contact: {
    email: "support@electrothings.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94025",
  },

  social: {
    facebook: "https://facebook.com/electrothings",
    twitter: "https://twitter.com/electrothings",
    instagram: "https://instagram.com/electrothings",
    youtube: "https://youtube.com/electrothings",
  },

  features: {
    freeShippingThreshold: 50,
    taxRate: 0.08,
    defaultCurrency: "USD",
    supportedCurrencies: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"],
    itemsPerPage: 12,
    maxCartItems: 50,
    reviewsPerPage: 10,
  },

  seo: {
    titleTemplate: "%s | ElectroThings",
    defaultTitle: "ElectroThings - Your Electronics Store",
    defaultDescription: "Shop the latest electronics, gadgets, and tech accessories at ElectroThings",
  },
};

export const PAYMENT_METHODS = [
  { id: "card", name: "Credit/Debit Card", icon: "credit-card" },
  { id: "paypal", name: "PayPal", icon: "paypal" },
  { id: "apple-pay", name: "Apple Pay", icon: "apple" },
  { id: "google-pay", name: "Google Pay", icon: "google" },
];

export const ORDER_STATUSES = [
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "confirmed", label: "Confirmed", color: "blue" },
  { value: "processing", label: "Processing", color: "indigo" },
  { value: "shipped", label: "Shipped", color: "purple" },
  { value: "delivered", label: "Delivered", color: "green" },
  { value: "cancelled", label: "Cancelled", color: "red" },
];

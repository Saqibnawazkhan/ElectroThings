export const PRODUCT_CATEGORIES = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    icon: "smartphone",
    subcategories: [
      { id: "phones", name: "Phones & Tablets", slug: "phones-tablets" },
      { id: "laptops", name: "Laptops & Computers", slug: "laptops-computers" },
      { id: "cameras", name: "Cameras & Photography", slug: "cameras" },
    ],
  },
  {
    id: "audio",
    name: "Audio",
    slug: "audio",
    icon: "headphones",
    subcategories: [
      { id: "headphones", name: "Headphones", slug: "headphones" },
      { id: "speakers", name: "Speakers", slug: "speakers" },
      { id: "soundbars", name: "Soundbars", slug: "soundbars" },
    ],
  },
  {
    id: "gaming",
    name: "Gaming",
    slug: "gaming",
    icon: "gamepad",
    subcategories: [
      { id: "consoles", name: "Gaming Consoles", slug: "consoles" },
      { id: "accessories", name: "Gaming Accessories", slug: "gaming-accessories" },
      { id: "pc-gaming", name: "PC Gaming", slug: "pc-gaming" },
    ],
  },
  {
    id: "wearables",
    name: "Wearables",
    slug: "wearables",
    icon: "watch",
    subcategories: [
      { id: "smartwatches", name: "Smartwatches", slug: "smartwatches" },
      { id: "fitness-trackers", name: "Fitness Trackers", slug: "fitness-trackers" },
      { id: "smart-glasses", name: "Smart Glasses", slug: "smart-glasses" },
    ],
  },
  {
    id: "accessories",
    name: "Accessories",
    slug: "accessories",
    icon: "cable",
    subcategories: [
      { id: "cables", name: "Cables & Chargers", slug: "cables-chargers" },
      { id: "cases", name: "Cases & Covers", slug: "cases-covers" },
      { id: "screen-protectors", name: "Screen Protectors", slug: "screen-protectors" },
    ],
  },
];

export const FEATURED_CATEGORIES = ["electronics", "audio", "gaming"];

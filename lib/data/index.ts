import { Product, Category, Order, User, ProductFilters } from "@/types";
import productsData from "./products.json";
import categoriesData from "./categories.json";
import ordersData from "./orders.json";
import usersData from "./users.json";

// In-memory storage for runtime mutations
let products: Product[] = productsData as unknown as Product[];
let categories: Category[] = categoriesData as unknown as Category[];
let orders: Order[] = ordersData as unknown as Order[];
let users: (User & { password: string })[] = usersData as unknown as (User & { password: string })[];

// Product functions
export function getProducts(filters?: ProductFilters): Product[] {
  let filtered = [...products];

  if (filters?.category) {
    filtered = filtered.filter((p) => p.categorySlug === filters.category);
  }

  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
    );
  }

  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= filters.minPrice!);
  }

  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
  }

  // Sorting
  switch (filters?.sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return filtered;
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(
  product: Product,
  limit: number = 4
): Product[] {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, limit);
}

export function createProduct(
  product: Omit<Product, "id" | "createdAt">
): Product {
  const newProduct: Product = {
    ...product,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(
  id: string,
  updates: Partial<Product>
): Product | undefined {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  products[index] = { ...products[index], ...updates };
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

// Category functions
export function getCategories(): Category[] {
  return categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

// Order functions
export function getOrders(): Order[] {
  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function getOrdersByUserId(userId: string): Order[] {
  return orders.filter((o) => o.userId === userId);
}

export function createOrder(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Order {
  const newOrder: Order = {
    ...order,
    id: `order-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  return newOrder;
}

export function updateOrderStatus(
  id: string,
  status: Order["status"]
): Order | undefined {
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return undefined;
  orders[index] = {
    ...orders[index],
    status,
    updatedAt: new Date().toISOString(),
  };
  return orders[index];
}

// User functions
export function getUserByEmail(email: string): (User & { password: string }) | undefined {
  return users.find((u) => u.email === email);
}

export function getUserById(id: string): User | undefined {
  const user = users.find((u) => u.id === id);
  if (!user) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function createUser(
  user: Omit<User, "id" | "createdAt"> & { password: string }
): User {
  const newUser = {
    ...user,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
}

export function validateUserCredentials(
  email: string,
  password: string
): User | null {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

// Stats for admin dashboard
export function getStats() {
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + o.total, 0);

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalUsers = users.filter((u) => u.role === "user").length;

  const recentOrders = orders
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return {
    totalRevenue,
    totalOrders,
    totalProducts,
    totalUsers,
    recentOrders,
  };
}

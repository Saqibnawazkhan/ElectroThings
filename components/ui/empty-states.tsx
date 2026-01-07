"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Heart,
  Package,
  AlertCircle,
  FileQuestion,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: {
    label: string;
    href: string;
  };
}

function EmptyStateBase({ title, description, icon, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6"
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground max-w-md mb-6">{description}</p>
      {action && (
        <Link href={action.href}>
          <Button>{action.label}</Button>
        </Link>
      )}
    </motion.div>
  );
}

export function EmptyCart() {
  return (
    <EmptyStateBase
      icon={<ShoppingCart className="h-12 w-12 text-muted-foreground" />}
      title="Your cart is empty"
      description="Looks like you haven't added any items to your cart yet. Start shopping to fill it up!"
      action={{ label: "Start Shopping", href: "/products" }}
    />
  );
}

export function EmptyWishlist() {
  return (
    <EmptyStateBase
      icon={<Heart className="h-12 w-12 text-muted-foreground" />}
      title="Your wishlist is empty"
      description="Save items you love to your wishlist. Review them anytime and easily move them to cart."
      action={{ label: "Discover Products", href: "/products" }}
    />
  );
}

export function EmptySearchResults({ query }: { query: string }) {
  return (
    <EmptyStateBase
      icon={<Search className="h-12 w-12 text-muted-foreground" />}
      title="No results found"
      description={`We couldn't find any products matching "${query}". Try adjusting your search or browse our categories.`}
      action={{ label: "Browse All Products", href: "/products" }}
    />
  );
}

export function EmptyOrders() {
  return (
    <EmptyStateBase
      icon={<Package className="h-12 w-12 text-muted-foreground" />}
      title="No orders yet"
      description="You haven't placed any orders yet. Once you do, you'll be able to track them here."
      action={{ label: "Start Shopping", href: "/products" }}
    />
  );
}

export function EmptyCategory() {
  return (
    <EmptyStateBase
      icon={<AlertCircle className="h-12 w-12 text-muted-foreground" />}
      title="No products in this category"
      description="This category doesn't have any products yet. Check back later or explore other categories."
      action={{ label: "Browse Categories", href: "/products" }}
    />
  );
}

export function NotFound() {
  return (
    <EmptyStateBase
      icon={<FileQuestion className="h-12 w-12 text-muted-foreground" />}
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      action={{ label: "Go Home", href: "/" }}
    />
  );
}

export function Offline() {
  return (
    <EmptyStateBase
      icon={<WifiOff className="h-12 w-12 text-muted-foreground" />}
      title="You're offline"
      description="Please check your internet connection and try again."
    />
  );
}

export function ErrorState({
  message = "Something went wrong",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mb-6"
      >
        <AlertCircle className="h-12 w-12 text-destructive" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">Oops!</h3>
      <p className="text-muted-foreground max-w-md mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          Try Again
        </Button>
      )}
    </motion.div>
  );
}

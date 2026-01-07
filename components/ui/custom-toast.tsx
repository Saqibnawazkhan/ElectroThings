"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Check,
  X,
  Package,
  Truck,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

// Toast for adding item to cart
export function showAddToCartToast(product: Product) {
  toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="flex items-center gap-3 p-4 bg-background border rounded-lg shadow-lg max-w-md"
      >
        <div className="relative w-14 h-14 rounded-md overflow-hidden bg-muted shrink-0">
          <Image
            src={product.images[0] || "/images/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">Added to cart</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.name}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/cart">
            <Button size="sm">View Cart</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => toast.dismiss(t)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    ),
    { duration: 4000 }
  );
}

// Toast for adding item to wishlist
export function showAddToWishlistToast(product: Product) {
  toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="flex items-center gap-3 p-4 bg-background border rounded-lg shadow-lg max-w-md"
      >
        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center shrink-0">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">Saved to wishlist</p>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.name}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/wishlist">
            <Button size="sm" variant="outline">
              View Wishlist
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => toast.dismiss(t)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    ),
    { duration: 3000 }
  );
}

// Toast for order placed
export function showOrderPlacedToast(orderId: string) {
  toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg shadow-lg max-w-md"
      >
        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
          <Check className="h-5 w-5 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            Order placed successfully!
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            Order #{orderId}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/account/orders/${orderId}`}>
            <Button size="sm">Track Order</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => toast.dismiss(t)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    ),
    { duration: 5000 }
  );
}

// Toast for shipping update
export function showShippingUpdateToast(status: string, orderId: string) {
  const statusConfig = {
    shipped: {
      icon: <Truck className="h-5 w-5 text-blue-500" />,
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-800",
      message: "Your order has been shipped!",
    },
    delivered: {
      icon: <Package className="h-5 w-5 text-green-500" />,
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-800",
      message: "Your order has been delivered!",
    },
    delayed: {
      icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      message: "There's a delay with your order",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.shipped;

  toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className={`flex items-center gap-3 p-4 ${config.bgColor} border ${config.borderColor} rounded-lg shadow-lg max-w-md`}
      >
        <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shrink-0">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{config.message}</p>
          <p className="text-sm text-muted-foreground">Order #{orderId}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => toast.dismiss(t)}
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.div>
    ),
    { duration: 4000 }
  );
}

// Toast for promo code applied
export function showPromoAppliedToast(code: string, discount: number) {
  toast.custom(
    (t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg shadow-lg max-w-md"
      >
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring" }}
          className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0"
        >
          <Check className="h-5 w-5 text-green-600" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            Promo code applied!
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            {code} - You save ${discount.toFixed(2)}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => toast.dismiss(t)}
        >
          <X className="h-4 w-4" />
        </Button>
      </motion.div>
    ),
    { duration: 3000 }
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, Mail, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface StockNotificationProps {
  productId: string;
  productName: string;
  stock: number;
}

export function StockNotification({
  productId,
  productName,
  stock,
}: StockNotificationProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Check localStorage for existing subscription
  useState(() => {
    if (typeof window !== "undefined") {
      const subscriptions = JSON.parse(
        localStorage.getItem("stock-notifications") || "{}"
      );
      if (subscriptions[productId]) {
        setIsSubscribed(true);
        setEmail(subscriptions[productId]);
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Save to localStorage
    const subscriptions = JSON.parse(
      localStorage.getItem("stock-notifications") || "{}"
    );
    subscriptions[productId] = email;
    localStorage.setItem("stock-notifications", JSON.stringify(subscriptions));

    setIsSubmitting(false);
    setIsSubscribed(true);
    setIsOpen(false);
    toast.success("You'll be notified when this item is back in stock!");
  };

  const handleUnsubscribe = () => {
    const subscriptions = JSON.parse(
      localStorage.getItem("stock-notifications") || "{}"
    );
    delete subscriptions[productId];
    localStorage.setItem("stock-notifications", JSON.stringify(subscriptions));

    setIsSubscribed(false);
    setEmail("");
    toast.success("Notification removed");
  };

  // Only show for low or out of stock items
  if (stock > 10) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isSubscribed ? (
          <Button
            variant="outline"
            size="sm"
            className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-950"
            onClick={(e) => {
              e.preventDefault();
              handleUnsubscribe();
            }}
          >
            <Check className="mr-2 h-4 w-4" />
            Notification Set
          </Button>
        ) : (
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            {stock === 0 ? "Notify When Available" : "Low Stock Alert"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Get Stock Notification
          </DialogTitle>
          <DialogDescription>
            {stock === 0
              ? `We'll notify you when "${productName}" is back in stock.`
              : `Only ${stock} left! Get notified if stock runs out and comes back.`}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {!isSubscribed ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4 mt-4"
            >
              <div className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Notify Me
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                We&apos;ll only send you one email when this product is back in
                stock.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold mb-2">You&apos;re all set!</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We&apos;ll email you at <strong>{email}</strong> when this item
                is available.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={handleUnsubscribe}
              >
                <BellOff className="mr-2 h-4 w-4" />
                Cancel Notification
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

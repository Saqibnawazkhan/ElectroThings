"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import {
  CheckCircle2,
  Package,
  Truck,
  Mail,
  ArrowRight,
  Download,
  Share2,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface OrderConfirmationProps {
  orderId: string;
  email: string;
  total: number;
  estimatedDelivery: string;
}

export function OrderConfirmation({
  orderId,
  email,
  total,
  estimatedDelivery,
}: OrderConfirmationProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    toast.success("Order ID copied to clipboard!");
  };

  const steps = [
    {
      icon: CheckCircle2,
      title: "Order Confirmed",
      description: "Your order has been placed",
      completed: true,
    },
    {
      icon: Package,
      title: "Processing",
      description: "We're preparing your order",
      completed: false,
    },
    {
      icon: Truck,
      title: "Shipped",
      description: "On its way to you",
      completed: false,
    },
    {
      icon: Mail,
      title: "Delivered",
      description: estimatedDelivery,
      completed: false,
    },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full"
      >
        <Card>
          <CardContent className="p-6 sm:p-8">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center"
            >
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>

            {/* Thank You Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-6"
            >
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Thank You! 🎉
              </h1>
              <p className="text-muted-foreground">
                Your order has been placed successfully
              </p>
            </motion.div>

            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-muted/50 rounded-lg p-4 mb-6"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Order ID</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium">{orderId}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleCopyOrderId}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">
                  Confirmation sent to
                </span>
                <span className="text-sm font-medium">{email}</span>
              </div>
              <Separator className="my-3" />
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Paid</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
            </motion.div>

            {/* Order Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <h3 className="font-semibold mb-4">Order Status</h3>
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-muted" />
                <div className="absolute left-5 top-0 w-0.5 h-10 bg-green-500" />

                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            step.completed ? "" : "text-muted-foreground"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="space-y-3"
            >
              <Link href="/account/orders" className="block">
                <Button className="w-full">
                  Track Your Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Receipt
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
              <Link href="/products" className="block">
                <Button variant="ghost" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

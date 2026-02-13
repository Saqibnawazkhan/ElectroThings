"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function OrderDetails() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  if (!orderId) return null;

  return (
    <Card className="mb-8">
      <CardContent className="py-6">
        <div className="flex items-center justify-center gap-3">
          <Package className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="font-mono font-bold">{orderId}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderDetailsSkeleton() {
  return (
    <Card className="mb-8">
      <CardContent className="py-6">
        <div className="flex items-center justify-center gap-3">
          <Skeleton className="h-6 w-6" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="h-20 w-20 mx-auto text-green-500" />
        </div>

        <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for your purchase. Your order has been received and is being
          processed.
        </p>

        <Suspense fallback={<OrderDetailsSkeleton />}>
          <OrderDetails />
        </Suspense>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your email address. You can
            track your order status in your account.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account/orders">
              <Button variant="outline">View Order Details</Button>
            </Link>
            <Link href="/products">
              <Button>
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

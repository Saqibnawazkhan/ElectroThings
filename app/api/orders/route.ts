import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createOrder, getOrders } from "@/lib/data";
import { OrderItem, Address } from "@/types";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Only admin can see all orders
  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const orders = getOrders();
  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json();

    const {
      items,
      shippingAddress,
      billingAddress,
      subtotal,
      shipping,
      tax,
      total,
      paymentMethod,
    } = body as {
      items: OrderItem[];
      shippingAddress: Address;
      billingAddress: Address;
      subtotal: number;
      shipping: number;
      tax: number;
      total: number;
      paymentMethod: string;
    };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    const order = createOrder({
      userId: session?.user?.id || "guest",
      items,
      shippingAddress,
      billingAddress,
      subtotal,
      shipping,
      tax,
      total,
      status: "confirmed",
      paymentMethod,
      paymentStatus: "paid", // Mock payment always succeeds
    });

    return NextResponse.json({
      message: "Order created successfully",
      order,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

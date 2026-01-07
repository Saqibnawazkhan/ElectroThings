"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Package, Settings, CreditCard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const accountLinks = [
  {
    title: "My Orders",
    description: "View your order history and track shipments",
    href: "/account/orders",
    icon: Package,
  },
  {
    title: "Payment Methods",
    description: "Manage your saved payment methods",
    href: "/account/payments",
    icon: CreditCard,
  },
  {
    title: "Account Settings",
    description: "Update your profile and preferences",
    href: "/account/settings",
    icon: Settings,
  },
];

export default function AccountPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-32 w-full" />
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/login?callbackUrl=/account");
  }

  const initials = session?.user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-xl">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{session?.user?.name}</h1>
                <p className="text-muted-foreground">{session?.user?.email}</p>
                {session?.user?.role === "admin" && (
                  <span className="inline-block mt-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Links */}
        <div className="grid md:grid-cols-3 gap-4">
          {accountLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <link.icon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Admin Link */}
        {session?.user?.role === "admin" && (
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Admin Dashboard</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage products, orders, and users
                    </p>
                  </div>
                </div>
                <Link href="/admin">
                  <Button>Go to Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

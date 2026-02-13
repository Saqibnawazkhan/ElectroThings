"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Wallet,
  Landmark,
  Check,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PaymentMethod {
  id: string;
  type: "card" | "paypal" | "bank" | "apple" | "google";
  name: string;
  icon: React.ReactNode;
  description: string;
  lastFour?: string;
  expiry?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "card-1",
    type: "card",
    name: "Visa ending in 4242",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Default payment method",
    lastFour: "4242",
    expiry: "12/25",
  },
  {
    id: "paypal",
    type: "paypal",
    name: "PayPal",
    icon: <Wallet className="h-5 w-5" />,
    description: "Fast and secure checkout",
  },
  {
    id: "bank",
    type: "bank",
    name: "Bank Transfer",
    icon: <Landmark className="h-5 w-5" />,
    description: "Direct debit from your bank",
  },
  {
    id: "new-card",
    type: "card",
    name: "Add new card",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Use a different credit or debit card",
  },
];

interface PaymentMethodsProps {
  onSelect: (method: PaymentMethod) => void;
  className?: string;
}

export function PaymentMethods({ onSelect, className }: PaymentMethodsProps) {
  const [selectedId, setSelectedId] = useState("card-1");
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setShowNewCardForm(id === "new-card");
    const method = paymentMethods.find((m) => m.id === id);
    if (method) {
      onSelect(method);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Method
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Lock className="h-3 w-3" />
          Secure Payment
        </div>
      </div>

      <RadioGroup value={selectedId} onValueChange={handleSelect}>
        <div className="grid gap-3">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Label htmlFor={method.id} className="cursor-pointer">
                <Card
                  className={cn(
                    "transition-all",
                    selectedId === method.id
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "hover:border-muted-foreground/50"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div
                        className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          method.type === "card" && "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
                          method.type === "paypal" && "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
                          method.type === "bank" && "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                        )}
                      >
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{method.name}</span>
                          {method.id === "card-1" && (
                            <Badge variant="secondary" className="text-xs">
                              Default
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      {selectedId === method.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </motion.div>
                      )}
                    </div>

                    {/* New Card Form */}
                    {method.id === "new-card" && showNewCardForm && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t space-y-4"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            className="font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" maxLength={4} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input id="card-name" placeholder="John Doe" />
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </Label>
            </motion.div>
          ))}
        </div>
      </RadioGroup>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 p-3 bg-muted/50 rounded-lg">
        <ShieldCheck className="h-5 w-5 text-green-600" />
        <span className="text-sm text-muted-foreground">
          Your payment information is encrypted and secure
        </span>
      </div>
    </div>
  );
}

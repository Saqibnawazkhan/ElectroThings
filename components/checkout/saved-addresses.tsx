"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Plus,
  Check,
  Pencil,
  Trash2,
  Home,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface Address {
  id: string;
  name: string;
  type: "home" | "work";
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

// Mock saved addresses
const mockAddresses: Address[] = [
  {
    id: "1",
    name: "John Doe",
    type: "home",
    street: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    phone: "(555) 123-4567",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    type: "work",
    street: "456 Business Ave, Suite 100",
    city: "New York",
    state: "NY",
    zip: "10018",
    country: "United States",
    phone: "(555) 987-6543",
    isDefault: false,
  },
];

interface SavedAddressesProps {
  onSelect: (address: Address) => void;
  onAddNew: () => void;
  className?: string;
}

export function SavedAddresses({
  onSelect,
  onAddNew,
  className,
}: SavedAddressesProps) {
  const [addresses] = useState<Address[]>(mockAddresses);
  const [selectedId, setSelectedId] = useState<string>(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ""
  );

  const handleSelect = (id: string) => {
    setSelectedId(id);
    const address = addresses.find((a) => a.id === id);
    if (address) {
      onSelect(address);
    }
  };

  if (addresses.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-semibold mb-2">No saved addresses</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add a shipping address to speed up checkout
          </p>
          <Button onClick={onAddNew}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Shipping Address
        </h3>
        <Button variant="outline" size="sm" onClick={onAddNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      <RadioGroup value={selectedId} onValueChange={handleSelect}>
        <div className="grid gap-3">
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Label htmlFor={address.id} className="cursor-pointer">
                <Card
                  className={cn(
                    "transition-all",
                    selectedId === address.id
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "hover:border-muted-foreground/50"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem
                        value={address.id}
                        id={address.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{address.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {address.type === "home" ? (
                              <>
                                <Home className="mr-1 h-3 w-3" />
                                Home
                              </>
                            ) : (
                              <>
                                <Building2 className="mr-1 h-3 w-3" />
                                Work
                              </>
                            )}
                          </Badge>
                          {address.isDefault && (
                            <Badge className="text-xs">Default</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.street}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} {address.zip}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.country}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.phone}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.preventDefault();
                            // Edit functionality
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {!address.isDefault && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.preventDefault();
                              // Delete functionality
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Selected Indicator */}
                    {selectedId === address.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 mt-3 pt-3 border-t text-sm text-primary"
                      >
                        <Check className="h-4 w-4" />
                        Deliver to this address
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </Label>
            </motion.div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}

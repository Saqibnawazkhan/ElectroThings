"use client";

import { motion } from "framer-motion";
import { Check, MapPin, CreditCard, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    name: "Shipping",
    description: "Delivery address",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    id: 2,
    name: "Payment",
    description: "Payment method",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: 3,
    name: "Review",
    description: "Confirm order",
    icon: <Package className="h-5 w-5" />,
  },
];

interface CheckoutStepsProps {
  currentStep: number;
  className?: string;
}

export function CheckoutSteps({ currentStep, className }: CheckoutStepsProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Stepper */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isCompleted || isCurrent ? "hsl(var(--primary))" : "hsl(var(--muted))",
                    }}
                    className={cn(
                      "relative w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                      (isCompleted || isCurrent) && "text-primary-foreground",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Check className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      step.icon
                    )}
                    {isCurrent && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  <div className="mt-2 text-center">
                    <p
                      className={cn(
                        "font-medium text-sm",
                        (isCompleted || isCurrent)
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground hidden lg:block">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                          width: isCompleted ? "100%" : "0%",
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Stepper */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {steps[currentStep - 1]?.name}
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={cn(
                "flex items-center gap-1",
                currentStep >= step.id
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {currentStep > step.id ? (
                <Check className="h-4 w-4" />
              ) : (
                <span className="w-4 h-4 rounded-full border text-xs flex items-center justify-center">
                  {step.id}
                </span>
              )}
              <span className="text-xs">{step.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

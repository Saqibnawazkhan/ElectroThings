"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  optional?: boolean;
}

interface AnimatedStepperProps {
  steps: Step[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  className?: string;
  variant?: "default" | "vertical" | "minimal" | "circles" | "progress";
  allowSkip?: boolean;
  showNavigation?: boolean;
}

export function AnimatedStepper({
  steps,
  currentStep,
  onStepChange,
  className,
  variant = "default",
  allowSkip = false,
  showNavigation = true,
}: AnimatedStepperProps) {
  const goToStep = (step: number) => {
    if (allowSkip || step <= currentStep + 1) {
      onStepChange?.(step);
    }
  };

  const goNext = () => {
    if (currentStep < steps.length - 1) {
      onStepChange?.(currentStep + 1);
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      onStepChange?.(currentStep - 1);
    }
  };

  if (variant === "vertical") {
    return (
      <div className={cn("flex gap-8", className)}>
        {/* Vertical step indicators */}
        <div className="relative flex flex-col">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="flex items-start gap-4">
                {/* Step indicator and line */}
                <div className="flex flex-col items-center">
                  <motion.button
                    onClick={() => goToStep(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={!allowSkip && index > currentStep + 1}
                    className={cn(
                      "relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                      isCompleted && "bg-primary text-primary-foreground",
                      isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                      !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      step.icon || index + 1
                    )}
                  </motion.button>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-muted my-2 relative">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: isCompleted ? "100%" : "0%" }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-0 left-0 w-full bg-primary"
                      />
                    </div>
                  )}
                </div>

                {/* Step content */}
                <div className="pb-8">
                  <motion.h4
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "font-semibold",
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                    {step.optional && (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        (Optional)
                      </span>
                    )}
                  </motion.h4>
                  {step.description && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.05 }}
                      className="text-sm text-muted-foreground mt-1"
                    >
                      {step.description}
                    </motion.p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Content area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[currentStep]?.content}
            </motion.div>
          </AnimatePresence>

          {showNavigation && (
            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.02, x: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={goPrev}
                disabled={currentStep === 0}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                  currentStep === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-muted"
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={goNext}
                disabled={currentStep === steps.length - 1}
                className={cn(
                  "flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors",
                  currentStep === steps.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={className}>
        {/* Minimal step indicators */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <motion.button
                key={step.id}
                onClick={() => goToStep(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                disabled={!allowSkip && index > currentStep + 1}
                className="p-1"
              >
                <motion.div
                  animate={{
                    width: isCurrent ? 32 : 8,
                    backgroundColor: isCompleted || isCurrent
                      ? "var(--primary)"
                      : "var(--muted)",
                  }}
                  className="h-2 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              </motion.button>
            );
          })}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "circles") {
    return (
      <div className={className}>
        {/* Circle step indicators */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div key={step.id} className="flex items-center">
                <motion.button
                  onClick={() => goToStep(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!allowSkip && index > currentStep + 1}
                  className="relative"
                >
                  {/* Outer ring for current */}
                  {isCurrent && (
                    <motion.div
                      layoutId="step-ring"
                      className="absolute -inset-2 rounded-full border-2 border-primary"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  <motion.div
                    animate={{
                      backgroundColor: isCompleted || isCurrent
                        ? "var(--primary)"
                        : "var(--muted)",
                      scale: isCurrent ? 1.1 : 1,
                    }}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-medium",
                      (isCompleted || isCurrent) && "text-primary-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      step.icon || index + 1
                    )}
                  </motion.div>
                </motion.button>

                {/* Connector */}
                {index < steps.length - 1 && (
                  <div className="w-12 h-0.5 bg-muted mx-2 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-y-0 left-0 bg-primary"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step title */}
        <motion.div
          key={`title-${currentStep}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h3 className="text-lg font-semibold">{steps[currentStep]?.title}</h3>
          {steps[currentStep]?.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {steps[currentStep].description}
            </p>
          )}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep]?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  if (variant === "progress") {
    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
      <div className={className}>
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">{steps[currentStep]?.title}</span>
            <span className="text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
            />
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {steps[currentStep]?.content}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {showNavigation && (
          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={goPrev}
              disabled={currentStep === 0}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-medium border border-border transition-colors",
                currentStep === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-muted"
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={goNext}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-primary to-purple-500 text-white shadow-lg shadow-primary/30"
            >
              {currentStep === steps.length - 1 ? "Complete" : "Continue"}
              <ChevronRight className="h-4 w-4" />
            </motion.button>
          </div>
        )}
      </div>
    );
  }

  // Default horizontal stepper
  return (
    <div className={className}>
      {/* Horizontal step indicators */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <motion.button
                  onClick={() => goToStep(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!allowSkip && index > currentStep + 1}
                  className={cn(
                    "relative w-12 h-12 rounded-full flex items-center justify-center font-medium transition-all",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCompleted && !isCurrent && "bg-muted text-muted-foreground border-2 border-border"
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring" }}
                    >
                      <Check className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    step.icon || index + 1
                  )}
                </motion.button>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mt-2 text-center"
                >
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </p>
                  {step.optional && (
                    <p className="text-xs text-muted-foreground">Optional</p>
                  )}
                </motion.div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 bg-muted mx-4 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-y-0 left-0 bg-primary"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps[currentStep]?.content}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {showNavigation && (
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <motion.button
            whileHover={{ scale: 1.02, x: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={goPrev}
            disabled={currentStep === 0}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
              currentStep === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-muted"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={goNext}
            disabled={currentStep === steps.length - 1}
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors",
              currentStep === steps.length - 1
                ? "bg-green-500 hover:bg-green-600"
                : "bg-primary hover:bg-primary/90",
              "text-white"
            )}
          >
            {currentStep === steps.length - 1 ? "Complete" : "Next"}
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>
      )}
    </div>
  );
}

// Wizard component for multi-step forms
interface WizardProps {
  steps: Step[];
  onComplete?: (data: Record<string, unknown>) => void;
  className?: string;
}

export function Wizard({ steps, onComplete, className }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const handleNext = (stepData?: Record<string, unknown>) => {
    if (stepData) {
      setFormData((prev) => ({ ...prev, ...stepData }));
    }

    if (currentStep === steps.length - 1) {
      onComplete?.({ ...formData, ...stepData });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className={className}>
      <AnimatedStepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        showNavigation={false}
      />

      <div className="flex justify-between mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg font-medium",
            currentStep === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-muted"
          )}
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleNext()}
          className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {currentStep === steps.length - 1 ? "Complete" : "Next"}
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}

// Simple step counter
export function StepCounter({
  current,
  total,
  className,
}: {
  current: number;
  total: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium",
        className
      )}
    >
      <span className="text-primary">{current}</span>
      <span className="text-muted-foreground">/</span>
      <span className="text-muted-foreground">{total}</span>
    </motion.div>
  );
}

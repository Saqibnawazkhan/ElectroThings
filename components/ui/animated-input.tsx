"use client";

import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check, X, Search, Mail, Lock, User, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  success?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "underline";
  inputSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-9 text-sm px-3",
  md: "h-11 text-base px-4",
  lg: "h-14 text-lg px-5",
};

const iconSizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export const AnimatedInput = forwardRef<HTMLInputElement, AnimatedInputProps>(
  (
    {
      label,
      error,
      success,
      hint,
      leftIcon,
      rightIcon,
      variant = "default",
      inputSize = "md",
      className,
      type,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

    const getVariantClasses = () => {
      const base = cn(
        "w-full rounded-xl transition-all duration-200",
        "focus:outline-none",
        disabled && "opacity-50 cursor-not-allowed"
      );

      switch (variant) {
        case "filled":
          return cn(
            base,
            "bg-muted border-2 border-transparent",
            isFocused && "bg-background border-primary",
            error && "border-red-500",
            success && "border-green-500"
          );
        case "underline":
          return cn(
            base,
            "bg-transparent border-b-2 border-border rounded-none px-0",
            isFocused && "border-primary",
            error && "border-red-500",
            success && "border-green-500"
          );
        default:
          return cn(
            base,
            "bg-background border-2 border-border",
            isFocused && "border-primary ring-4 ring-primary/10",
            error && "border-red-500 ring-4 ring-red-500/10",
            success && "border-green-500 ring-4 ring-green-500/10"
          );
      }
    };

    return (
      <div className="space-y-2">
        {/* Floating label */}
        {label && (
          <motion.label
            initial={false}
            animate={{
              y: isFocused || hasValue ? 0 : 8,
              scale: isFocused || hasValue ? 0.85 : 1,
              color: isFocused ? "var(--primary)" : error ? "#ef4444" : undefined,
            }}
            className={cn(
              "block text-sm font-medium text-muted-foreground origin-left",
              variant === "underline" && "ml-0"
            )}
          >
            {label}
          </motion.label>
        )}

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <motion.div
              animate={{
                color: isFocused ? "var(--primary)" : undefined,
                scale: isFocused ? 1.1 : 1,
              }}
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
                iconSizeClasses[inputSize]
              )}
            >
              {leftIcon}
            </motion.div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(!!e.target.value);
              props.onChange?.(e);
            }}
            className={cn(
              getVariantClasses(),
              sizeClasses[inputSize],
              leftIcon && "pl-11",
              (rightIcon || isPassword || error || success) && "pr-11",
              className
            )}
            {...props}
          />

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Validation icons */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="text-red-500"
                >
                  <X className={iconSizeClasses[inputSize]} />
                </motion.div>
              )}
              {success && !error && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="text-green-500"
                >
                  <Check className={iconSizeClasses[inputSize]} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password toggle */}
            {isPassword && (
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className={iconSizeClasses[inputSize]} />
                ) : (
                  <Eye className={iconSizeClasses[inputSize]} />
                )}
              </motion.button>
            )}

            {/* Custom right icon */}
            {rightIcon && !isPassword && !error && !success && (
              <span className="text-muted-foreground">{rightIcon}</span>
            )}
          </div>

          {/* Focus line animation for underline variant */}
          {variant === "underline" && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isFocused ? 1 : 0 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-center"
            />
          )}
        </div>

        {/* Error/Success/Hint message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
          {success && !error && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="text-sm text-green-500"
            >
              {success}
            </motion.p>
          )}
          {hint && !error && !success && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-muted-foreground"
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

AnimatedInput.displayName = "AnimatedInput";

// Search input with animated icon
export function AnimatedSearchInput({
  className,
  onSearch,
  ...props
}: {
  className?: string;
  onSearch?: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative", className)}>
      <motion.div
        animate={{
          x: isFocused ? -2 : 0,
          scale: isFocused ? 1.1 : 1,
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        <Search className="h-5 w-5" />
      </motion.div>

      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "w-full h-12 pl-12 pr-4 rounded-xl",
          "bg-muted border-2 border-transparent",
          "focus:outline-none focus:bg-background focus:border-primary focus:ring-4 focus:ring-primary/10",
          "transition-all duration-200"
        )}
        {...props}
      />

      {/* Animated border glow */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 -z-10 rounded-xl bg-primary/20 blur-md"
          />
        )}
      </AnimatePresence>
    </form>
  );
}

// OTP/Pin input
export function OTPInput({
  length = 6,
  onChange,
  className,
}: {
  length?: number;
  onChange?: (value: string) => void;
  className?: string;
}) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newValues = [...values];
    newValues[index] = value.slice(-1);
    setValues(newValues);
    onChange?.(newValues.join(""));

    // Auto-focus next input
    if (value && index < length - 1) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `[data-otp-index="${index + 1}"]`
      );
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(
        `[data-otp-index="${index - 1}"]`
      );
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const newValues = [...values];
    pastedData.split("").forEach((char, i) => {
      if (i < length) newValues[i] = char;
    });
    setValues(newValues);
    onChange?.(newValues.join(""));
  };

  return (
    <div className={cn("flex gap-3 justify-center", className)}>
      {Array.from({ length }).map((_, index) => (
        <motion.input
          key={index}
          data-otp-index={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={values[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          animate={{
            scale: focusedIndex === index ? 1.1 : 1,
            borderColor: focusedIndex === index ? "var(--primary)" : undefined,
          }}
          className={cn(
            "w-12 h-14 text-center text-xl font-bold rounded-xl",
            "bg-muted border-2 border-border",
            "focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10",
            "transition-colors duration-200"
          )}
        />
      ))}
    </div>
  );
}

// Preset input types
export function EmailInput(props: Omit<AnimatedInputProps, "type" | "leftIcon">) {
  return <AnimatedInput type="email" leftIcon={<Mail />} {...props} />;
}

export function PasswordInput(props: Omit<AnimatedInputProps, "type" | "leftIcon">) {
  return <AnimatedInput type="password" leftIcon={<Lock />} {...props} />;
}

export function NameInput(props: Omit<AnimatedInputProps, "type" | "leftIcon">) {
  return <AnimatedInput type="text" leftIcon={<User />} {...props} />;
}

export function PhoneInput(props: Omit<AnimatedInputProps, "type" | "leftIcon">) {
  return <AnimatedInput type="tel" leftIcon={<Phone />} {...props} />;
}

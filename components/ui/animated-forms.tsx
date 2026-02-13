"use client";

import { useState, forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye, EyeOff, AlertCircle, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Floating label input
interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;
    const showLabel = isFocused || hasValue;

    return (
      <div className="relative">
        <motion.label
          initial={false}
          animate={{
            y: showLabel ? -24 : 0,
            scale: showLabel ? 0.85 : 1,
            x: showLabel ? -4 : 0,
          }}
          className={cn(
            "absolute left-3 top-3 text-muted-foreground origin-left pointer-events-none transition-colors",
            isFocused && "text-primary",
            error && "text-red-500"
          )}
        >
          {label}
        </motion.label>

        <input
          ref={ref}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            "w-full h-12 px-3 pt-2 rounded-xl border-2 bg-background transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            isFocused ? "border-primary" : "border-border",
            error && "border-red-500 focus:ring-red-500/20",
            className
          )}
        />

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="text-red-500 text-sm mt-1 flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
FloatingInput.displayName = "FloatingInput";

// Password input with toggle
interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="relative">
        {label && (
          <label className="block text-sm font-medium mb-1.5">{label}</label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            {...props}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              "w-full h-12 px-3 pr-12 rounded-xl border-2 bg-background transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              isFocused ? "border-primary" : "border-border",
              error && "border-red-500 focus:ring-red-500/20",
              className
            )}
          />

          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <AnimatePresence mode="wait">
              {showPassword ? (
                <motion.div
                  key="hide"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                >
                  <EyeOff className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="show"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                >
                  <Eye className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-sm mt-1 flex items-center gap-1"
            >
              <AlertCircle className="h-3 w-3" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

// Search input with animation
interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClear, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = props.value && String(props.value).length > 0;

    return (
      <motion.div
        animate={{ width: isFocused ? "100%" : "100%" }}
        className="relative"
      >
        <motion.div
          animate={{ x: isFocused ? 4 : 0 }}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <Search className="h-5 w-5" />
        </motion.div>

        <input
          ref={ref}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            "w-full h-12 pl-11 pr-10 rounded-xl border-2 bg-background transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            isFocused ? "border-primary" : "border-border",
            className
          )}
        />

        <AnimatePresence>
          {hasValue && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
SearchInput.displayName = "SearchInput";

// Animated checkbox
interface AnimatedCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function AnimatedCheckbox({ checked, onChange, label, className }: AnimatedCheckboxProps) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group", className)}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onChange(!checked)}
        className={cn(
          "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors",
          checked
            ? "bg-primary border-primary"
            : "border-border group-hover:border-primary"
        )}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <Check className="h-4 w-4 text-primary-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}

// Animated radio button
interface AnimatedRadioProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

export function AnimatedRadio({ checked, onChange, label, className }: AnimatedRadioProps) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer group", className)}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onChange}
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
          checked
            ? "border-primary"
            : "border-border group-hover:border-primary"
        )}
      >
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="w-3 h-3 rounded-full bg-primary"
            />
          )}
        </AnimatePresence>
      </motion.div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}

// Animated switch/toggle
interface AnimatedSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function AnimatedSwitch({ checked, onChange, label, className }: AnimatedSwitchProps) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer", className)}>
      <motion.div
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-12 h-7 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <motion.div
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
        />
      </motion.div>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}

// Animated textarea
interface AnimatedTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const AnimatedTextarea = forwardRef<HTMLTextAreaElement, AnimatedTextareaProps>(
  ({ label, error, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const charCount = props.value ? String(props.value).length : 0;

    return (
      <div className="relative">
        {label && (
          <label className="block text-sm font-medium mb-1.5">{label}</label>
        )}

        <textarea
          ref={ref}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={cn(
            "w-full min-h-[120px] px-4 py-3 rounded-xl border-2 bg-background transition-all duration-200 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-primary/20",
            isFocused ? "border-primary" : "border-border",
            error && "border-red-500 focus:ring-red-500/20",
            className
          )}
        />

        <div className="flex justify-between mt-1">
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-red-500 text-sm flex items-center gap-1"
              >
                <AlertCircle className="h-3 w-3" />
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {props.maxLength && (
            <motion.span
              animate={{
                color: charCount > (props.maxLength * 0.9) ? "#ef4444" : undefined,
              }}
              className="text-xs text-muted-foreground"
            >
              {charCount}/{props.maxLength}
            </motion.span>
          )}
        </div>
      </div>
    );
  }
);
AnimatedTextarea.displayName = "AnimatedTextarea";

// Animated select dropdown
interface AnimatedSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  className?: string;
}

export function AnimatedSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  label,
  className,
}: AnimatedSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-medium mb-1.5">{label}</label>
      )}

      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "w-full h-12 px-4 rounded-xl border-2 bg-background transition-all duration-200 text-left flex items-center justify-between",
          "focus:outline-none focus:ring-2 focus:ring-primary/20",
          isOpen ? "border-primary" : "border-border"
        )}
      >
        <span className={!selectedOption ? "text-muted-foreground" : ""}>
          {selectedOption?.label || placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.ul
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 mt-2 py-2 rounded-xl border-2 border-border bg-background shadow-xl z-50 max-h-60 overflow-auto"
            >
              {options.map((option, index) => (
                <motion.li
                  key={option.value}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 text-left hover:bg-muted transition-colors flex items-center justify-between",
                      option.value === value && "bg-primary/10 text-primary"
                    )}
                  >
                    {option.label}
                    {option.value === value && (
                      <Check className="h-4 w-4" />
                    )}
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

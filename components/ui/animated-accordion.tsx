"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface AnimatedAccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  variant?: "default" | "bordered" | "separated";
  className?: string;
}

export function AnimatedAccordion({
  items,
  allowMultiple = false,
  variant = "default",
  className,
}: AnimatedAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  const isOpen = (id: string) => openItems.includes(id);

  const variantClasses = {
    default: "divide-y divide-border",
    bordered: "border rounded-xl divide-y divide-border overflow-hidden",
    separated: "space-y-3",
  };

  const itemClasses = {
    default: "",
    bordered: "",
    separated: "border rounded-xl overflow-hidden",
  };

  return (
    <div className={cn(variantClasses[variant], className)}>
      {items.map((item, index) => (
        <div key={item.id} className={itemClasses[variant]}>
          <motion.button
            onClick={() => toggleItem(item.id)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "w-full flex items-center justify-between py-4 px-4 text-left transition-colors",
              "hover:bg-muted/50",
              isOpen(item.id) && "bg-muted/30"
            )}
          >
            <div className="flex items-center gap-3">
              {item.icon && (
                <motion.span
                  animate={{ rotate: isOpen(item.id) ? 360 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary"
                >
                  {item.icon}
                </motion.span>
              )}
              <span className="font-medium">{item.title}</span>
            </div>
            <motion.div
              animate={{ rotate: isOpen(item.id) ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </motion.button>

          <AnimatePresence>
            {isOpen(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 text-muted-foreground">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// FAQ-style accordion with plus/minus icons
export function FAQAccordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const isOpen = openItem === item.id;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <motion.div
              animate={{
                boxShadow: isOpen
                  ? "0 10px 40px -10px rgba(0,0,0,0.1)"
                  : "0 2px 10px -2px rgba(0,0,0,0.05)",
              }}
              className={cn(
                "relative bg-background border rounded-2xl overflow-hidden transition-colors",
                isOpen && "border-primary/30"
              )}
            >
              {/* Gradient border effect when open */}
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 -z-10"
                />
              )}

              <button
                onClick={() => setOpenItem(isOpen ? null : item.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold pr-4">{item.title}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    isOpen
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  )}
                >
                  <Plus className="h-4 w-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                      {item.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

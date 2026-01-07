"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Keyboard,
  Search,
  Home,
  ShoppingCart,
  Heart,
  User,
  HelpCircle,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Shortcut {
  keys: string[];
  description: string;
  action: () => void;
  icon?: React.ReactNode;
}

export function KeyboardShortcutsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const shortcuts: Shortcut[] = [
    {
      keys: ["/"],
      description: "Focus search",
      action: () => {
        const searchInput = document.querySelector(
          'input[placeholder*="Search"]'
        ) as HTMLInputElement;
        searchInput?.focus();
      },
      icon: <Search className="h-4 w-4" />,
    },
    {
      keys: ["g", "h"],
      description: "Go to Home",
      action: () => router.push("/"),
      icon: <Home className="h-4 w-4" />,
    },
    {
      keys: ["g", "c"],
      description: "Go to Cart",
      action: () => router.push("/cart"),
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      keys: ["g", "w"],
      description: "Go to Wishlist",
      action: () => router.push("/wishlist"),
      icon: <Heart className="h-4 w-4" />,
    },
    {
      keys: ["g", "p"],
      description: "Go to Products",
      action: () => router.push("/products"),
    },
    {
      keys: ["g", "a"],
      description: "Go to Account",
      action: () => router.push("/account"),
      icon: <User className="h-4 w-4" />,
    },
    {
      keys: ["?"],
      description: "Show keyboard shortcuts",
      action: () => setShowHelp(true),
      icon: <HelpCircle className="h-4 w-4" />,
    },
    {
      keys: ["Escape"],
      description: "Close dialog",
      action: () => setShowHelp(false),
    },
  ];

  useEffect(() => {
    let keySequence: string[] = [];
    let sequenceTimeout: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        if (e.key === "Escape") {
          (e.target as HTMLElement).blur();
        }
        return;
      }

      const key = e.key.toLowerCase();
      keySequence.push(key);

      // Clear sequence after 1 second of inactivity
      clearTimeout(sequenceTimeout);
      sequenceTimeout = setTimeout(() => {
        keySequence = [];
      }, 1000);

      // Check for matching shortcuts
      for (const shortcut of shortcuts) {
        const shortcutKeys = shortcut.keys.map((k) => k.toLowerCase());

        // Single key shortcut
        if (
          shortcutKeys.length === 1 &&
          shortcutKeys[0] === key
        ) {
          e.preventDefault();
          shortcut.action();
          keySequence = [];
          return;
        }

        // Multi-key sequence
        if (shortcutKeys.length > 1) {
          const lastKeys = keySequence.slice(-shortcutKeys.length);
          if (
            lastKeys.length === shortcutKeys.length &&
            lastKeys.every((k, i) => k === shortcutKeys[i])
          ) {
            e.preventDefault();
            shortcut.action();
            keySequence = [];
            return;
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(sequenceTimeout);
    };
  }, [shortcuts]);

  return (
    <>
      {children}

      {/* Keyboard Shortcuts Help Dialog */}
      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="h-5 w-5" />
              Keyboard Shortcuts
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Navigation
              </h4>
              {shortcuts
                .filter((s) => s.keys[0] === "g" || s.keys[0] === "/")
                .map((shortcut, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-2">
                      {shortcut.icon}
                      <span className="text-sm">{shortcut.description}</span>
                    </div>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, j) => (
                        <Badge
                          key={j}
                          variant="secondary"
                          className="font-mono text-xs px-2"
                        >
                          {key}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">
                Other
              </h4>
              {shortcuts
                .filter(
                  (s) => s.keys[0] !== "g" && s.keys[0] !== "/" && s.keys[0] !== "escape"
                )
                .map((shortcut, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (i + 6) * 0.05 }}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-2">
                      {shortcut.icon}
                      <span className="text-sm">{shortcut.description}</span>
                    </div>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key, j) => (
                        <Badge
                          key={j}
                          variant="secondary"
                          className="font-mono text-xs px-2"
                        >
                          {key}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

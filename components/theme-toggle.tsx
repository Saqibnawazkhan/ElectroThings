"use client";

import { Moon, Sun, Monitor, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              {theme === "dark" ? (
                <Moon className="h-5 w-5 text-purple-400" />
              ) : theme === "light" ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Monitor className="h-5 w-5 text-blue-400" />
              )}
            </motion.div>
          </AnimatePresence>
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-md"
            animate={{
              boxShadow: theme === "dark"
                ? "0 0 15px rgba(168, 85, 247, 0.3)"
                : theme === "light"
                ? "0 0 15px rgba(234, 179, 8, 0.3)"
                : "0 0 15px rgba(59, 130, 246, 0.3)"
            }}
            transition={{ duration: 0.3 }}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl p-2"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="h-4 w-4 text-yellow-500" />
            </motion.div>
            <span>Light</span>
            {theme === "light" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto"
              >
                <Sparkles className="h-3 w-3 text-yellow-500" />
              </motion.div>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: -30, scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="h-4 w-4 text-purple-400" />
            </motion.div>
            <span>Dark</span>
            {theme === "dark" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto"
              >
                <Sparkles className="h-3 w-3 text-purple-400" />
              </motion.div>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="flex items-center gap-2 rounded-lg px-3 py-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <Monitor className="h-4 w-4 text-blue-400" />
            </motion.div>
            <span>System</span>
            {theme === "system" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-auto"
              >
                <Sparkles className="h-3 w-3 text-blue-400" />
              </motion.div>
            )}
          </DropdownMenuItem>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

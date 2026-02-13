"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, showHome = true, className }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from pathname if no items provided
  const breadcrumbs: BreadcrumbItem[] = items || generateBreadcrumbs(pathname);

  if (breadcrumbs.length === 0 && !showHome) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <motion.ol
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center flex-wrap gap-1 text-sm"
      >
        {showHome && (
          <motion.li
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0 }}
            className="flex items-center"
          >
            <Link
              href="/"
              className="group flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted/50 hover:bg-primary/10 transition-all duration-200"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Home className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
              </motion.div>
              <span className="sr-only sm:not-sr-only text-muted-foreground group-hover:text-primary transition-colors">
                Home
              </span>
            </Link>
          </motion.li>
        )}

        {breadcrumbs.map((item, index) => (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (index + 1) * 0.05 }}
            className="flex items-center"
          >
            <motion.div
              animate={{ x: [0, 2, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
            </motion.div>
            {index === breadcrumbs.length - 1 ? (
              <motion.span
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 font-medium text-foreground truncate max-w-[200px]"
                whileHover={{ scale: 1.02 }}
              >
                <Sparkles className="h-3 w-3 text-primary" />
                {item.label}
              </motion.span>
            ) : (
              <Link href={item.href}>
                <motion.span
                  className="px-2.5 py-1 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 truncate max-w-[150px] inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.span>
              </Link>
            )}
          </motion.li>
        ))}
      </motion.ol>
    </nav>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];

  let currentPath = "";
  for (const segment of paths) {
    currentPath += `/${segment}`;
    breadcrumbs.push({
      label: formatSegment(segment),
      href: currentPath,
    });
  }

  return breadcrumbs;
}

function formatSegment(segment: string): string {
  // Decode URI component and format
  const decoded = decodeURIComponent(segment);
  // Convert kebab-case or camelCase to Title Case
  return decoded
    .replace(/-/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

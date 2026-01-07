"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { QuickViewProvider } from "@/components/products/quick-view-provider";
import { CompareDrawer } from "@/components/products/compare-drawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider>
        {children}
        <Toaster position="top-right" richColors />
        <ScrollToTop />
        <QuickViewProvider />
        <CompareDrawer />
      </SessionProvider>
    </ThemeProvider>
  );
}

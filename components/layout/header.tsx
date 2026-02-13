"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  LayoutDashboard,
  Heart,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search/search-bar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useWishlistStore } from "@/lib/store/wishlist-store";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartDropdown } from "@/components/cart/cart-dropdown";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Electronics", slug: "electronics", icon: "📱" },
  { name: "Audio", slug: "audio", icon: "🎧" },
  { name: "Gaming", slug: "gaming", icon: "🎮" },
  { name: "Wearables", slug: "wearables", icon: "⌚" },
  { name: "Accessories", slug: "accessories", icon: "🔌" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const wishlistItemCount = useWishlistStore((state) => state.getItemCount());

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const headerBlur = useTransform(scrollY, [0, 100], [8, 16]);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/50 shadow-lg shadow-black/5"
          : "border-b border-transparent"
      )}
      style={{
        backdropFilter: `blur(${headerBlur}px)`,
      }}
    >
      {/* Gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/95 to-background/90"
        style={{ opacity: headerOpacity }}
      />

      {/* Animated border gradient */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />

      <div className="container mx-auto px-4 relative">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with 3D effect */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 10 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="relative"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                ElectroThings
              </span>
              <motion.div
                className="absolute -right-4 -top-1"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="h-3 w-3 text-yellow-500" />
              </motion.div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/products"
                className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-lg hover:bg-primary/5"
              >
                All Products
              </Link>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="text-sm font-medium">
                    Categories <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-56 p-2 bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl"
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.slug}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/categories/${category.slug}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  </motion.div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Search Bar */}
          <SearchBar className="hidden md:block flex-1 max-w-md mx-6" />

          {/* Right Actions */}
          <div className="flex items-center space-x-1">
            {/* Theme Toggle */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ThemeToggle />
            </motion.div>

            {/* Wishlist */}
            <Link href="/wishlist">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  <AnimatePresence>
                    {mounted && wishlistItemCount > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1"
                      >
                        <Badge
                          variant="secondary"
                          className="h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-pink-500 to-red-500 text-white border-0"
                        >
                          {wishlistItemCount}
                        </Badge>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>

            {/* Cart Dropdown */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <CartDropdown />
            </motion.div>

            {/* User Menu */}
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="icon" className="relative">
                      <User className="h-5 w-5" />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background" />
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2 bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl"
                >
                  <div className="px-3 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 mb-2">
                    <p className="text-sm font-medium">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg">
                      <User className="h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg">
                      <Package className="h-4 w-4" />
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  {session.user?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg">
                          <LayoutDashboard className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 flex items-center gap-2 px-3 py-2 rounded-lg"
                    onClick={() => signOut()}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg"
                  >
                    Sign In
                  </Button>
                </motion.div>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="icon">
                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                        >
                          <X className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                        >
                          <Menu className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile Search */}
                  <SearchBar onClose={() => setIsOpen(false)} />

                  <div className="border-t border-border/50 pt-4">
                    <Link
                      href="/products"
                      className="block py-3 text-sm font-medium hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      All Products
                    </Link>
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    <p className="text-sm font-semibold mb-3">Categories</p>
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.slug}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={`/categories/${category.slug}`}
                          className="flex items-center gap-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>{category.icon}</span>
                          {category.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-4">
                    {session ? (
                      <div className="space-y-2">
                        <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 mb-3">
                          <p className="text-sm font-medium">{session.user?.name}</p>
                          <p className="text-xs text-muted-foreground">{session.user?.email}</p>
                        </div>
                        <Link
                          href="/account"
                          className="block py-2 text-sm hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          className="block py-2 text-sm hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          My Orders
                        </Link>
                        {session.user?.role === "admin" && (
                          <Link
                            href="/admin"
                            className="block py-2 text-sm hover:text-primary transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-red-600 px-0 hover:bg-red-500/10"
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-primary to-purple-600">
                          Sign In
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

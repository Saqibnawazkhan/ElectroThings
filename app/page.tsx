import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductGrid } from "@/components/products/product-grid";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { getFeaturedProducts, getCategories } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Features */}
      <FeaturesSection />

      {/* Categories */}
      <CategoriesSection categories={categories} />

      {/* Featured Products */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold">Featured Products</h2>
            <Link href="/products">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <ProductGrid products={featuredProducts.slice(0, 8)} />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardContent className="p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  Get 10% Off Your First Order
                </h2>
                <p className="text-primary-foreground/80">
                  Sign up for our newsletter and receive exclusive offers and
                  updates.
                </p>
              </div>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="whitespace-nowrap"
                >
                  Sign Up Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

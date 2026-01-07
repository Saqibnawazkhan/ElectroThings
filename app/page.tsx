import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductGrid } from "@/components/products/product-grid";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
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
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold">Shop by Category</h2>
            <Link href="/products">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square bg-muted">
                    <Image
                      src={category.image || "/images/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {category.productCount} products
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

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

import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { CTASection } from "@/components/home/cta-section";
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
      <FeaturedProductsSection products={featuredProducts} />

      {/* CTA Banner */}
      <CTASection />
    </div>
  );
}

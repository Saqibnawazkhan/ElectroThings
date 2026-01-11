import { Hero3D } from "@/components/home/hero-3d";
import { FloatingProducts } from "@/components/home/floating-products";
import { Categories3D } from "@/components/home/categories-3d";
import { Stats3D } from "@/components/home/stats-3d";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { RecentlyViewed } from "@/components/products/recently-viewed";
import { CTASection } from "@/components/home/cta-section";
import { getFeaturedProducts, getCategories, getProducts } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();
  const allProducts = getProducts();

  return (
    <div className="flex flex-col">
      {/* 3D Hero Section */}
      <Hero3D />

      {/* 3D Stats Section */}
      <Stats3D />

      {/* 3D Floating Products */}
      <FloatingProducts
        products={featuredProducts}
        title="Featured Products"
        subtitle="Handpicked selection of our best sellers"
      />

      {/* 3D Categories */}
      <Categories3D categories={categories} />

      {/* Featured Products with 3D Cards */}
      <FeaturedProductsSection products={allProducts.slice(0, 8)} />

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* CTA Banner */}
      <CTASection />
    </div>
  );
}

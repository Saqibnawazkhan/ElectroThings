import { Hero3D } from "@/components/home/hero-3d";
import { FloatingProducts } from "@/components/home/floating-products";
import { Categories3D } from "@/components/home/categories-3d";
import { Stats3D } from "@/components/home/stats-3d";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { RecentlyViewed } from "@/components/products/recently-viewed";
import { CTASection } from "@/components/home/cta-section";
import { DealsSection } from "@/components/home/deals-section";
import { Testimonials3D } from "@/components/home/testimonials-3d";
import { Newsletter3D } from "@/components/home/newsletter-3d";
import { BrandPartners3D } from "@/components/home/brand-partners-3d";
import { Features3D } from "@/components/home/features-3d";
import { FAQ3D } from "@/components/home/faq-3d";
import { getFeaturedProducts, getCategories, getProducts } from "@/lib/data";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const categories = getCategories();
  const allProducts = getProducts();

  return (
    <div className="flex flex-col">
      {/* 3D Hero Section */}
      <Hero3D />

      {/* Brand Partners */}
      <BrandPartners3D />

      {/* 3D Stats Section */}
      <Stats3D />

      {/* 3D Floating Products */}
      <FloatingProducts
        products={featuredProducts}
        title="Featured Products"
        subtitle="Handpicked selection of our best sellers"
      />

      {/* Flash Deals Section */}
      <DealsSection products={allProducts} />

      {/* 3D Categories */}
      <Categories3D categories={categories} />

      {/* Featured Products with 3D Cards */}
      <FeaturedProductsSection products={allProducts.slice(0, 12)} />

      {/* Features/Benefits */}
      <Features3D />

      {/* Testimonials */}
      <Testimonials3D />

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* FAQ Section */}
      <FAQ3D />

      {/* Newsletter */}
      <Newsletter3D />

      {/* CTA Banner */}
      <CTASection />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductReviews } from "@/components/products/product-reviews";
import { ShareProduct } from "@/components/products/share-product";
import { WishlistButton } from "@/components/products/wishlist-button";
import { StockNotification } from "@/components/products/stock-notification";
import { VariantSelector, mockVariants } from "@/components/products/variant-selector";
import { ProductQA } from "@/components/products/product-qa";
import { ProductCarousel } from "@/components/products/product-carousel";
import { useCartStore } from "@/lib/store/cart-store";
import { useRecentlyViewedStore } from "@/lib/store/recently-viewed-store";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { Product } from "@/types";
import { toast } from "sonner";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  const addToRecentlyViewed = useRecentlyViewedStore((state) => state.addItem);

  useEffect(() => {
    const prod = getProductBySlug(slug);
    if (prod) {
      setProduct(prod);
      setRelatedProducts(getRelatedProducts(prod));
      // Track as recently viewed
      addToRecentlyViewed(prod);
    }
    setLoading(false);
  }, [slug, addToRecentlyViewed]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Products", href: "/products" },
          { label: product.category, href: `/categories/${product.categorySlug}` },
          { label: product.name, href: `/products/${product.slug}` },
        ]}
      />

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Gallery */}
        <ProductImageGallery
          images={product.images}
          productName={product.name}
          discount={discount}
        />

        {/* Product Info */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-6">{product.description}</p>

          {/* Stock Status */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-600">
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <Badge variant="secondary">Out of Stock</Badge>
              )}
            </div>
            <StockNotification
              productId={product.id}
              productName={product.name}
              stock={product.stock}
            />
          </div>

          <Separator className="my-6" />

          {/* Variant Selector (for electronics category) */}
          {(product.categorySlug === "electronics" || product.categorySlug === "audio") && (
            <div className="mb-6">
              <VariantSelector variantGroups={mockVariants} />
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-6">
            <WishlistButton product={product} />
            <ShareProduct
              productName={product.name}
              productSlug={product.slug}
            />
          </div>

          {/* Shipping Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    On orders over $100. Delivery in 3-5 business days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="specifications" className="mt-12">
        <TabsList>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="qa">Q&A</TabsTrigger>
        </TabsList>
        <TabsContent value="specifications" className="mt-6">
          {product.specifications ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-3 border-b"
                >
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No specifications available.
            </p>
          )}
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <ProductReviews
            productId={product.id}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </TabsContent>
        <TabsContent value="qa" className="mt-6">
          <ProductQA productId={product.id} />
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <ProductCarousel
            title="Related Products"
            products={relatedProducts}
          />
        </section>
      )}
    </div>
  );
}

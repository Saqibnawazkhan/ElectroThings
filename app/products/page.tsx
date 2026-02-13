import { Suspense } from "react";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductSortBar } from "@/components/products/product-sort-bar";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { getProducts, getCategories } from "@/lib/data";
import { ProductFilters as Filters } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
  }>;
}

export const metadata = {
  title: "Products",
  description: "Browse our complete collection of electronics and gadgets.",
};

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-square w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

async function ProductList({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const filters: Filters = {
    category: params.category,
    search: params.search,
    minPrice: params.minPrice ? parseFloat(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? parseFloat(params.maxPrice) : undefined,
    sortBy: params.sortBy as Filters["sortBy"],
  };

  const products = getProducts(filters);

  return (
    <div>
      <ProductSortBar productCount={products.length} searchTerm={params.search} />
      <ProductGrid products={products} />
    </div>
  );
}

export default async function ProductsPage(props: ProductsPageProps) {
  const categories = getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Products", href: "/products" }]} />
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <Suspense fallback={<Skeleton className="h-[400px] w-64" />}>
          <ProductFilters categories={categories} />
        </Suspense>

        <div className="flex-1">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductList searchParams={props.searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

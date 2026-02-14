import { APP_CONFIG } from "@/lib/constants/app-config";

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  rating?: {
    value: number;
    count: number;
  };
}

export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = "USD",
  availability = "InStock",
  rating,
}: ProductJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    offers: {
      "@type": "Offer",
      price: price.toString(),
      priceCurrency: currency,
      availability: `https://schema.org/${availability}`,
      url: APP_CONFIG.url,
    },
    ...(rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: rating.value.toString(),
        reviewCount: rating.count.toString(),
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_CONFIG.name,
    url: APP_CONFIG.url,
    logo: `${APP_CONFIG.url}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: APP_CONFIG.contact.phone,
      contactType: "customer service",
      email: APP_CONFIG.contact.email,
    },
    sameAs: Object.values(APP_CONFIG.social),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

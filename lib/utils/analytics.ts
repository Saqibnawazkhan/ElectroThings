export const analytics = {
  trackPageView: (url: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  },

  trackEvent: (event: string, params?: Record<string, any>) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event, params);
    }
  },

  trackAddToCart: (productId: string, productName: string, price: number) => {
    analytics.trackEvent("add_to_cart", {
      item_id: productId,
      item_name: productName,
      price,
    });
  },

  trackPurchase: (orderId: string, total: number, items: any[]) => {
    analytics.trackEvent("purchase", {
      transaction_id: orderId,
      value: total,
      items,
    });
  },

  trackSearch: (searchTerm: string) => {
    analytics.trackEvent("search", {
      search_term: searchTerm,
    });
  },

  trackProductView: (productId: string, productName: string) => {
    analytics.trackEvent("view_item", {
      item_id: productId,
      item_name: productName,
    });
  },
};

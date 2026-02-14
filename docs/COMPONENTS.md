# Component Documentation

## UI Components

### Button Variants
Located in `/components/ui/button-variants.tsx`

**GradientShineButton**
```tsx
import { GradientShineButton } from "@/components/ui/button-variants";

<GradientShineButton onClick={() => console.log("clicked")}>
  Click Me
</GradientShineButton>
```

**NeonGlowButton**
```tsx
<NeonGlowButton onClick={() => console.log("clicked")}>
  Neon Effect
</NeonGlowButton>
```

### Rating Stars
Located in `/components/ui/rating-stars.tsx`

```tsx
import { RatingStars } from "@/components/ui/rating-stars";

<RatingStars
  rating={4.5}
  maxRating={5}
  showNumber={true}
  interactive={true}
  onRate={(rating) => console.log(rating)}
/>
```

### Color Picker
Located in `/components/ui/color-picker.tsx`

```tsx
import { ColorPicker } from "@/components/ui/color-picker";

<ColorPicker
  colors={[
    { name: "Red", value: "red", hex: "#ff0000" },
    { name: "Blue", value: "blue", hex: "#0000ff" }
  ]}
  onSelect={(color) => console.log(color)}
/>
```

## Feature Components

### Wishlist Manager
```tsx
import { WishlistManager } from "@/components/features/wishlist-manager";

<WishlistManager
  items={wishlistItems}
  onRemove={(id) => removeFromWishlist(id)}
  onAddToCart={(id) => addToCart(id)}
/>
```

### Product Comparison
```tsx
import { ProductComparisonPanel } from "@/components/features/product-comparison-panel";

<ProductComparisonPanel
  products={selectedProducts}
  onRemove={(id) => removeProduct(id)}
/>
```

## Custom Hooks

### useLocalStorage
```tsx
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";

const [value, setValue] = useLocalStorage("key", initialValue);
```

### useDebounce
```tsx
import { useDebounce } from "@/lib/hooks/useDebounce";

const debouncedValue = useDebounce(searchTerm, 500);
```

### useMediaQuery
```tsx
import { useIsMobile } from "@/lib/hooks/useMediaQuery";

const isMobile = useIsMobile();
```

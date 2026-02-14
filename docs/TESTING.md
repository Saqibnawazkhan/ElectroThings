# Testing Guide

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage
```

## Test Structure

```
├── __tests__/
│   ├── components/
│   ├── utils/
│   └── pages/
```

## Writing Tests

### Component Tests
```tsx
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/products/product-card";

describe("ProductCard", () => {
  it("renders product information", () => {
    const product = {
      name: "Test Product",
      price: 99.99,
    };

    render(<ProductCard product={product} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });
});
```

### Utility Tests
```tsx
import { formatPrice } from "@/lib/utils/formatters";

describe("formatPrice", () => {
  it("formats USD correctly", () => {
    expect(formatPrice(99.99, "USD")).toBe("$99.99");
  });
});
```

## Best Practices

- Write descriptive test names
- Test edge cases
- Mock external dependencies
- Aim for high code coverage
- Keep tests isolated and independent

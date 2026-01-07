import { z } from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone number is required"),
});

export const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  sameAsShipping: z.boolean(),
  paymentMethod: z.enum(["card", "paypal"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
}).refine(
  (data) => {
    if (data.paymentMethod === "card") {
      return (
        data.cardNumber &&
        data.cardNumber.length >= 16 &&
        data.cardExpiry &&
        data.cardCvc
      );
    }
    return true;
  },
  {
    message: "Card details are required for card payment",
    path: ["cardNumber"],
  }
);

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  originalPrice: z.number().optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  category: z.string().min(1, "Category is required"),
  categorySlug: z.string().min(1, "Category slug is required"),
  stock: z.number().int().min(0, "Stock must be non-negative"),
  rating: z.number().min(0).max(5),
  reviewCount: z.number().int().min(0),
  featured: z.boolean(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProductFormData = z.infer<typeof productSchema>;

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function handleError(error: unknown): {
  message: string;
  statusCode: number;
  code?: string;
} {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
    };
  }

  return {
    message: "An unexpected error occurred",
    statusCode: 500,
  };
}

export function logError(error: unknown, context?: Record<string, any>) {
  console.error("[Error]", {
    error,
    context,
    timestamp: new Date().toISOString(),
  });

  // In production, send to error tracking service
  if (process.env.NODE_ENV === "production") {
    // TODO: Send to Sentry, LogRocket, etc.
  }
}

export const ErrorMessages = {
  PRODUCT_NOT_FOUND: "Product not found",
  OUT_OF_STOCK: "Product is out of stock",
  INVALID_QUANTITY: "Invalid quantity",
  CART_EMPTY: "Your cart is empty",
  PAYMENT_FAILED: "Payment failed",
  UNAUTHORIZED: "You must be logged in",
  INVALID_CREDENTIALS: "Invalid email or password",
  SERVER_ERROR: "Something went wrong. Please try again.",
};

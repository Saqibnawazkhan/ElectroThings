# API Documentation

## Authentication Endpoints

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### POST /api/auth/[...nextauth]
NextAuth authentication endpoint for login/logout.

## Order Endpoints

### POST /api/orders
Create a new order.

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product-id",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  }
}
```

**Response:**
```json
{
  "success": true,
  "orderId": "order-id",
  "total": 99.99
}
```

### GET /api/orders
Get user's orders (requires authentication).

**Response:**
```json
{
  "orders": [
    {
      "id": "order-id",
      "total": 99.99,
      "status": "delivered",
      "createdAt": "2026-02-14"
    }
  ]
}
```

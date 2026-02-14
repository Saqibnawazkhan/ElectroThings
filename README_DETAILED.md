# ElectroThings - E-commerce Platform

A modern, feature-rich e-commerce platform built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Features

### Customer Features
- **Product Catalog** - Browse electronics with advanced filtering and sorting
- **Product Details** - 360° view, image zoom, detailed specifications
- **Shopping Cart** - Real-time cart management with persistence
- **Wishlist** - Save favorite items for later
- **Product Comparison** - Compare multiple products side-by-side
- **Search** - Smart search with suggestions and autocomplete
- **Reviews & Ratings** - Customer reviews with ratings
- **Quick Buy** - Express checkout options
- **Gift Wrapping** - Add gift wrap and personalized messages

### Admin Features
- **Dashboard** - Sales analytics and insights
- **Product Management** - Add, edit, delete products
- **Order Management** - Track and manage orders
- **User Management** - Manage customer accounts
- **Settings** - Configure store settings

### UI/UX Features
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Dark Mode** - Toggle between light and dark themes
- **Animations** - Smooth transitions and micro-interactions
- **3D Effects** - Modern 3D UI elements
- **Loading States** - Skeleton screens and loaders
- **Toast Notifications** - User feedback system

## 🛠️ Tech Stack

- **Framework:** Next.js 16.1.1
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod
- **Authentication:** NextAuth v5

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Saqibnawazkhan/ElectroThings.git

# Navigate to project directory
cd ElectroThings

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🔧 Configuration

Copy `.env.example` to `.env.local` and configure:

```env
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

## 📚 Project Structure

```
├── app/                    # Next.js app directory
│   ├── (routes)/          # Page routes
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # UI components
│   ├── features/          # Feature components
│   ├── products/          # Product components
│   └── layout/            # Layout components
├── lib/                   # Utilities and helpers
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Helper functions
│   ├── constants/         # Constants and config
│   └── store/             # Zustand stores
└── types/                 # TypeScript types

```

## 🚀 Deployment

The app is optimized for Vercel deployment:

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

## 📧 Contact

- Email: support@electrothings.com
- Website: https://electrothings.com

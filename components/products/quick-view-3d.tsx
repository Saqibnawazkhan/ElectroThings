"use client"

import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Check,
  Truck,
  RefreshCw,
  Shield,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  description: string
  images: string[]
  colors: { name: string; value: string }[]
  sizes?: string[]
  inStock: boolean
  features: string[]
  category: string
}

export function QuickView3D({
  product,
  isOpen,
  onClose,
}: {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!product) return null

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-6xl bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 rounded-3xl overflow-hidden pointer-events-auto"
              style={{
                boxShadow: '0 0 100px rgba(168, 85, 247, 0.5)',
              }}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-slate-900/90 backdrop-blur-xl rounded-full flex items-center justify-center border border-purple-500/20 hover:border-purple-500/40 transition-colors"
              >
                <X className="w-6 h-6 text-purple-400" />
              </motion.button>

              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Left: Image Gallery */}
                <div className="space-y-4">
                  {/* Main Image */}
                  <motion.div
                    className="relative aspect-square rounded-2xl overflow-hidden bg-slate-800/50 group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-4 right-4 w-12 h-12 bg-slate-900/90 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ZoomIn className="w-6 h-6 text-white" />
                    </motion.button>

                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <motion.button
                          onClick={() =>
                            setSelectedImage(
                              selectedImage === 0 ? product.images.length - 1 : selectedImage - 1
                            )
                          }
                          whileHover={{ scale: 1.1, x: -5 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronLeft className="w-6 h-6 text-white" />
                        </motion.button>
                        <motion.button
                          onClick={() =>
                            setSelectedImage((selectedImage + 1) % product.images.length)
                          }
                          whileHover={{ scale: 1.1, x: 5 }}
                          whileTap={{ scale: 0.9 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-900/90 backdrop-blur-xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="w-6 h-6 text-white" />
                        </motion.button>
                      </>
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-full text-white font-bold text-sm"
                      >
                        -{discount}%
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Thumbnails */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images.map((image, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === idx
                            ? 'border-purple-500'
                            : 'border-purple-500/20 hover:border-purple-500/40'
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Right: Product Details */}
                <div className="flex flex-col">
                  <div className="flex-1 space-y-6">
                    {/* Category & Stock */}
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                      {product.inStock ? (
                        <div className="flex items-center gap-1 text-green-400 text-sm">
                          <Check className="w-4 h-4" />
                          <span>In Stock</span>
                        </div>
                      ) : (
                        <span className="text-red-400 text-sm">Out of Stock</span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-white">{product.name}</h2>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400">
                        {product.rating} ({product.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                      <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ${product.price}
                      </div>
                      {product.originalPrice && (
                        <div className="text-xl text-gray-500 line-through">
                          ${product.originalPrice}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 leading-relaxed">{product.description}</p>

                    {/* Color Selection */}
                    {product.colors.length > 0 && (
                      <div>
                        <label className="block text-white font-medium mb-3">
                          Color: {product.colors[selectedColor].name}
                        </label>
                        <div className="flex gap-3">
                          {product.colors.map((color, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => setSelectedColor(idx)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              className={`w-10 h-10 rounded-full border-2 transition-colors ${
                                selectedColor === idx
                                  ? 'border-purple-500'
                                  : 'border-transparent'
                              }`}
                              style={{
                                background: color.value,
                                boxShadow:
                                  selectedColor === idx
                                    ? `0 0 20px ${color.value}40`
                                    : 'none',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Size Selection */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div>
                        <label className="block text-white font-medium mb-3">Size</label>
                        <div className="flex gap-3">
                          {product.sizes.map((size, idx) => (
                            <motion.button
                              key={idx}
                              onClick={() => setSelectedSize(idx)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                selectedSize === idx
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                  : 'bg-slate-800/50 text-gray-300 hover:text-white border border-purple-500/20'
                              }`}
                            >
                              {size}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quantity */}
                    <div>
                      <label className="block text-white font-medium mb-3">Quantity</label>
                      <div className="flex items-center gap-4 bg-slate-800/50 rounded-lg p-1 w-fit">
                        <motion.button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-purple-500/20 rounded flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                        >
                          <span className="text-purple-400 text-xl">−</span>
                        </motion.button>
                        <span className="text-white font-bold text-lg w-12 text-center">
                          {quantity}
                        </span>
                        <motion.button
                          onClick={() => setQuantity(quantity + 1)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-10 h-10 bg-purple-500/20 rounded flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                        >
                          <span className="text-purple-400 text-xl">+</span>
                        </motion.button>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <Check className="w-4 h-4 text-green-400" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4 pt-6 border-t border-purple-500/20">
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!product.inStock}
                        className="flex-1 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </motion.button>
                      <motion.button
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
                          isWishlisted
                            ? 'bg-gradient-to-br from-red-600 to-pink-600'
                            : 'bg-slate-800/50 border border-purple-500/20 hover:border-purple-500/40'
                        }`}
                      >
                        <Heart
                          className={`w-6 h-6 ${
                            isWishlisted ? 'fill-white text-white' : 'text-gray-400'
                          }`}
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-14 h-14 bg-slate-800/50 rounded-xl flex items-center justify-center border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                      >
                        <Share2 className="w-6 h-6 text-gray-400" />
                      </motion.button>
                    </div>

                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: Truck, text: 'Free Shipping' },
                        { icon: RefreshCw, text: 'Easy Returns' },
                        { icon: Shield, text: 'Secure Payment' },
                      ].map((badge, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-gray-400"
                        >
                          <badge.icon className="w-4 h-4 text-purple-400" />
                          <span>{badge.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

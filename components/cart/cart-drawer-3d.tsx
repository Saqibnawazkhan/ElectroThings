"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
}

export function CartDrawer3D({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Wireless Headphones Pro',
      price: 299.99,
      quantity: 1,
      image: '/images/products/headphones-1.jpg',
      color: 'Black',
    },
    {
      id: '2',
      name: 'Smart Watch Ultra',
      price: 499.99,
      quantity: 2,
      image: '/images/products/watch-1.jpg',
      color: 'Silver',
      size: '44mm',
    },
    {
      id: '3',
      name: 'Gaming Keyboard RGB',
      price: 159.99,
      quantity: 1,
      image: '/images/products/keyboard-1.jpg',
    },
  ])

  const updateQuantity = (id: string, change: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 29.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 shadow-2xl z-50 flex flex-col"
            style={{
              boxShadow: '-10px 0 50px rgba(168, 85, 247, 0.3)',
            }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-purple-500/20">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Shopping Cart</h2>
                    <p className="text-sm text-purple-300">{items.length} items</p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                >
                  <X className="w-5 h-5 text-purple-400" />
                </motion.button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <div className="w-24 h-24 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag className="w-12 h-12 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Add some products to get started
                    </p>
                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg"
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  items.map((item, idx) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      index={idx}
                      onUpdateQuantity={(change) => updateQuantity(item.id, change)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="border-t border-purple-500/20 bg-slate-950/90 backdrop-blur-xl p-6 space-y-4"
              >
                {/* Promo Code */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/40"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-purple-500/20 text-purple-400 font-medium rounded-lg hover:bg-purple-500/30 transition-colors"
                  >
                    Apply
                  </motion.button>
                </div>

                {/* Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                  <div className="flex justify-between text-white text-lg font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                      initial={{ x: '100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function CartItemCard({
  item,
  index,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem
  index: number
  onUpdateQuantity: (change: number) => void
  onRemove: () => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50, height: 0 }}
      transition={{ delay: index * 0.05 }}
      className="relative group"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl blur-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />
      <div className="relative bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
        <div className="flex gap-4">
          {/* Image */}
          <motion.div
            className="relative w-24 h-24 rounded-lg overflow-hidden bg-slate-800"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-white truncate">{item.name}</h3>
              <motion.button
                onClick={onRemove}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center hover:bg-red-500/30 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </motion.button>
            </div>

            {/* Variants */}
            {(item.color || item.size) && (
              <div className="flex gap-2 mb-2 text-xs text-gray-400">
                {item.color && (
                  <span className="px-2 py-1 bg-purple-500/10 rounded">
                    {item.color}
                  </span>
                )}
                {item.size && (
                  <span className="px-2 py-1 bg-purple-500/10 rounded">{item.size}</span>
                )}
              </div>
            )}

            {/* Price & Quantity */}
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ${(item.price * item.quantity).toFixed(2)}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1">
                <motion.button
                  onClick={() => onUpdateQuantity(-1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-7 h-7 bg-purple-500/20 rounded flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                >
                  <Minus className="w-3 h-3 text-purple-400" />
                </motion.button>
                <span className="w-8 text-center font-medium text-white">
                  {item.quantity}
                </span>
                <motion.button
                  onClick={() => onUpdateQuantity(1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-7 h-7 bg-purple-500/20 rounded flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                >
                  <Plus className="w-3 h-3 text-purple-400" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function MiniCart({ itemCount, onClick }: { itemCount: number; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center relative">
        <ShoppingBag className="w-6 h-6 text-white" />
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-slate-900"
            >
              {itemCount}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  )
}

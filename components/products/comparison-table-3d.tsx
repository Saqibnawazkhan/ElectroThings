"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, X, Star, Zap, Shield, Award } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  features: {
    name: string
    value: string | boolean
  }[]
}

export function ComparisonTable3D({ products }: { products: Product[] }) {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl p-1">
        <div className="bg-slate-950/90 backdrop-blur-xl rounded-xl overflow-hidden">
          {/* Header Row */}
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-purple-500/20">
            <div className="font-semibold text-purple-300">Features</div>
            {products.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                className="relative"
                onHoverStart={() => setHoveredColumn(idx)}
                onHoverEnd={() => setHoveredColumn(null)}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg blur-xl"
                  animate={{
                    opacity: hoveredColumn === idx ? 1 : 0,
                  }}
                />
                <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-4 rounded-lg border border-purple-500/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{product.rating}</span>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ${product.price}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Rows */}
          <div className="divide-y divide-purple-500/10">
            {products[0]?.features.map((feature, featureIdx) => (
              <FeatureRow
                key={featureIdx}
                featureName={feature.name}
                values={products.slice(0, 3).map((p) => p.features[featureIdx].value)}
                hoveredColumn={hoveredColumn}
              />
            ))}
          </div>

          {/* Action Row */}
          <div className="grid grid-cols-4 gap-4 p-6 border-t border-purple-500/20">
            <div></div>
            {products.slice(0, 3).map((product, idx) => (
              <motion.button
                key={product.id}
                className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Choose Plan</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureRow({
  featureName,
  values,
  hoveredColumn,
}: {
  featureName: string
  values: (string | boolean)[]
  hoveredColumn: number | null
}) {
  return (
    <motion.div
      className="grid grid-cols-4 gap-4 p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-gray-300 font-medium">{featureName}</div>
      {values.map((value, idx) => (
        <motion.div
          key={idx}
          className="flex items-center justify-center"
          animate={{
            scale: hoveredColumn === idx ? 1.1 : 1,
            color: hoveredColumn === idx ? '#c084fc' : '#ffffff',
          }}
        >
          {typeof value === 'boolean' ? (
            value ? (
              <Check className="w-6 h-6 text-green-400" />
            ) : (
              <X className="w-6 h-6 text-red-400" />
            )
          ) : (
            <span className="text-sm text-white font-medium">{value}</span>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

export function QuickCompare({ products }: { products: Product[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.slice(0, 3).map((product, idx) => (
        <CompareCard key={product.id} product={product} index={idx} />
      ))}
    </div>
  )
}

function CompareCard({ product, index }: { product: Product; index: number }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 100,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 100,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="perspective-1000"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-colors"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-2xl"
          style={{ transform: 'translateZ(-20px)' }}
        />

        <div className="relative space-y-4" style={{ transform: 'translateZ(20px)' }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-lg"
          />

          <div>
            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">{product.rating}</span>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              ${product.price}
            </div>
          </div>

          <div className="space-y-2">
            {product.features.slice(0, 4).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                {typeof feature.value === 'boolean' ? (
                  feature.value ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <X className="w-4 h-4 text-red-400" />
                  )
                ) : (
                  <Zap className="w-4 h-4 text-purple-400" />
                )}
                <span className="text-gray-300">{feature.name}</span>
                {typeof feature.value === 'string' && (
                  <span className="ml-auto text-white font-medium">{feature.value}</span>
                )}
              </div>
            ))}
          </div>

          <motion.button
            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Select This
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FeatureHighlight() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: '10x faster processing speed',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Secure & Safe',
      description: 'Bank-level encryption',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Top rated by experts',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          whileHover={{ y: -10, scale: 1.05 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <div
              className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

"use client"

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Star, ThumbsUp, MessageSquare, CheckCircle, TrendingUp, Award } from 'lucide-react'
import { useState } from 'react'

interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  title: string
  content: string
  helpful: number
  verified: boolean
  images?: string[]
}

const dummyReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    avatar: '/images/avatars/user-1.jpg',
    rating: 5,
    date: '2024-01-10',
    title: 'Absolutely Amazing Product!',
    content:
      'This product exceeded all my expectations. The build quality is exceptional and the performance is outstanding. Highly recommended for anyone looking for a premium experience.',
    helpful: 42,
    verified: true,
    images: ['/images/reviews/review-1-1.jpg', '/images/reviews/review-1-2.jpg'],
  },
  {
    id: '2',
    author: 'Michael Chen',
    avatar: '/images/avatars/user-2.jpg',
    rating: 4,
    date: '2024-01-08',
    title: 'Great value for money',
    content:
      'Really impressed with the features and performance. Only minor issue was the setup process which took a bit longer than expected. Overall, very satisfied with my purchase.',
    helpful: 28,
    verified: true,
  },
  {
    id: '3',
    author: 'Emily Rodriguez',
    avatar: '/images/avatars/user-3.jpg',
    rating: 5,
    date: '2024-01-05',
    title: 'Perfect for my needs',
    content:
      'Exactly what I was looking for. The design is sleek and modern, and it works flawlessly. Customer service was also excellent when I had questions.',
    helpful: 35,
    verified: false,
  },
  {
    id: '4',
    author: 'David Kim',
    avatar: '/images/avatars/user-4.jpg',
    rating: 5,
    date: '2024-01-03',
    title: 'Best purchase this year!',
    content:
      'I have been using this for a week now and I am blown away by the quality. The attention to detail is remarkable. Worth every penny!',
    helpful: 51,
    verified: true,
    images: ['/images/reviews/review-4-1.jpg'],
  },
]

export function Reviews3D() {
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('helpful')

  const averageRating = 4.7
  const totalReviews = 2847

  const ratingDistribution = [
    { stars: 5, count: 2143, percentage: 75 },
    { stars: 4, count: 512, percentage: 18 },
    { stars: 3, count: 142, percentage: 5 },
    { stars: 2, count: 35, percentage: 1 },
    { stars: 1, count: 15, percentage: 1 },
  ]

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 p-8 rounded-2xl border border-purple-500/20">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2"
              >
                {averageRating}
              </motion.div>
              <div className="flex justify-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        i < Math.floor(averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-400">Based on {totalReviews.toLocaleString()} reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Rating Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
          <div className="relative bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 p-8 rounded-2xl border border-purple-500/20">
            <h3 className="text-xl font-bold text-white mb-6">Rating Distribution</h3>
            <div className="space-y-3">
              {ratingDistribution.map((rating, idx) => (
                <motion.div
                  key={rating.stars}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-white font-medium">{rating.stars}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-3 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${rating.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </div>
                  <span className="text-gray-400 text-sm w-16 text-right">
                    {rating.count}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Indicators */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: CheckCircle, label: 'Verified Purchases', value: '89%' },
          { icon: TrendingUp, label: 'Would Recommend', value: '94%' },
          { icon: Award, label: 'Quality Rating', value: '4.8/5' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-slate-900/50 to-purple-900/20 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">Customer Reviews</h3>
        <div className="flex gap-2">
          {(['recent', 'helpful', 'rating'] as const).map((option) => (
            <motion.button
              key={option}
              onClick={() => setSortBy(option)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === option
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-slate-900/50 text-gray-400 hover:text-white border border-purple-500/20'
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {dummyReviews.map((review, idx) => (
          <ReviewCard key={review.id} review={review} index={idx} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const [isHelpful, setIsHelpful] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 100,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
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
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative group"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"
          style={{ transform: 'translateZ(-20px)' }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        <div
          className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-colors"
          style={{ transform: 'translateZ(20px)' }}
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
              {review.author.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-white">{review.author}</h4>
                {review.verified && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 rounded-full"
                  >
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400 font-medium">Verified</span>
                  </motion.div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="mb-4">
            <h5 className="text-lg font-bold text-white mb-2">{review.title}</h5>
            <p className="text-gray-300 leading-relaxed">{review.content}</p>
          </div>

          {/* Images */}
          {review.images && review.images.length > 0 && (
            <div className="flex gap-2 mb-4">
              {review.images.map((image, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 rounded-lg overflow-hidden bg-slate-800"
                >
                  <img src={image} alt="Review" className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center gap-4 pt-4 border-t border-purple-500/10">
            <motion.button
              onClick={() => setIsHelpful(!isHelpful)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isHelpful
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'bg-slate-800/50 text-gray-400 hover:text-white'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm font-medium">
                Helpful ({review.helpful + (isHelpful ? 1 : 0)})
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">Reply</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

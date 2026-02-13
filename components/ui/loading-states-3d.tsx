"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, CheckCircle, XCircle, Package, Truck, Zap } from 'lucide-react'

export function LoadingSpinner3D({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  }

  return (
    <div className="relative" style={{ perspective: '1000px' }}>
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{
          rotateY: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
        <div className="absolute inset-2 bg-slate-900 rounded-full" />
      </motion.div>
    </div>
  )
}

export function LoadingDots() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

export function LoadingPulse() {
  return (
    <div className="relative w-32 h-32">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-4 border-purple-500 rounded-full"
          animate={{
            scale: [1, 2, 2],
            opacity: [1, 0, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full" />
      </div>
    </div>
  )
}

export function LoadingCube() {
  return (
    <div className="relative w-24 h-24" style={{ perspective: '1000px' }}>
      <motion.div
        className="w-full h-full relative"
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-80"
          style={{ transform: 'translateZ(12px)' }}
        />
        {/* Back */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600 opacity-80"
          style={{ transform: 'translateZ(-12px) rotateY(180deg)' }}
        />
        {/* Right */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-80"
          style={{ transform: 'rotateY(90deg) translateZ(12px)' }}
        />
        {/* Left */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-500 opacity-80"
          style={{ transform: 'rotateY(-90deg) translateZ(12px)' }}
        />
        {/* Top */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 opacity-80"
          style={{ transform: 'rotateX(90deg) translateZ(12px)' }}
        />
        {/* Bottom */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 opacity-80"
          style={{ transform: 'rotateX(-90deg) translateZ(12px)' }}
        />
      </motion.div>
    </div>
  )
}

export function PageLoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <LoadingCube />
        <motion.p
          className="mt-6 text-lg text-purple-300 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading amazing experience...
        </motion.p>
      </div>
    </motion.div>
  )
}

export function SuccessAnimation({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      className="relative"
    >
      <motion.div
        className="absolute inset-0 bg-green-500 rounded-full blur-2xl"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="relative w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 10 }}
        >
          <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-white font-semibold text-center"
      >
        {message}
      </motion.p>
    </motion.div>
  )
}

export function ErrorAnimation({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      className="relative"
    >
      <motion.div
        className="absolute inset-0 bg-red-500 rounded-full blur-2xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <div className="relative w-24 h-24 bg-gradient-to-br from-red-600 to-rose-600 rounded-full flex items-center justify-center">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: 3 }}
        >
          <XCircle className="w-12 h-12 text-white" />
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-white font-semibold text-center"
      >
        {message}
      </motion.p>
    </motion.div>
  )
}

export function OrderTrackingAnimation({ stage = 0 }: { stage: number }) {
  const stages = [
    { icon: Package, label: 'Order Placed', color: 'from-blue-600 to-cyan-600' },
    { icon: Zap, label: 'Processing', color: 'from-purple-600 to-pink-600' },
    { icon: Truck, label: 'Shipped', color: 'from-orange-600 to-yellow-600' },
    { icon: CheckCircle, label: 'Delivered', color: 'from-green-600 to-emerald-600' },
  ]

  return (
    <div className="space-y-8">
      {stages.map((stageData, idx) => {
        const Icon = stageData.icon
        const isCompleted = idx < stage
        const isCurrent = idx === stage
        const isPending = idx > stage

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex items-center gap-6"
          >
            {/* Icon */}
            <motion.div
              className={`relative w-16 h-16 rounded-full flex items-center justify-center ${
                isCompleted || isCurrent
                  ? `bg-gradient-to-br ${stageData.color}`
                  : 'bg-slate-800'
              }`}
              animate={
                isCurrent
                  ? {
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(168, 85, 247, 0)',
                        '0 0 0 20px rgba(168, 85, 247, 0)',
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: isCurrent ? Infinity : 0 }}
            >
              <Icon className={`w-8 h-8 ${isPending ? 'text-gray-600' : 'text-white'}`} />
            </motion.div>

            {/* Label */}
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${
                  isCompleted || isCurrent ? 'text-white' : 'text-gray-600'
                }`}
              >
                {stageData.label}
              </h3>
              {isCurrent && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-purple-400"
                >
                  In progress...
                </motion.p>
              )}
              {isCompleted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-sm text-green-400"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Completed</span>
                </motion.div>
              )}
            </div>

            {/* Connecting Line */}
            {idx < stages.length - 1 && (
              <div className="absolute left-8 top-16 w-0.5 h-8 bg-slate-800">
                <motion.div
                  className={`w-full bg-gradient-to-b ${stageData.color}`}
                  initial={{ height: 0 }}
                  animate={{ height: isCompleted ? '100%' : 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                />
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export function ButtonLoadingState({
  isLoading,
  isSuccess,
  isError,
  onClick,
  children,
}: {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: isLoading ? 1 : 1.05 }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
      className={`relative px-8 py-4 rounded-xl font-bold text-white overflow-hidden ${
        isError
          ? 'bg-gradient-to-r from-red-600 to-rose-600'
          : isSuccess
          ? 'bg-gradient-to-r from-green-600 to-emerald-600'
          : 'bg-gradient-to-r from-purple-600 to-pink-600'
      }`}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </motion.div>
        ) : isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Success!</span>
          </motion.div>
        ) : isError ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" />
            <span>Error</span>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"
        animate={{
          x: ['0%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ width: '20%' }}
      />
    </div>
  )
}

export function SkeletonCard3D() {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 p-6 rounded-2xl border border-purple-500/20"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="space-y-4">
        <div className="w-full h-48 bg-slate-800 rounded-lg" />
        <div className="space-y-2">
          <div className="h-6 bg-slate-800 rounded w-3/4" />
          <div className="h-4 bg-slate-800 rounded w-1/2" />
          <div className="h-8 bg-slate-800 rounded w-1/3" />
        </div>
      </div>
    </motion.div>
  )
}

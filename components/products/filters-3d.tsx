"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  ChevronUp,
  Star,
  DollarSign,
  Tag,
  Zap,
  TrendingUp,
  Filter,
} from 'lucide-react'

interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterGroup {
  id: string
  label: string
  icon: any
  options: FilterOption[]
}

export function Filters3D() {
  const [isOpen, setIsOpen] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState<string[]>([
    'category',
    'price',
    'rating',
  ])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const filterGroups: FilterGroup[] = [
    {
      id: 'category',
      label: 'Category',
      icon: Tag,
      options: [
        { id: 'smartphones', label: 'Smartphones', count: 24 },
        { id: 'laptops', label: 'Laptops', count: 18 },
        { id: 'headphones', label: 'Headphones', count: 32 },
        { id: 'smartwatches', label: 'Smartwatches', count: 15 },
        { id: 'tablets', label: 'Tablets', count: 12 },
      ],
    },
    {
      id: 'price',
      label: 'Price Range',
      icon: DollarSign,
      options: [
        { id: 'under-100', label: 'Under $100', count: 45 },
        { id: '100-500', label: '$100 - $500', count: 38 },
        { id: '500-1000', label: '$500 - $1000', count: 22 },
        { id: 'over-1000', label: 'Over $1000', count: 15 },
      ],
    },
    {
      id: 'rating',
      label: 'Rating',
      icon: Star,
      options: [
        { id: '5-stars', label: '5 Stars', count: 28 },
        { id: '4-stars', label: '4+ Stars', count: 52 },
        { id: '3-stars', label: '3+ Stars', count: 89 },
      ],
    },
    {
      id: 'features',
      label: 'Features',
      icon: Zap,
      options: [
        { id: 'wireless', label: 'Wireless', count: 42 },
        { id: '5g', label: '5G Support', count: 18 },
        { id: 'waterproof', label: 'Waterproof', count: 24 },
        { id: 'fast-charging', label: 'Fast Charging', count: 36 },
      ],
    },
  ]

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    )
  }

  const toggleFilter = (groupId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const current = prev[groupId] || []
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId]
      return { ...prev, [groupId]: updated }
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
  }

  const selectedCount = Object.values(selectedFilters).flat().length

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      {/* Filter Header */}
      <motion.div
        className="bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 p-6 rounded-t-2xl border border-purple-500/20"
        whileHover={{ boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Filters</h3>
              {selectedCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-sm text-purple-400"
                >
                  {selectedCount} selected
                </motion.span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {selectedCount > 0 && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAllFilters}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
              >
                Clear All
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center hover:bg-purple-500/30 transition-colors"
            >
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-purple-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-purple-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Selected Filters Pills */}
        <AnimatePresence>
          {selectedCount > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              {Object.entries(selectedFilters).map(([groupId, options]) =>
                options.map((optionId) => {
                  const group = filterGroups.find((g) => g.id === groupId)
                  const option = group?.options.find((o) => o.id === optionId)
                  return (
                    <motion.div
                      key={`${groupId}-${optionId}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30"
                    >
                      <span className="text-sm text-purple-300">{option?.label}</span>
                      <button
                        onClick={() => toggleFilter(groupId, optionId)}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  )
                })
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Filter Groups */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-950/90 backdrop-blur-xl rounded-b-2xl border-x border-b border-purple-500/20 overflow-hidden"
          >
            <div className="divide-y divide-purple-500/10">
              {filterGroups.map((group, idx) => (
                <FilterGroupComponent
                  key={group.id}
                  group={group}
                  isExpanded={expandedGroups.includes(group.id)}
                  selectedOptions={selectedFilters[group.id] || []}
                  onToggle={() => toggleGroup(group.id)}
                  onOptionToggle={(optionId) => toggleFilter(group.id, optionId)}
                  index={idx}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FilterGroupComponent({
  group,
  isExpanded,
  selectedOptions,
  onToggle,
  onOptionToggle,
  index,
}: {
  group: FilterGroup
  isExpanded: boolean
  selectedOptions: string[]
  onToggle: () => void
  onOptionToggle: (optionId: string) => void
  index: number
}) {
  const Icon = group.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-purple-500/5 transition-colors group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg flex items-center justify-center group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-colors">
            <Icon className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-white font-medium">{group.label}</span>
          {selectedOptions.length > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-2 py-0.5 bg-purple-500/20 rounded-full text-xs text-purple-400 font-medium"
            >
              {selectedOptions.length}
            </motion.span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 space-y-2">
              {group.options.map((option, idx) => (
                <motion.label
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-500/5 cursor-pointer group/option"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => onOptionToggle(option.id)}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-purple-500/30 rounded peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-all relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                          scale: selectedOptions.includes(option.id) ? 1 : 0,
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                  <span className="flex-1 text-gray-300 group-hover/option:text-white transition-colors">
                    {option.label}
                  </span>
                  {option.count !== undefined && (
                    <span className="text-sm text-gray-500">({option.count})</span>
                  )}
                </motion.label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function QuickFilters() {
  const quickOptions = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'best-sellers', label: 'Best Sellers', icon: Star },
    { id: 'on-sale', label: 'On Sale', icon: Tag },
    { id: 'new-arrivals', label: 'New Arrivals', icon: Zap },
  ]

  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="flex flex-wrap gap-3">
      {quickOptions.map((option, idx) => {
        const Icon = option.icon
        const isSelected = selected === option.id

        return (
          <motion.button
            key={option.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setSelected(isSelected ? null : option.id)}
            className={`relative px-6 py-3 rounded-xl font-medium transition-all overflow-hidden group ${
              isSelected
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'bg-slate-900/50 text-gray-300 hover:text-white border border-purple-500/20 hover:border-purple-500/40'
            }`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <div className="relative flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span>{option.label}</span>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

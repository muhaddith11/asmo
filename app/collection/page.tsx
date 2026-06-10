'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Filter, X, ChevronDown } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import { sampleProducts, categories, useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'newest', label: 'Eng yangi' },
  { value: 'price-asc', label: 'Narx: Past dan yuqori' },
  { value: 'price-desc', label: 'Narx: Yuqori dan past' },
  { value: 'popular', label: 'Mashhur' },
]

export default function CollectionPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState<string>('newest')
  const [showFilters, setShowFilters] = useState(false)
  const [showSort, setShowSort] = useState(false)
  
  const { filters } = useStore()

  const filteredProducts = useMemo(() => {
    let products = [...sampleProducts]

    // Filter by category
    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        products.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        products.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
        break
      case 'popular':
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return products
  }, [selectedCategory, sortBy, filters])

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Page Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light tracking-wider text-foreground mb-4">
            Kolleksiya
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Premium erkaklar kiyimi kolleksiyamizni kashf eting
          </p>
        </motion.div>
      </div>

      {/* Filters Bar */}
      <div className="container mx-auto px-4 lg:px-8 mb-8">
        <div className="flex items-center justify-between gap-4 py-4 border-y border-border">
          {/* Category Tabs - Desktop */}
          <div className="hidden lg:flex items-center gap-6 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  'text-sm tracking-wider uppercase whitespace-nowrap transition-colors',
                  selectedCategory === cat.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {cat.nameUz}
              </button>
            ))}
          </div>

          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(true)}
            className="lg:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtr
          </Button>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Saralash
              <ChevronDown className={cn('w-4 h-4 transition-transform', showSort && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {showSort && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowSort(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded shadow-lg z-50"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value)
                          setShowSort(false)
                        }}
                        className={cn(
                          'w-full px-4 py-2 text-left text-sm transition-colors',
                          sortBy === option.value
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Results Count */}
          <span className="hidden sm:block text-sm text-muted-foreground">
            {filteredProducts.length} ta mahsulot
          </span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Mahsulotlar topilmadi</p>
          </div>
        )}
      </div>

      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-background border-r border-border z-50 lg:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="text-lg font-serif tracking-wider">Filtr</span>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-sm tracking-wider uppercase text-foreground mb-4">
                  Kategoriya
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id)
                        setShowFilters(false)
                      }}
                      className={cn(
                        'block w-full text-left py-2 text-sm transition-colors',
                        selectedCategory === cat.id
                          ? 'text-primary'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {cat.nameUz}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

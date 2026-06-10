import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  nameUz: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  description: string
  descriptionUz: string
  model3d?: string
  inStock: boolean
  featured: boolean
  new: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}

export interface FilterState {
  category: string | null
  priceRange: [number, number]
  sizes: string[]
  colors: string[]
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'popular'
}

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Wool Overcoat',
    nameUz: 'Klassik Jun Palto',
    price: 2500000,
    originalPrice: 3200000,
    images: ['/products/coat-1.jpg', '/products/coat-2.jpg'],
    category: 'coats',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['black', 'navy', 'charcoal'],
    description: 'Premium wool overcoat with Italian craftsmanship',
    descriptionUz: 'Italiya ustaligi bilan tayyorlangan premium jun palto',
    inStock: true,
    featured: true,
    new: true,
  },
  {
    id: '2',
    name: 'Slim Fit Business Suit',
    nameUz: 'Slim Fit Biznes Kostyum',
    price: 3800000,
    images: ['/products/suit-1.jpg', '/products/suit-2.jpg'],
    category: 'suits',
    sizes: ['46', '48', '50', '52', '54'],
    colors: ['black', 'navy', 'grey'],
    description: 'Tailored slim fit suit for the modern gentleman',
    descriptionUz: 'Zamonaviy jentlmen uchun tikuvchi slim fit kostyum',
    inStock: true,
    featured: true,
    new: false,
  },
  {
    id: '3',
    name: 'Premium Cotton Shirt',
    nameUz: "Premium Paxta Ko'ylak",
    price: 450000,
    images: ['/products/shirt-1.jpg', '/products/shirt-2.jpg'],
    category: 'shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['white', 'lightblue', 'pink'],
    description: 'Egyptian cotton dress shirt with perfect fit',
    descriptionUz: "Mukammal mos keladigan Misr paxtasidan ko'ylak",
    inStock: true,
    featured: false,
    new: true,
  },
  {
    id: '4',
    name: 'Leather Oxford Shoes',
    nameUz: 'Charm Oxford Poyafzal',
    price: 1200000,
    originalPrice: 1500000,
    images: ['/products/shoes-1.jpg', '/products/shoes-2.jpg'],
    category: 'shoes',
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: ['black', 'brown'],
    description: 'Handcrafted Italian leather oxford shoes',
    descriptionUz: "Qo'lda ishlangan Italiya charmi oxford poyafzallari",
    inStock: true,
    featured: true,
    new: false,
  },
  {
    id: '5',
    name: 'Cashmere Sweater',
    nameUz: 'Kashmir Sviter',
    price: 1800000,
    images: ['/products/sweater-1.jpg', '/products/sweater-2.jpg'],
    category: 'knitwear',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['camel', 'navy', 'grey'],
    description: 'Luxurious cashmere sweater for ultimate comfort',
    descriptionUz: 'Eng yuqori qulaylik uchun hashamatli kashmir sviter',
    inStock: true,
    featured: false,
    new: true,
  },
  {
    id: '6',
    name: 'Designer Belt',
    nameUz: 'Dizayner Kamar',
    price: 380000,
    images: ['/products/belt-1.jpg', '/products/belt-2.jpg'],
    category: 'accessories',
    sizes: ['85', '90', '95', '100', '105'],
    colors: ['black', 'brown'],
    description: 'Premium leather belt with signature buckle',
    descriptionUz: 'Imzo tokasi bilan premium charm kamar',
    inStock: true,
    featured: false,
    new: false,
  },
]

export const categories = [
  { id: 'all', name: 'All', nameUz: 'Barchasi' },
  { id: 'suits', name: 'Suits', nameUz: 'Kostyumlar' },
  { id: 'coats', name: 'Coats', nameUz: 'Paltolar' },
  { id: 'shirts', name: 'Shirts', nameUz: "Ko'ylaklar" },
  { id: 'knitwear', name: 'Knitwear', nameUz: 'Trikotaj' },
  { id: 'shoes', name: 'Shoes', nameUz: 'Poyafzallar' },
  { id: 'accessories', name: 'Accessories', nameUz: 'Aksessuarlar' },
]

export const formatPrice = (price: number): string => {
  return (
    new Intl.NumberFormat('uz-UZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price) + " so'm"
  )
}

interface StoreState {
  // Products
  products: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, updates: Partial<Product>) => void
  deleteProduct: (id: string) => void

  // Cart
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number

  // Filters
  filters: FilterState
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  resetFilters: () => void

  // Wishlist
  wishlist: string[]
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean

  // UI State
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
  isMenuOpen: boolean
  setMenuOpen: (open: boolean) => void
}

const defaultFilters: FilterState = {
  category: null,
  priceRange: [0, 10000000],
  sizes: [],
  colors: [],
  sortBy: 'newest',
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Products
      products: sampleProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: Date.now().toString() },
          ],
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      // Cart
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (i) =>
              i.product.id === item.product.id &&
              i.size === item.size &&
              i.color === item.color
          )
          if (existingIndex > -1) {
            const newCart = [...state.cart]
            newCart[existingIndex].quantity += item.quantity
            return { cart: newCart }
          }
          return { cart: [...state.cart, item] }
        }),
      removeFromCart: (productId, size, color) =>
        set((state) => ({
          cart: state.cart.filter(
            (i) =>
              !(i.product.id === productId && i.size === size && i.color === color)
          ),
        })),
      updateQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.product.id === productId && i.size === size && i.color === color
              ? { ...i, quantity }
              : i
          ),
        })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () =>
        get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
      getCartCount: () =>
        get().cart.reduce((count, item) => count + item.quantity, 0),

      // Filters
      filters: defaultFilters,
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      resetFilters: () => set({ filters: defaultFilters }),

      // Wishlist
      wishlist: [],
      addToWishlist: (productId) =>
        set((state) => ({
          wishlist: [...state.wishlist, productId],
        })),
      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
        })),
      isInWishlist: (productId) => get().wishlist.includes(productId),

      // UI State
      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),
      isMenuOpen: false,
      setMenuOpen: (open) => set({ isMenuOpen: open }),
    }),
    {
      name: 'asma-design-store',
      partialize: (state) => ({
        products: state.products,
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    }
  )
)

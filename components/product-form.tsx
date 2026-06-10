'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Plus, X, Save, ArrowLeft } from 'lucide-react'
import { useStore, Product, categories } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type ProductFormData = Omit<Product, 'id'>

const defaultForm: ProductFormData = {
  name: '',
  nameUz: '',
  price: 0,
  originalPrice: undefined,
  images: [''],
  category: 'suits',
  sizes: [],
  colors: [],
  description: '',
  descriptionUz: '',
  inStock: true,
  featured: false,
  new: true,
}

const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '44', '46', '48', '50', '52', '54', '38', '39', '40', '41', '42', '43', '44', '85', '90', '95', '100', '105']
const allColors = [
  { id: 'black', label: 'Qora', hex: '#1a1a1a' },
  { id: 'white', label: 'Oq', hex: '#f5f5f5' },
  { id: 'navy', label: 'To\'q ko\'k', hex: '#1a2744' },
  { id: 'charcoal', label: 'Kulrang-qora', hex: '#36454f' },
  { id: 'grey', label: 'Kulrang', hex: '#808080' },
  { id: 'brown', label: 'Jigarrang', hex: '#8b4513' },
  { id: 'camel', label: 'Tuyaqush', hex: '#c19a6b' },
  { id: 'lightblue', label: 'Och ko\'k', hex: '#add8e6' },
  { id: 'pink', label: 'Pushti', hex: '#ffc0cb' },
  { id: 'beige', label: 'Beige', hex: '#f5f5dc' },
  { id: 'red', label: 'Qizil', hex: '#c0392b' },
  { id: 'green', label: 'Yashil', hex: '#2e7d32' },
]

interface ProductFormProps {
  initialData?: Product
  mode: 'new' | 'edit'
}

export function ProductForm({ initialData, mode }: ProductFormProps) {
  const router = useRouter()
  const { addProduct, updateProduct } = useStore()
  const [form, setForm] = useState<ProductFormData>(
    initialData ? { ...initialData } : defaultForm
  )
  const [saving, setSaving] = useState(false)

  const set = (key: keyof ProductFormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const toggleSize = (size: string) => {
    set('sizes', form.sizes.includes(size)
      ? form.sizes.filter((s) => s !== size)
      : [...form.sizes, size]
    )
  }

  const toggleColor = (colorId: string) => {
    set('colors', form.colors.includes(colorId)
      ? form.colors.filter((c) => c !== colorId)
      : [...form.colors, colorId]
    )
  }

  const addImageField = () => set('images', [...form.images, ''])

  const updateImage = (index: number, value: string) => {
    const updated = [...form.images]
    updated[index] = value
    set('images', updated)
  }

  const removeImage = (index: number) => {
    set('images', form.images.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const cleanedImages = form.images.filter((img) => img.trim() !== '')
    const data = { ...form, images: cleanedImages.length ? cleanedImages : ['/placeholder.jpg'] }

    if (mode === 'new') {
      addProduct(data)
    } else if (initialData) {
      updateProduct(initialData.id, data)
    }

    setTimeout(() => {
      router.push('/admin/products')
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 lg:p-8 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Orqaga
        </Link>
        <h1 className="text-2xl lg:text-3xl font-serif text-foreground">
          {mode === 'new' ? 'Yangi mahsulot' : 'Mahsulotni tahrirlash'}
        </h1>
      </div>

      <div className="space-y-8">
        {/* Asosiy ma'lumotlar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded p-6 space-y-4"
        >
          <h2 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
            Asosiy ma&apos;lumotlar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground mb-2">
                Nomi (O&apos;zbekcha) <span className="text-destructive">*</span>
              </label>
              <Input
                required
                value={form.nameUz}
                onChange={(e) => set('nameUz', e.target.value)}
                placeholder="Klassik Jun Palto"
                className="bg-background border-border"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">
                Nomi (Inglizcha)
              </label>
              <Input
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Classic Wool Overcoat"
                className="bg-background border-border"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-foreground mb-2">
              Kategoriya <span className="text-destructive">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => set('category', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-border rounded text-foreground focus:outline-none focus:border-primary"
            >
              {categories.filter((c) => c.id !== 'all').map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nameUz}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground mb-2">
                Narxi (so&apos;m) <span className="text-destructive">*</span>
              </label>
              <Input
                required
                type="number"
                min="0"
                value={form.price || ''}
                onChange={(e) => set('price', Number(e.target.value))}
                placeholder="2500000"
                className="bg-background border-border"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">
                Eski narxi (chegirma uchun, ixtiyoriy)
              </label>
              <Input
                type="number"
                min="0"
                value={form.originalPrice || ''}
                onChange={(e) =>
                  set('originalPrice', e.target.value ? Number(e.target.value) : undefined)
                }
                placeholder="3200000"
                className="bg-background border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-foreground mb-2">
                Tavsif (O&apos;zbekcha)
              </label>
              <textarea
                rows={3}
                value={form.descriptionUz}
                onChange={(e) => set('descriptionUz', e.target.value)}
                placeholder="Mahsulot haqida..."
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">
                Tavsif (Inglizcha)
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Product description..."
                className="w-full px-3 py-2 bg-background border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
        </motion.div>

        {/* Rasmlar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded p-6"
        >
          <h2 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
            Rasmlar (URL manzil)
          </h2>
          <div className="space-y-3">
            {form.images.map((img, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  value={img}
                  onChange={(e) => updateImage(idx, e.target.value)}
                  placeholder="/products/mahsulot-1.jpg yoki https://..."
                  className="bg-background border-border flex-1"
                />
                {form.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Plus className="w-4 h-4" />
              Rasm qo&apos;shish
            </button>
          </div>
        </motion.div>

        {/* O'lchamlar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded p-6"
        >
          <h2 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
            O&apos;lchamlar
          </h2>
          <div className="flex flex-wrap gap-2">
            {allSizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={cn(
                  'px-4 py-2 text-sm border rounded transition-colors',
                  form.sizes.includes(size)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary'
                )}
              >
                {size}
              </button>
            ))}
          </div>
          {form.sizes.length === 0 && (
            <p className="text-xs text-muted-foreground mt-2">Hech bo&apos;lmaganda bitta o&apos;lcham tanlang</p>
          )}
        </motion.div>

        {/* Ranglar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded p-6"
        >
          <h2 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
            Ranglar
          </h2>
          <div className="flex flex-wrap gap-3">
            {allColors.map((color) => (
              <button
                key={color.id}
                type="button"
                onClick={() => toggleColor(color.id)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 text-sm border rounded transition-colors',
                  form.colors.includes(color.id)
                    ? 'bg-primary/10 text-primary border-primary'
                    : 'bg-background text-muted-foreground border-border hover:border-primary'
                )}
              >
                <span
                  className="w-4 h-4 rounded-full border border-border/50"
                  style={{ backgroundColor: color.hex }}
                />
                {color.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sozlamalar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-card border border-border rounded p-6"
        >
          <h2 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
            Sozlamalar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { key: 'inStock', label: 'Mavjud (stokda bor)' },
              { key: 'featured', label: 'Tavsiya etilgan' },
              { key: 'new', label: 'Yangi mahsulot' },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer p-3 border border-border rounded hover:border-primary transition-colors"
              >
                <input
                  type="checkbox"
                  checked={form[key as keyof ProductFormData] as boolean}
                  onChange={(e) => set(key as keyof ProductFormData, e.target.checked)}
                  className="w-4 h-4 accent-primary"
                />
                <span className="text-sm text-foreground">{label}</span>
              </label>
            ))}
          </div>
        </motion.div>

        {/* Saqlash */}
        <div className="flex items-center gap-4">
          <Button
            type="submit"
            disabled={saving}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saqlanmoqda...' : 'Saqlash'}
          </Button>
          <Link
            href="/admin/products"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Bekor qilish
          </Link>
        </div>
      </div>
    </form>
  )
}

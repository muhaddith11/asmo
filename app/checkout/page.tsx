'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, ShoppingBag } from 'lucide-react'
import { useStore, formatPrice } from '@/lib/store'
import { createOrder } from '@/lib/orders'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useStore()
  const [form, setForm] = useState({ name: '', phone: '', address: '', note: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const total = getCartTotal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await createOrder({
        customerName: form.name,
        phone: form.phone,
        address: form.address,
        note: form.note,
        items: cart,
        total,
      })
      clearCart()
      setDone(true)
    } catch (err) {
      console.error(err)
      setError("Buyurtmani yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen pt-40 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-lg text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded p-12"
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-serif text-foreground mb-3">
              Buyurtmangiz qabul qilindi!
            </h1>
            <p className="text-muted-foreground mb-8">
              Tez orada operatorlarimiz siz bilan bog&apos;lanadi va buyurtmani tasdiqlaydi.
            </p>
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/collection">Xaridni davom ettirish</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-40 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-lg text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
          <h1 className="text-2xl font-serif text-foreground mb-3">Savatingiz bo&apos;sh</h1>
          <p className="text-muted-foreground mb-8">
            Buyurtma berish uchun avval savatga mahsulot qo&apos;shing.
          </p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/collection">Kolleksiyani ko&apos;rish</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-serif font-light tracking-wider text-foreground mb-12 text-center">
          Buyurtmani rasmiylashtirish
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-sm tracking-wider uppercase text-muted-foreground mb-2">
              Yetkazib berish ma&apos;lumotlari
            </h2>
            <div>
              <label className="block text-sm text-foreground mb-2">
                Ism familiya <span className="text-destructive">*</span>
              </label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="To'liq ismingiz"
                className="bg-card border-border h-12"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">
                Telefon raqami <span className="text-destructive">*</span>
              </label>
              <Input
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+998 __ ___ __ __"
                className="bg-card border-border h-12"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">
                Manzil <span className="text-destructive">*</span>
              </label>
              <Input
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Shahar, ko'cha, uy raqami"
                className="bg-card border-border h-12"
              />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">
                Izoh (ixtiyoriy)
              </label>
              <textarea
                rows={3}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Qo'shimcha ma'lumot..."
                className="w-full px-3 py-2 bg-card border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-sm tracking-wider uppercase"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Yuborilmoqda...
                </>
              ) : (
                'Buyurtmani tasdiqlash'
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              To&apos;lov yetkazib berishda naqd yoki karta orqali amalga oshiriladi
            </p>
          </form>

          {/* Order Summary */}
          <div className="bg-card border border-border rounded p-6 h-fit">
            <h2 className="text-sm tracking-wider uppercase text-muted-foreground mb-6">
              Buyurtma tarkibi
            </h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="flex gap-4"
                >
                  <div className="relative w-16 h-20 bg-muted rounded overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0] || '/placeholder.jpg'}
                      alt={item.product.nameUz}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-foreground text-sm truncate">
                      {item.product.nameUz}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      O&apos;lcham: {item.size} • Rang: {item.color}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} x {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-foreground whitespace-nowrap">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Yetkazib berish</span>
                <span className="text-green-500">Bepul</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-medium text-foreground">Jami:</span>
                <span className="text-xl font-serif text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

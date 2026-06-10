'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Eye, ChevronDown, Phone, MapPin } from 'lucide-react'
import { formatPrice } from '@/lib/store'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const orders = [
  {
    id: '#1234',
    customer: {
      name: 'Abdulloh Karimov',
      phone: '+998 90 123 45 67',
      address: 'Qo\'qon sh., Istiqbol ko\'chasi, 15-uy',
    },
    products: [
      { name: 'Klassik Jun Palto', size: 'L', color: 'Qora', quantity: 1, price: 2500000 },
      { name: 'Premium Paxta Ko\'ylak', size: 'M', color: 'Oq', quantity: 1, price: 450000 },
    ],
    total: 2950000,
    status: 'pending',
    date: '2024-01-15 14:30',
    paymentMethod: 'Naqd pul',
  },
  {
    id: '#1233',
    customer: {
      name: 'Sardor Toshmatov',
      phone: '+998 91 234 56 78',
      address: 'Qo\'qon sh., Navro\'z ko\'chasi, 42-uy',
    },
    products: [
      { name: 'Kashmir Sviter', size: 'XL', color: 'Jigarrang', quantity: 1, price: 1800000 },
    ],
    total: 1800000,
    status: 'completed',
    date: '2024-01-15 11:20',
    paymentMethod: 'Karta',
  },
  {
    id: '#1232',
    customer: {
      name: 'Bekzod Rahimov',
      phone: '+998 93 345 67 89',
      address: 'Qo\'qon sh., Yangi hayot MFY, 7-uy',
    },
    products: [
      { name: 'Slim Fit Biznes Kostyum', size: '50', color: 'Qoramtir ko\'k', quantity: 1, price: 3800000 },
      { name: 'Dizayner Kamar', size: '95', color: 'Qora', quantity: 1, price: 380000 },
      { name: 'Charm Oxford Poyafzal', size: '42', color: 'Jigarrang', quantity: 1, price: 1200000 },
    ],
    total: 5380000,
    status: 'processing',
    date: '2024-01-14 16:45',
    paymentMethod: 'Naqd pul',
  },
  {
    id: '#1231',
    customer: {
      name: 'Javohir Aliyev',
      phone: '+998 94 456 78 90',
      address: 'Qo\'qon sh., Do\'stlik ko\'chasi, 23-uy',
    },
    products: [
      { name: 'Premium Paxta Ko\'ylak', size: 'L', color: 'Och ko\'k', quantity: 1, price: 450000 },
    ],
    total: 450000,
    status: 'completed',
    date: '2024-01-14 09:15',
    paymentMethod: 'Karta',
  },
]

const statusConfig = {
  pending: { label: 'Kutilmoqda', color: 'bg-yellow-500/10 text-yellow-500' },
  processing: { label: 'Jarayonda', color: 'bg-blue-500/10 text-blue-500' },
  completed: { label: 'Bajarildi', color: 'bg-green-500/10 text-green-500' },
  cancelled: { label: 'Bekor qilindi', color: 'bg-red-500/10 text-red-500' },
}

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus =
      selectedStatus === 'all' || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-serif text-foreground mb-2">
          Buyurtmalar
        </h1>
        <p className="text-muted-foreground">
          Jami {orders.length} ta buyurtma
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buyurtma yoki mijoz qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSelectedStatus('all')}
            className={cn(
              'px-4 py-2 text-sm whitespace-nowrap border rounded transition-colors',
              selectedStatus === 'all'
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary'
            )}
          >
            Barchasi
          </button>
          {Object.entries(statusConfig).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setSelectedStatus(key)}
              className={cn(
                'px-4 py-2 text-sm whitespace-nowrap border rounded transition-colors',
                selectedStatus === key
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            className="bg-card border border-border rounded overflow-hidden"
          >
            {/* Order Header */}
            <button
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              className="w-full flex items-center justify-between p-4 lg:p-6 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-left">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-foreground">{order.id}</span>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded text-[10px] uppercase tracking-wider',
                        statusConfig[order.status as keyof typeof statusConfig].color
                      )}
                    >
                      {statusConfig[order.status as keyof typeof statusConfig].label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {order.customer.name} • {order.products.length} ta mahsulot
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="font-medium text-foreground">
                    {formatPrice(order.total)}
                  </p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-muted-foreground transition-transform',
                    expandedOrder === order.id && 'rotate-180'
                  )}
                />
              </div>
            </button>

            {/* Order Details */}
            {expandedOrder === order.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-border"
              >
                <div className="p-4 lg:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h3 className="text-sm tracking-wider uppercase text-muted-foreground mb-3">
                      Mijoz ma&apos;lumotlari
                    </h3>
                    <div className="space-y-2">
                      <p className="font-medium text-foreground">{order.customer.name}</p>
                      <p className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        {order.customer.phone}
                      </p>
                      <p className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                        {order.customer.address}
                      </p>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div>
                    <h3 className="text-sm tracking-wider uppercase text-muted-foreground mb-3">
                      Buyurtma tafsilotlari
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">To&apos;lov usuli:</span>
                        <span className="text-foreground">{order.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sana:</span>
                        <span className="text-foreground">{order.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products */}
                <div className="p-4 lg:p-6 border-t border-border">
                  <h3 className="text-sm tracking-wider uppercase text-muted-foreground mb-4">
                    Mahsulotlar
                  </h3>
                  <div className="space-y-3">
                    {order.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2"
                      >
                        <div>
                          <p className="font-medium text-foreground">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            O&apos;lcham: {product.size} • Rang: {product.color} • {product.quantity} dona
                          </p>
                        </div>
                        <p className="font-medium text-foreground">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                    <span className="font-medium text-foreground">Jami:</span>
                    <span className="text-xl font-serif text-primary">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 lg:p-6 border-t border-border bg-muted/30 flex flex-wrap gap-3">
                  {order.status === 'pending' && (
                    <>
                      <button className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded hover:bg-primary/90 transition-colors">
                        Qabul qilish
                      </button>
                      <button className="px-4 py-2 border border-border text-muted-foreground text-sm rounded hover:border-destructive hover:text-destructive transition-colors">
                        Bekor qilish
                      </button>
                    </>
                  )}
                  {order.status === 'processing' && (
                    <button className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors">
                      Yetkazildi deb belgilash
                    </button>
                  )}
                  <button className="px-4 py-2 border border-border text-muted-foreground text-sm rounded hover:border-primary hover:text-primary transition-colors">
                    <Eye className="w-4 h-4 inline mr-2" />
                    Batafsil
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-card border border-border rounded">
            <p className="text-muted-foreground">Buyurtmalar topilmadi</p>
          </div>
        )}
      </div>
    </div>
  )
}

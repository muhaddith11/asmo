'use client'

import { motion } from 'framer-motion'
import { Package, ShoppingCart, Users, TrendingUp, ArrowUp, ArrowDown, Eye } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/store'

const stats = [
  {
    label: 'Jami savdo',
    value: '45,230,000',
    change: '+12.5%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    label: 'Buyurtmalar',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    label: 'Mahsulotlar',
    value: '48',
    change: '+2',
    trend: 'up',
    icon: Package,
  },
  {
    label: 'Tashrif buyuruvchilar',
    value: '2,847',
    change: '-3.1%',
    trend: 'down',
    icon: Users,
  },
]

const recentOrders = [
  {
    id: '#1234',
    customer: 'Abdulloh Karimov',
    products: 2,
    total: 3250000,
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: '#1233',
    customer: 'Sardor Toshmatov',
    products: 1,
    total: 1800000,
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: '#1232',
    customer: 'Bekzod Rahimov',
    products: 3,
    total: 5200000,
    status: 'processing',
    date: '2024-01-14',
  },
  {
    id: '#1231',
    customer: 'Javohir Aliyev',
    products: 1,
    total: 450000,
    status: 'completed',
    date: '2024-01-14',
  },
]

const topProducts = [
  { name: 'Klassik Jun Palto', sales: 28, revenue: 70000000 },
  { name: 'Slim Fit Biznes Kostyum', sales: 24, revenue: 91200000 },
  { name: 'Premium Paxta Ko\'ylak', sales: 45, revenue: 20250000 },
  { name: 'Charm Oxford Poyafzal', sales: 18, revenue: 21600000 },
]

const statusColors = {
  pending: 'bg-yellow-500/10 text-yellow-500',
  processing: 'bg-blue-500/10 text-blue-500',
  completed: 'bg-green-500/10 text-green-500',
  cancelled: 'bg-red-500/10 text-red-500',
}

const statusLabels = {
  pending: 'Kutilmoqda',
  processing: 'Jarayonda',
  completed: 'Bajarildi',
  cancelled: 'Bekor qilindi',
}

export default function AdminDashboard() {
  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-serif text-foreground mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Asma Design boshqaruv paneli
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-card border border-border rounded p-4 lg:p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span
                className={`flex items-center gap-1 text-xs ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {stat.trend === 'up' ? (
                  <ArrowUp className="w-3 h-3" />
                ) : (
                  <ArrowDown className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-serif text-foreground mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-card border border-border rounded"
        >
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
            <h2 className="font-serif text-foreground">So&apos;nggi buyurtmalar</h2>
            <Link
              href="/admin/orders"
              className="text-sm text-primary hover:underline"
            >
              Barchasini ko&apos;rish
            </Link>
          </div>
          <div className="divide-y divide-border">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 lg:p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-foreground">{order.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] uppercase tracking-wider ${
                        statusColors[order.status as keyof typeof statusColors]
                      }`}
                    >
                      {statusLabels[order.status as keyof typeof statusLabels]}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {order.customer} • {order.products} ta mahsulot
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-medium text-foreground">
                    {formatPrice(order.total)}
                  </p>
                  <p className="text-xs text-muted-foreground">{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-card border border-border rounded"
        >
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
            <h2 className="font-serif text-foreground">Eng ko&apos;p sotilgan</h2>
            <Link
              href="/admin/products"
              className="text-sm text-primary hover:underline"
            >
              Barchasini ko&apos;rish
            </Link>
          </div>
          <div className="divide-y divide-border">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 lg:p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales} ta sotildi
                    </p>
                  </div>
                </div>
                <p className="font-medium text-primary">
                  {formatPrice(product.revenue)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Link
          href="/admin/products/new"
          className="flex items-center gap-3 p-4 bg-card border border-border rounded hover:border-primary transition-colors"
        >
          <Package className="w-5 h-5 text-primary" />
          <span className="text-sm">Yangi mahsulot</span>
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-3 p-4 bg-card border border-border rounded hover:border-primary transition-colors"
        >
          <ShoppingCart className="w-5 h-5 text-primary" />
          <span className="text-sm">Buyurtmalar</span>
        </Link>
        <Link
          href="/admin/lookbook"
          className="flex items-center gap-3 p-4 bg-card border border-border rounded hover:border-primary transition-colors"
        >
          <Eye className="w-5 h-5 text-primary" />
          <span className="text-sm">Lookbook</span>
        </Link>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 p-4 bg-card border border-border rounded hover:border-primary transition-colors"
        >
          <TrendingUp className="w-5 h-5 text-primary" />
          <span className="text-sm">Saytni ko&apos;rish</span>
        </Link>
      </motion.div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Image, Settings, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

const adminNavItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Bosh sahifa' },
  { href: '/admin/products', icon: Package, label: 'Mahsulotlar' },
  { href: '/admin/orders', icon: ShoppingCart, label: 'Buyurtmalar' },
  { href: '/admin/lookbook', icon: Image, label: 'Lookbook' },
  { href: '/admin/settings', icon: Settings, label: 'Sozlamalar' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40">
        <div className="flex items-center justify-between h-full px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Do&apos;konga qaytish</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-serif tracking-[0.2em] text-foreground">ASMA</span>
            <span className="text-[10px] tracking-wider text-primary font-sans uppercase">Admin</span>
          </div>
          <div className="w-32" />
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border hidden lg:block">
          <nav className="p-4">
            <ul className="space-y-1">
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded text-sm transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border lg:hidden z-40">
          <nav className="flex items-center justify-around py-2">
            {adminNavItems.slice(0, 4).map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1 px-3 py-2',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px]">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0 lg:ml-64 pb-20 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  )
}

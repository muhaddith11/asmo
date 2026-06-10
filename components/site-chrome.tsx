'use client'

import { usePathname } from 'next/navigation'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { DeliveryBanner } from '@/components/delivery-banner'

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  // Admin sahifalarida sayt navbar/footer ko'rsatilmaydi (admin o'z layout'iga ega)
  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <DeliveryBanner />
      <Navigation />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartSidebar />
    </>
  )
}

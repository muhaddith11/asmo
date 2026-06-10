import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CartSidebar } from '@/components/cart-sidebar'
import { DeliveryBanner } from '@/components/delivery-banner'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://asmo-lake.vercel.app'),
  title: 'Asma Design | Premium Erkaklar Kiyimi - Qo\'qon',
  description: 'Erkaklar uchun premium kiyimlar - Qo\'qon shahri. Jahon brendlari darajasidagi sifat va dizayn. Kostyumlar, paltolar, ko\'ylaklar va aksessuarlar.',
  keywords: ['erkaklar kiyimi', 'premium moda', 'Qo\'qon', 'kostyum', 'palto', 'Asma Design'],
  authors: [{ name: 'Asma Design' }],
  creator: 'Asma Design',
  publisher: 'Asma Design',
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: 'https://asmadesign.uz',
    siteName: 'Asma Design',
    title: 'Asma Design | Premium Erkaklar Kiyimi',
    description: 'Erkaklar uchun premium kiyimlar - Qo\'qon shahri',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Asma Design - Premium erkaklar modasi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asma Design | Premium Erkaklar Kiyimi',
    description: 'Erkaklar uchun premium kiyimlar - Qo\'qon shahri',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#d4af37',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="uz" className="dark">
      <body className={`${cormorant.variable} ${inter.variable} font-serif antialiased`}>
        <DeliveryBanner />
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartSidebar />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShoppingBag, Heart, Search, User } from 'lucide-react'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/collection', label: 'Kolleksiya' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/about', label: 'Biz haqimizda' },
  { href: '/contact', label: 'Aloqa' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const { isMenuOpen, setMenuOpen, setCartOpen, getCartCount, wishlist } = useStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-8 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Menu Button - Mobile */}
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Menyuni ochish"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Desktop Navigation - Left */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Logo - Center */}
            <Link href="/" className="flex flex-col items-center group">
              <motion.span
                className="text-2xl lg:text-3xl font-serif font-light tracking-[0.3em] text-foreground"
                whileHover={{ letterSpacing: '0.4em' }}
                transition={{ duration: 0.3 }}
              >
                ASMA
              </motion.span>
              <span className="text-[10px] tracking-[0.5em] text-primary font-sans uppercase">
                Design
              </span>
            </Link>

            {/* Desktop Navigation - Right */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.slice(2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-[0.2em] uppercase text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                className="hidden lg:block p-2 text-foreground/80 hover:text-primary transition-colors"
                aria-label="Qidirish"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link
                href="/wishlist"
                className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
                aria-label="Istaklar ro'yxati"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
                aria-label="Savat"
              >
                <ShoppingBag className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
              <Link
                href="/admin"
                className="hidden lg:block p-2 text-foreground/80 hover:text-primary transition-colors"
                aria-label="Admin panel"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-background z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="text-xl font-serif tracking-[0.2em]">MENYU</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-foreground hover:text-primary transition-colors"
                  aria-label="Menyuni yopish"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center p-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-4 text-2xl font-serif tracking-[0.1em] text-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-8 border-t border-border">
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm tracking-wider uppercase">Admin panel</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

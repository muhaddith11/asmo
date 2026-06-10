'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const lookbookItems = [
  {
    id: '1',
    title: 'Jentlmen uslubi',
    season: 'Kuz/Qish 2026',
    description: 'Klassik elegantlik zamonaviy uslub bilan uyg\'unlashgan. Qora kostyum va oq ko\'ylak — abadiy klassika.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&q=80',
    products: ['1', '2'],
  },
  {
    id: '2',
    title: 'Shahar elegantligi',
    season: 'Kuz/Qish 2026',
    description: 'Shahar hayoti uchun mo\'ljallangan zamonaviy kostyumlar. Ofisdan restoranga — bir kiyim.',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&h=800&fit=crop&q=80',
    products: ['2', '3'],
  },
  {
    id: '3',
    title: 'Kechki nafosatlilik',
    season: 'Kuz/Qish 2026',
    description: 'Maxsus tadbirlar uchun premium kiyimlar. To\'y va bayramlar uchun mukammal tanlim.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=800&fit=crop&q=80',
    products: ['1', '4'],
  },
  {
    id: '4',
    title: 'Qulay hashamat',
    season: 'Kuz/Qish 2026',
    description: 'Kundalik qulaylik va yuqori uslub. Paltolar va trikotaj — kuz mavsumi uchun.',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=600&h=800&fit=crop&q=80',
    products: ['3', '5'],
  },
  {
    id: '5',
    title: 'Biznes elita',
    season: 'Kuz/Qish 2026',
    description: 'Ofis uchun professional va zamonaviy ko\'rinish. Ishbilarmon erkak tasviri.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&h=800&fit=crop&q=80',
    products: ['2', '6'],
  },
  {
    id: '6',
    title: 'Dam olish kuni',
    season: 'Kuz/Qish 2026',
    description: 'Dam olish kunlari uchun qulay va elegant. Smart-casual uslubda erkin harakat.',
    image: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&h=800&fit=crop&q=80',
    products: ['5', '6'],
  },
]

export default function LookbookPage() {
  const [selectedLook, setSelectedLook] = useState<typeof lookbookItems[0] | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (item: typeof lookbookItems[0], index: number) => {
    setSelectedLook(item)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedLook(null)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? lookbookItems.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedLook(lookbookItems[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex === lookbookItems.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedLook(lookbookItems[newIndex])
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Page Header */}
      <div className="container mx-auto px-4 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs tracking-[0.4em] text-primary font-sans uppercase">
            Kuz/Qish 2026
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light tracking-wider text-foreground mt-4 mb-6">
            Lookbook
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Yangi mavsumning eng yaxshi obrazlarini kashf eting
          </p>
        </motion.div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {lookbookItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div
                onClick={() => openLightbox(item, index)}
                className="group relative aspect-[3/4] bg-muted cursor-pointer overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs tracking-wider text-primary uppercase mb-2">
                    {item.season}
                  </span>
                  <h3 className="text-xl font-serif text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-sm font-serif text-primary">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 lg:px-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6">
            Lookbook dagi barcha mahsulotlarni do&apos;konimizda toping
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/collection" className="inline-flex items-center gap-2">
              Kolleksiyani ko&apos;rish
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedLook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
              aria-label="Yopish"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-3 bg-card/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
              aria-label="Oldingi obraz"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-3 bg-card/80 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-10"
              aria-label="Keyingi obraz"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content */}
            <div className="w-full max-w-6xl mx-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <motion.div
                key={selectedLook.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="relative aspect-[3/4] bg-muted"
              >
                <Image
                  src={selectedLook.image}
                  alt={selectedLook.title}
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Info */}
              <motion.div
                key={`info-${selectedLook.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center lg:text-left"
              >
                <span className="text-xs tracking-[0.4em] text-primary font-sans uppercase">
                  {selectedLook.season}
                </span>
                <h2 className="text-3xl lg:text-4xl font-serif font-light text-foreground mt-4 mb-6">
                  {selectedLook.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {selectedLook.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Button
                    asChild
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Link href="/collection">Mahsulotlarni ko&apos;rish</Link>
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentIndex + 1} / {lookbookItems.length}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

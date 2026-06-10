import { Hero } from '@/components/hero'
import { FeaturedSection } from '@/components/featured-section'
import { CategoriesSection } from '@/components/categories-section'
import { BrandStorySection } from '@/components/brand-story-section'
import { ContactCtaSection } from '@/components/contact-cta-section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedSection />
      <CategoriesSection />
      <BrandStorySection />
      <ContactCtaSection />
    </>
  )
}

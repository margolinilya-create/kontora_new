import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/sections/Hero'
import { CatalogSection } from '@/components/sections/Catalog'
import { CalculatorSection } from '@/components/sections/Calculator'
import { TrustSection } from '@/components/sections/Trust'
import { CtaSection } from '@/components/sections/Cta'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CatalogSection />
        <CalculatorSection />
        <TrustSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}

import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/Hero'
import { ServicesSection } from '@/components/sections/Services'
import { StatsSection } from '@/components/sections/Stats'
import { TestimonialsSection } from '@/components/sections/Testimonials'
import { CTASection } from '@/components/sections/CTA'

export const metadata: Metadata = {
  title: 'PHÉNIX GROUP & JF DÉCOR | L\'art et sa valeur',
  description: 'Experts en construction, aménagement et paysagisme. 25 ans d\'excellence pour vos projets d\'exception.',
}

// ✅ Désactivé temporairement pour tester Vercel
async function getStats() {
  return {
    projects: 150,
    clients: 200,
    experience: 25,
    satisfaction: 98,
  }
}

export default async function HomePage() {
  const stats = await getStats()

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection stats={stats} />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
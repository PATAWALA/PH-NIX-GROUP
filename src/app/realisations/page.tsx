import { Metadata } from 'next'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'

export const metadata: Metadata = {
  title: 'Nos Réalisations | PHÉNIX GROUP & JF DÉCOR',
  description: 'Découvrez nos réalisations d\'exception en construction, aménagement et paysagisme.',
}

export default function RealisationsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-6 font-serif">
            Nos réalisations
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Découvrez notre savoir-faire à travers une sélection de projets d&apos;exception.
          </p>
        </div>

        <GalleryGrid />
      </div>
    </div>
  )
}
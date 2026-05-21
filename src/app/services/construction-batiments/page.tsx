import { Metadata } from 'next'
import { CheckCircle2, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Construction de Bâtiments | PHÉNIX GROUP & JF DÉCOR',
  description: 'Experts en construction de bâtiments, hôtels, restaurants et complexes. Devis gratuit.',
}

const prestations = [
  'Construction d\'hôtels et complexes hôteliers',
  'Restaurants gastronomiques et brasseries',
  'Bâtiments commerciaux et bureaux',
  'Résidences de luxe et villas',
  'Rénovation et extension haut de gamme',
  'Coordination de chantier complète',
  'Études architecturales personnalisées',
  'Respect des normes et délais',
]

export default function ConstructionBatimentsPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
              Service
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-6 font-serif">
              Construction de Bâtiments
            </h1>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed">
              Nous concevons et réalisons des bâtiments d&apos;exception qui allient 
              esthétique, fonctionnalité et durabilité. Chaque projet est unique 
              et bénéficie d&apos;un accompagnement personnalisé.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {prestations.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/contact">
              <Button variant="gold" size="lg">
                Demander un devis gratuit
              </Button>
            </Link>
          </div>

          <div className="bg-stone-200 rounded-3xl h-96 flex items-center justify-center">
            <Building2 className="h-24 w-24 text-stone-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
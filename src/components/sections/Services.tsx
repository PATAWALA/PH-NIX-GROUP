import Link from 'next/link'
import { ServiceCard } from '@/components/ui/Card'
import { Building2, Flower2, Palmtree, ArrowRight } from 'lucide-react'

const services = [
  {
    title: 'Construction de Bâtiments',
    description: 'Hôtels, restaurants, complexes commerciaux et résidentiels. Nous réalisons des constructions d\'exception alliant esthétique et fonctionnalité.',
    icon: <Building2 className="h-6 w-6" />,
    features: [
      'Hôtels et complexes hôteliers',
      'Restaurants gastronomiques',
      'Bâtiments commerciaux',
      'Résidences de luxe',
      'Rénovation haut de gamme',
    ],
    imageUrl: '/images/construction.jpg',
    href: '/services/construction-batiments',
  },
  {
    title: 'Aménagement Extérieur',
    description: 'Jardins, piscines, terrasses et espaces extérieurs conçus pour sublimer votre propriété et créer des espaces de vie uniques.',
    icon: <Flower2 className="h-6 w-6" />,
    features: [
      'Piscines design',
      'Terrasses et patios',
      'Jardins paysagers',
      'Éclairage extérieur',
      'Mobilier sur mesure',
    ],
    imageUrl: '/images/terasse.jpg',
    href: '/services/amenagement-exterieur',
  },
  {
    title: 'Paysagisme Artistique',
    description: 'Cascades, grottes artificielles et décors naturels spectaculaires. L\'art du paysagisme poussé à son paroxysme.',
    icon: <Palmtree className="h-6 w-6" />,
    features: [
      'Cascades et plans d\'eau',
      'Grottes artificielles',
      'Rochers décoratifs',
      'Décors thématiques',
      'Végétalisation verticale',
    ],
    imageUrl: '/images/paysagisme.jpg',
    href: '/services/paysagisme-artistique',
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
            Nos Expertises
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-6 font-serif">
            Trois piliers d&apos;excellence
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            De la conception à la réalisation, notre équipe d&apos;experts vous accompagne 
            dans tous vos projets de construction, d&apos;aménagement et de paysagisme.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center text-amber-700 font-semibold hover:text-amber-800 transition-colors group"
          >
            Découvrir tous nos services
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
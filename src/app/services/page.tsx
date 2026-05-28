import { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Flower2, Palmtree, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Nos Services | Construction, Aménagement & Paysagisme | PHÉNIX GROUP',
  description: 'Découvrez nos trois piliers d\'excellence : construction de bâtiments, aménagement extérieur et paysagisme artistique en Côte d\'Ivoire.',
  alternates: { canonical: 'https://www.phenixgroupdecor.com/services' },
}

const services = [
  {
    title: 'Construction de Bâtiments',
    description: 'Hôtels, restaurants, complexes commerciaux et résidentiels.',
    icon: Building2,
    href: '/services/construction-batiments',
    image: '/images/services/construction.jpg',
  },
  {
    title: 'Aménagement Extérieur',
    description: 'Jardins, piscines, terrasses et espaces extérieurs.',
    icon: Flower2,
    href: '/services/amenagement-exterieur',
    image: '/images/services/amenagement.jpg',
  },
  {
    title: 'Paysagisme Artistique',
    description: 'Cascades, grottes artificielles et décors spectaculaires.',
    icon: Palmtree,
    href: '/services/paysagisme-artistique',
    image: '/images/services/paysagisme.jpg',
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
            Nos Expertises
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-6 font-serif">
            Nos services
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Trois piliers d&apos;excellence pour donner vie à tous vos projets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link key={index} href={service.href}>
              <Card hover className="h-full group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2 font-serif">
                      {service.title}
                    </h3>
                    <p className="text-stone-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-amber-700 font-medium text-sm group-hover:text-amber-800 transition-colors">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
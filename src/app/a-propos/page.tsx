import { Metadata } from 'next'
import { Award, Users, Clock, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À Propos | PHÉNIX GROUP & JF DÉCOR',
  description: '25 ans d\'excellence dans la construction, l\'aménagement et le paysagisme.',
}

export default function AProposPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
            Notre Histoire
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-6 font-serif">
            À propos de nous
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Depuis 1998, PHÉNIX GROUP & JF DÉCOR incarne l&apos;excellence dans l&apos;art 
            de construire, d&apos;aménager et de sublimer les espaces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Clock, title: '16 ans', description: 'D\'expérience' },
            { icon: Award, title: '16+', description: 'Projets réalisés' },
            { icon: Users, title: '200+', description: 'Clients satisfaits' },
            { icon: Target, title: '97%', description: 'Sur mesure' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6">
              <stat.icon className="h-10 w-10 text-amber-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-stone-900 font-serif">{stat.title}</div>
              <div className="text-stone-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
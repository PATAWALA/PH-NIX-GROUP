import { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle2, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Aménagement Extérieur | PHÉNIX GROUP & JF DÉCOR',
  description: 'Création de jardins, piscines et terrasses. Aménagement paysager haut de gamme.',
}

const prestations = [
  'Création de piscines design',
  'Terrasses et patios sur mesure',
  'Jardins paysagers complets',
  'Systèmes d\'éclairage extérieur',
  'Mobilier et décoration outdoor',
  'Clôtures et portails design',
  'Allées et chemins pavés',
  'Arrosage automatique intégré',
]

const faqData = [
  {
    question: 'Quels types de piscines proposez-vous ?',
    answer:
      'Nous concevons des piscines à débordement, des piscines miroir, des bassins naturels et des piscines design avec plage immergée. Toutes sont réalisées sur mesure avec des matériaux haut de gamme.',
  },
  {
    question: 'Combien coûte l\'aménagement d\'un jardin paysager ?',
    answer:
      'Le coût varie selon la surface, les matériaux choisis et la complexité. Nous établissons un devis détaillé gratuit après une visite technique. Un jardin de 500 m² peut démarrer à partir de 15 millions FCFA.',
  },
  {
    question: 'Proposez-vous l\'entretien des espaces verts ?',
    answer:
      'Oui, nous offrons des contrats d\'entretien mensuel ou trimestriel : taille, tonte, traitement phytosanitaire, nettoyage des bassins. Vous pouvez déléguer complètement l\'entretien.',
  },
  {
    question: 'Quels matériaux utilisez-vous pour les terrasses ?',
    answer:
      'Nous travaillons le bois exotique (ipé, teck), la pierre naturelle (granit, travertin), le carrelage grand format antidérapant, et le béton désactivé. Tout est sélectionné pour résister au climat tropical.',
  },
  {
    question: 'L\'éclairage extérieur est-il inclus ?',
    answer:
      'L\'éclairage fait partie intégrante de nos conceptions. Nous utilisons des LED basse consommation, des projecteurs encastrés, des bornes solaires et des jeux de lumière pour sublimer vos espaces la nuit.',
  },
  {
    question: 'Pouvez-vous installer un système d\'arrosage automatique ?',
    answer:
      'Oui, nous installons des systèmes d\'arrosage goutte-à-goutte ou par aspersion avec programmateur connecté. L\'arrosage est ajusté en fonction des zones (pelouse, massifs, haies).',
  },
]

export default function AmenagementExterieurPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Gauche : texte épuré */}
          <div>
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
              Service
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-6 font-serif">
              Aménagement Extérieur
            </h1>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed">
              Transformez vos espaces extérieurs en véritables lieux de vie. 
              De la conception à la réalisation, nous créons des ambiances 
              uniques qui subliment votre propriété.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
              {prestations.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span className="text-stone-700 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/contact">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Demander un devis gratuit
              </Button>
            </Link>
          </div>

          {/* Droite : deux images superposées */}
          <div className="relative h-[500px] lg:h-[550px]">
            {/* Image principale (piscine) */}
            <div className="absolute top-0 right-0 w-[85%] h-[75%] rounded-2xl overflow-hidden shadow-2xl z-10 border-4 border-white">
              <Image
                src="/images/pscine-service.jpg"
                alt="Piscine design avec terrasse"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold text-stone-700 shadow">
                Piscine – Villa Les Oliviers, Cocody
              </div>
            </div>

            {/* Image secondaire (jardin) */}
            <div className="absolute bottom-0 left-0 w-[70%] h-[65%] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/decoration-service.jpg"
                alt="Jardin paysager luxuriant"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold text-stone-700 shadow">
                Jardin – Résidence Bingerville
              </div>
            </div>

            {/* Badge "Avant / Après" */}
            <div className="absolute top-6 left-6 bg-amber-600 text-white text-xs px-3 py-1.5 rounded-full shadow-lg z-20 font-medium">
              Avant / Après
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Foire aux questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-stone-900 mt-3 mb-4 font-serif">
              Tout savoir sur nos aménagements extérieurs
            </h2>
            <p className="text-stone-600">
              Des réponses claires pour vos projets de jardins, piscines et terrasses.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <details
                key={index}
                className="group bg-stone-50 rounded-xl p-6 hover:bg-amber-50/50 transition-colors cursor-pointer"
              >
                <summary className="flex items-center justify-between font-semibold text-stone-800 list-none">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 text-amber-600 transition-transform group-open:rotate-180" />
                </summary>
                <p className="text-stone-600 mt-4 leading-relaxed text-sm">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="text-center mt-16">
          <p className="text-stone-500 mb-6">Un jardin, une piscine, une terrasse de rêve ? Contactez-nous.</p>
          <Link href="/contact">
            <Button variant="gold" size="lg">
              Demander un devis gratuit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
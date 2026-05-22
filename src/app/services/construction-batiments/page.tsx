import { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle2, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Construction de Bâtiments | PHÉNIX GROUP & JF DÉCOR',
  description: 'Experts en construction de bâtiments, hôtels, restaurants et complexes. Devis gratuit.',
}

const prestations = [
  "Construction d'hôtels et complexes hôteliers",
  'Restaurants gastronomiques et brasseries',
  'Bâtiments commerciaux et bureaux',
  'Résidences de luxe et villas',
  'Rénovation et extension haut de gamme',
  'Coordination de chantier complète',
  'Études architecturales personnalisées',
  'Respect des normes et délais',
]

const faqData = [
  {
    question: 'Quels types d’hôtels construisez-vous ?',
    answer:
      'Nous réalisons des hôtels de charme, des complexes hôteliers 4 et 5 étoiles, des resorts balnéaires et des lodges écologiques. Chaque projet est unique et respecte les normes internationales de sécurité et d’accessibilité.',
  },
  {
    question: 'Pouvez-vous concevoir un restaurant clé en main ?',
    answer:
      'Oui, de la conception de la cuisine professionnelle à la salle de réception. Nous intégrons les normes HACCP, l’acoustique et l’ambiance lumineuse pour une expérience client inoubliable.',
  },
  {
    question: 'Quels sont les délais moyens de construction ?',
    answer:
      'Pour une villa de 200 m², comptez 8 à 12 mois. Un hôtel de 30 chambres peut prendre 12 à 18 mois. Nous établissons un planning détaillé avec des jalons clairs et un suivi hebdomadaire.',
  },
  {
    question: 'Proposez-vous des garanties ?',
    answer:
      'Absolument. Nous offrons une garantie décennale sur la structure et une garantie de parfait achèvement pendant un an. Tous nos contrats sont encadrés par une assurance dommages-ouvrage.',
  },
  {
    question: 'Comment se déroule le financement d’un projet ?',
    answer:
      'Nous vous assistons dans le montage du plan de financement et pouvons vous mettre en relation avec des banques partenaires. Le paiement s’effectue par tranches selon l’avancement des travaux.',
  },
  {
    question: 'Travaillez-vous avec des architectes indépendants ?',
    answer:
      'Oui, nous collaborons avec des cabinets d’architecture renommés ou nous pouvons intégrer le vôtre. Notre bureau d’études interne assure la cohérence technique.',
  },
]

export default function ConstructionBatimentsPage() {
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
              Construction de Bâtiments
            </h1>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed">
              Nous concevons et réalisons des bâtiments d’exception qui allient 
              esthétique, fonctionnalité et durabilité. Chaque projet est unique 
              et bénéficie d’un accompagnement personnalisé.
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

          {/* Droite : deux images professionnelles superposées */}
          <div className="relative h-[500px] lg:h-[550px]">
            {/* Image principale (premier plan) */}
            <div className="absolute top-0 right-0 w-[85%] h-[75%] rounded-2xl overflow-hidden shadow-2xl z-10 border-4 border-white">
              <Image
                src="/images/hotel1.jpg"
                alt="Intérieur d'un hôtel de luxe"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold text-stone-700 shadow">
                Intérieur – Hôtel Majestic
              </div>
            </div>

            {/* Image secondaire (arrière-plan, décalée) */}
            <div className="absolute bottom-0 left-0 w-[70%] h-[65%] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/façade-service.jpg"
                alt="Façade d'un restaurant construit"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 35vw"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-semibold text-stone-700 shadow">
                Façade – Restaurant La Terrasse
              </div>
            </div>

            {/* Badge "Avant / Après" flottant */}
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
              Tout savoir sur nos constructions
            </h2>
            <p className="text-stone-600">
              Des réponses claires pour vos projets d’hôtels, restaurants et bâtiments d’exception.
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
          <p className="text-stone-500 mb-6">Un projet en tête ? Parlons-en dès aujourd’hui.</p>
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
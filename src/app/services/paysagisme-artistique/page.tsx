import { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle2, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Paysagisme Artistique | PHÉNIX GROUP & JF DÉCOR',
  description: 'Cascades, grottes et décors naturels spectaculaires. L\'art du paysagisme.',
}

const prestations = [
  'Cascades et chutes d\'eau',
  'Grottes artificielles décoratives',
  'Rochers et formations minérales',
  'Décors thématiques complets',
  'Murs végétaux et jardins verticaux',
  'Bassins et plans d\'eau naturels',
  'Sculptures paysagères',
  'Écosystèmes aquatiques',
]

const faqData = [
  {
    question: 'Quels types de cascades pouvez-vous créer ?',
    answer:
      'Nous réalisons des cascades de toutes tailles, de la petite chute d’eau décorative à la cascade monumentale de 10 mètres intégrée dans un parc. Nous utilisons des roches naturelles ou reconstituées et un système de circulation d’eau éco-responsable.',
  },
  {
    question: 'Les grottes artificielles sont-elles durables ?',
    answer:
      'Oui, nos grottes sont construites en béton projeté armé et sculpté à la main, ce qui leur confère une résistance exceptionnelle aux intempéries et au temps. Elles sont garanties 10 ans.',
  },
  {
    question: 'Pouvez-vous reproduire un décor vu dans un film ou un parc ?',
    answer:
      'Absolument. Notre équipe artistique est spécialisée dans la reproduction de décors thématiques : jungle, temple, ruines antiques, univers fantastique. Nous travaillons à partir de photos ou de croquis.',
  },
  {
    question: 'Combien de temps dure la réalisation d’une cascade ?',
    answer:
      'Une cascade simple peut être installée en 2 à 3 semaines. Un projet complet avec grotte, bassins et éclairage demande 2 à 4 mois selon la complexité.',
  },
  {
    question: 'Faut-il un entretien particulier ?',
    answer:
      'Nous concevons des systèmes autonomes avec filtration et traitement de l’eau. Un entretien annuel par nos soins suffit généralement. Nous proposons des contrats de maintenance.',
  },
  {
    question: 'Peut-on intégrer des poissons ou des plantes aquatiques ?',
    answer:
      'Oui, nous créons des écosystèmes aquatiques complets avec plantes, poissons et micro-organismes, reproduisant un milieu naturel équilibré.',
  },
]

export default function PaysagismeArtistiquePage() {
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
              Paysagisme Artistique
            </h1>
            <p className="text-stone-600 text-lg mb-8 leading-relaxed">
              L&apos;art du paysagisme poussé à son paroxysme. Nous créons des décors 
              naturels spectaculaires qui émerveillent et transportent.
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

                    <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[500px] lg:h-[550px]">
            {/* Image principale (grande, occupe 2 colonnes et 2 lignes) */}
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 relative">
              <Image
                src="/images/cascade-1.jpg"
                alt="Cascade artificielle"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
            {/* Petite image en haut à droite */}
            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 relative">
              <Image
                src="/images/hero2.jpg"
                alt="Grotte décorative"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 15vw"
              />
            </div>
            {/* Petite image en bas à droite */}
            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 relative">
              <Image
                src="/images/cascade.jpg"  // Remplace par une troisième image réelle
                alt="Rocher sculpté"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 15vw"
              />
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
              Tout savoir sur nos créations paysagères
            </h2>
            <p className="text-stone-600">
              Des réponses claires pour vos projets de cascades, grottes et décors naturels.
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
          <p className="text-stone-500 mb-6">Une cascade, une grotte, un décor unique ? Contactez-nous.</p>
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
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Award, ThumbsUp, Users, Quote } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const values = [
  {
    title: 'Excellence',
    description: 'Chaque projet est traité avec un souci du détail extrême, des fondations à la finition.',
    icon: '✨',
  },
  {
    title: 'Confiance',
    description: 'Une relation transparente avec nos clients, basée sur l’écoute et le respect des engagements.',
    icon: '🤝',
  },
  {
    title: 'Innovation',
    description: 'Nous intégrons les meilleures techniques et matériaux pour des résultats durables.',
    icon: '💡',
  },
]

const stats = [
  { icon: Award, value: '25+', label: 'Années d’expérience' },
  { icon: ThumbsUp, value: '150+', label: 'Projets réalisés' },
  { icon: Users, value: '200+', label: 'Clients satisfaits' },
]

export function AboutSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Fond décoratif discret */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Colonne image + citation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            {/* Cadre principal avec ombre portée */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-stone-100">
              <Image
                src="/images/about.jpg" // Remplacer par ta propre image
                alt="Équipe PHÉNIX GROUP & JF DÉCOR"
                width={800}
                height={1000}
                className="object-cover w-full h-[500px] lg:h-[650px]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Overlay subtil */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
              {/* Badge "Depuis 1998" */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-stone-800 shadow">
                Depuis 1998
              </div>
            </div>

            {/* Citation flottante */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-8 -right-6 bg-amber-600 text-white p-6 rounded-2xl shadow-xl max-w-xs backdrop-blur-sm"
            >
              <Quote className="h-6 w-6 mb-2 text-amber-200" />
              <p className="text-sm italic leading-relaxed">
                « L’art et sa valeur sont au cœur de chaque projet que nous réalisons. »
              </p>
              <p className="text-xs mt-2 font-medium text-amber-200">— La direction</p>
            </motion.div>
          </motion.div>

          {/* Colonne texte */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            <span className="inline-block text-amber-700 font-semibold text-sm uppercase tracking-widest mb-4 border-b-2 border-amber-200 pb-1">
              Notre philosophie
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mt-4 mb-6 font-serif leading-tight">
              Bâtir l’exception, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800">
                en toute confiance
              </span>
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-6">
              Depuis plus de 25 ans, PHÉNIX GROUP & JF DÉCOR incarne l’excellence dans la construction,
              l’aménagement et le paysagisme en Côte d’Ivoire. Notre secret ? Une équipe passionnée,
              des matériaux rigoureusement sélectionnés et une obsession du détail.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              Nous ne nous contentons pas de construire des bâtiments : nous créons des œuvres
              qui vous ressemblent et traversent le temps.
            </p>

            {/* Valeurs en grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {values.map((value, idx) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  className="bg-stone-50 rounded-2xl p-5 border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all duration-300"
                >
                  <div className="text-2xl mb-2">{value.icon}</div>
                  <h3 className="font-bold text-stone-900 mb-1">{value.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Chiffres clés */}
            <div className="flex flex-wrap gap-8 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-stone-900">{stat.value}</div>
                    <div className="text-xs text-stone-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/a-propos">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Découvrir notre histoire
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
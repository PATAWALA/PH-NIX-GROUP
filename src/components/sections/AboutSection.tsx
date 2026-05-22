'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Home, Waves, Palmtree } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AboutSection() {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  }

  return (
    <section className="relative bg-stone-50 py-16 lg:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* En-tête de section enrichi */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="mb-10 text-center"
        >
          <span className="text-amber-700 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em]">
            À propos
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-stone-800">
            Qui sommes-nous ?
          </h2>
          <div className="mt-3 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          {/* Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="relative"
          >
            <Link href="/" className="group block overflow-hidden rounded-2xl shadow-xl shadow-stone-900/5 border border-stone-200/60">
              <div className="aspect-[4/5] max-h-[400px] lg:max-h-[480px] w-full">
                <Image
                  src="/images/logo.jpg"
                  alt="Logo de la maison – Architecture & Aménagement de luxe"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            {/* Badge */}
            <div className="absolute -bottom-2 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-900/20 px-3 py-1 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                Maison fondée en 1998
              </span>
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
          >
            <div className="flex flex-col gap-4 lg:gap-6">
              <span className="text-amber-700 text-xs font-semibold uppercase tracking-[0.25em] border-l-2 border-amber-600 pl-3">
                Architecture & Aménagement d’Exception
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light tracking-tight leading-tight">
                <span className="text-stone-800">L’art de</span>{' '}
                <span className="font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  bâtir l’excellence
                </span>
              </h2>

              <div className="space-y-2 text-sm text-stone-600 leading-relaxed max-w-lg">
                <p>
                  Depuis plus de 25 ans, nous concevons et réalisons des projets d’exception
                  pour villas contemporaines, piscines à débordement, aménagements paysagers
                  et résidences privées. Chaque ouvrage est un héritage architectural mêlant
                  volumes intemporels, matériaux nobles et précision d’exécution.
                </p>
                <p>
                  Notre approche sur‑mesure transforme vos espaces en tableaux vivants, où
                  l’élégance fonctionnelle rencontre la pérennité structurelle.
                </p>
              </div>

              {/* Métriques */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1">
                {[
                  { icon: Home, value: '12', label: 'Villas & Résidences' },
                  { icon: Waves, value: '8', label: 'Piscines & Spas' },
                  { icon: Palmtree, value: '6', label: 'Paysagisme' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-start gap-1 border-l-2 border-amber-200 pl-3"
                  >
                    <item.icon className="h-4 w-4 text-stone-400" />
                    <div className="font-serif text-xl sm:text-2xl font-semibold text-stone-800">
                      {item.value}
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wider text-stone-500">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <Link href="/a-propos">
                  <Button variant="gold" size="md" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Découvrir notre vision
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
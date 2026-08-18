'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Flower2, Waves, Palmtree, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// Imports Swiper pour le carrousel
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

// Liste des images de l'équipe / réalisations
const aboutImages = [
  { src: '/images/(1).jpeg', alt: 'PHÉNIX GROUP & JF DÉCOR – Réalisation 1' },
  { src: '/images/(2).jpeg', alt: 'PHÉNIX GROUP & JF DÉCOR – Réalisation 2' },
  { src: '/images/(3).jpeg', alt: 'PHÉNIX GROUP & JF DÉCOR – Réalisation 3' },
  { src: '/images/(4).jpeg', alt: 'PHÉNIX GROUP & JF DÉCOR – Réalisation 4' },
  { src: '/images/(5).jpeg', alt: 'PHÉNIX GROUP & JF DÉCOR – Réalisation 5' },
]

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
        {/* En-tête de section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="mb-10 text-center"
        >
          <span className="text-emerald-700 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em]">
            À propos
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-stone-800">
            Qui sommes-nous ?
          </h2>
          <div className="mt-3 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-12">
          {/* Carrousel d'images automatisé en fondu */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeInUp}
            className="relative"
          >
            <div className="overflow-hidden rounded-2xl shadow-xl shadow-stone-900/5 border border-stone-200/60 aspect-[4/5] max-h-[400px] lg:max-h-[480px] w-full">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                loop={true}
                speed={1200}
                autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
                }}
                className="h-full w-full"
              >
                {aboutImages.map((img, index) => (
                  <SwiperSlide key={index} className="relative h-full w-full">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Badge */}
            <div className="absolute -bottom-2 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-900/20 px-3 py-1 rounded-full text-xs font-medium">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                Groupe fondé en 2008
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
              <span className="text-emerald-700 text-xs font-semibold uppercase tracking-[0.25em] border-l-2 border-emerald-600 pl-3">
                Aménagement & Paysagisme d'Exception
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light tracking-tight leading-tight">
                <span className="text-stone-800">L'art de</span>{' '}
                <span className="font-bold bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                  sublimer la nature
                </span>
              </h2>

              <div className="space-y-2 text-sm text-stone-600 leading-relaxed max-w-lg">
                <p>
                  Depuis plus de 16 ans, le groupe PHÉNIX GROUP & JF DÉCOR conçoit et réalise
                  des projets paysagers d'exception en Côte d'Ivoire : jardins luxuriants,
                  piscines design, terrasses élégantes, décors artistiques, cascades et 
                  grottes artificielles. Chaque création est un héritage paysager mêlant 
                  esthétique naturelle, matériaux nobles et précision d'exécution.
                </p>
                <p>
                  Notre approche sur-mesure transforme vos espaces extérieurs en œuvres 
                  vivantes, où l'élégance fonctionnelle rencontre la beauté naturelle.
                </p>
              </div>

              {/* Métriques représentatives des trois piliers */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-1">
                {[
                  { icon: Flower2, value: '12', label: 'Jardins créés' },
                  { icon: Waves, value: '8', label: 'Piscines & Spas' },
                  { icon: Palmtree, value: '6', label: 'Cascades & Décors' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-start gap-1 border-l-2 border-emerald-200 pl-3"
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
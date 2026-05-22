'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, Home, Waves, Palmtree } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  // Variants correctement typés (ease en tuple as const)
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-stone-50 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Titre de section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="mb-12 lg:mb-16"
        >
          <span className="text-amber-700 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] border-l-4 border-amber-600 pl-4">
            À propos
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-14">
          {/* Image cliquable */}
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={scaleIn}
          >
            <Link href="/" className="block">
              <motion.div
                style={{ y: yParallax }}
                className="group overflow-hidden rounded-2xl shadow-xl shadow-stone-900/5 border border-stone-200/60 cursor-pointer"
              >
                <div className="relative aspect-[4/5] max-h-[440px] sm:max-h-[480px] lg:max-h-[540px]">
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo de la maison – Architecture & Aménagement de luxe"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 via-transparent to-transparent" />
                </div>
              </motion.div>
            </Link>

            {/* Badge premium avec dégradé du bouton */}
            <div className="absolute -bottom-3 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-lg shadow-amber-900/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-medium">
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
            <div className="flex flex-col gap-5 sm:gap-6 lg:gap-7">
              {/* Chapeau métier */}
              <span className="text-amber-700 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] border-l-2 border-amber-600 pl-3">
                Architecture & Aménagement d’Exception
              </span>

              {/* Titre */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-tight leading-[1.1]">
                <span className="bg-gradient-to-r from-stone-800 via-stone-700 to-stone-600 bg-clip-text text-transparent">
                  L&apos;art de
                </span>
                <br />
                <span className="font-bold text-stone-900">bâtir l’excellence</span>
              </h2>

              {/* Paragraphes enrichis – villas, piscines, aménagements */}
              <div className="max-w-lg space-y-3 text-sm sm:text-base text-stone-600 leading-relaxed">
                <p>
                  Depuis plus de 25 ans, nous concevons et réalisons des projets d’exception
                  où chaque détail compte : villas contemporaines, piscines à débordement,
                  aménagements paysagers et résidences privées. Chaque ouvrage est pensé comme
                  un héritage architectural, alliant volumes intemporels, matériaux nobles et
                  une précision d’exécution millimétrée.
                </p>
                <p>
                  Notre approche sur‑mesure transforme vos espaces de vie en tableaux vivants,
                  où l’élégance fonctionnelle rencontre la pérennité structurelle. Un
                  engagement d’excellence qui fait de chaque projet une signature unique.
                </p>
              </div>

              {/* Métriques : 26 projets globaux répartis */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                {[
                  { icon: Home, value: '12', label: 'Villas & Résidences' },
                  { icon: Waves, value: '8', label: 'Piscines & Spas' },
                  { icon: Palmtree, value: '6', label: 'Aménagements Paysagers' },
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

              {/* CTA */}
              <div>
                <Link href="/a-propos">
                  <Button
                    variant="gold"
                    size="md"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
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
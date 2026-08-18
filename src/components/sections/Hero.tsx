'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Play } from 'lucide-react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section ref={containerRef} className="relative h-screen min-h-[800px] overflow-hidden">
      {/* Image de fond avec parallax */}
      <motion.div style={{ y }} className="absolute inset-0 h-[120%] -top-[10%]">
        <Image
          src="/images/hero1.png"
          alt="JF DÉCOR – Aménagement paysager de luxe"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCw..."
        />
      </motion.div>

      {/* Overlays - plus sombres pour meilleure lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-900/80 to-stone-900/60 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/30 to-stone-900/50 z-10" />
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Contenu positionné en haut */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 flex flex-col justify-start h-full pt-32 md:pt-36"
      >
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badge slogan */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6"
              >
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  L'art et sa valeur
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-serif leading-tight mb-4 md:mb-6 drop-shadow-lg">
                JF DÉCOR
              </h1>
              
              <p className="text-base md:text-lg text-stone-200 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                Aménagement extérieur et paysagisme d&apos;exception en Côte d&apos;Ivoire. 
                Nous créons des jardins, piscines, cascades et décors naturels qui subliment 
                vos espaces de vie à Abidjan, Bingerville et Grand‑Bassam.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col items-center sm:flex-row gap-3 md:gap-4 justify-center"
            >
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="gold" size="lg" className="w-full shadow-xl shadow-emerald-900/50" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Demander un devis gratuit
                </Button>
              </Link>
              <Link href="/realisations" className="w-4/5 sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white/15 hover:border-white/30 transition-colors"
                  leftIcon={<Play className="h-5 w-5" />}
                >
                  Voir nos réalisations
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator – visible uniquement sur mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-1 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
          />
        </div>
      </motion.div>
    </section>
  )
}
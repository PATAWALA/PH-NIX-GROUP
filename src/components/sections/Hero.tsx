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
          alt="PHÉNIX GROUP & JF DÉCOR – Construction de luxe"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM..."
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent z-10" />

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
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-serif leading-tight mb-4 md:mb-6">
                PHÉNIX GROUP
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  & JF DÉCOR
                </span>
              </h1>
              <p className="text-base md:text-lg text-stone-300 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                Construction, aménagement et paysagisme d&apos;exception en Côte d&apos;Ivoire. 
                Nous concevons et réalisons des projets haut de gamme qui allient esthétique, 
                durabilité et savoir‑faire artisanal à Abidjan, Bingerville et Grand‑Bassam.
              </p>
            </motion.div>

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="flex flex-col items-center sm:flex-row gap-3 md:gap-4 justify-center"
>
  <Link href="/contact" className="w-full sm:w-auto">
    <Button variant="gold" size="lg" className="w-full" rightIcon={<ArrowRight className="h-5 w-5" />}>
      Demander un devis gratuit
    </Button>
  </Link>
  <Link href="/realisations" className="w-4/5 sm:w-auto">
    <Button 
      variant="outline" 
      size="lg" 
      className="w-full border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-colors"
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
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 md:hidden"
      >
        <div className="w-6 h-10 rounded-full border-2 border-stone-400 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-amber-400"
          />
        </div>
      </motion.div>
    </section>
  )
}
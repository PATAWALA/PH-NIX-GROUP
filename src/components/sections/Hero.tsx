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
          src="/images/hero.jpeg"
          alt="Construction de luxe par PHÉNIX GROUP"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMCwsKCwsM... (mets une vraie base64 minuscule)"
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent z-10" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 h-full flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 w-full pt-28 md:pt-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-white font-serif leading-tight mb-4 md:mb-6">
                L&apos;art
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  et sa valeur
                </span>
              </h1>
              <p className="text-base md:text-xl text-stone-300 mb-8 md:mb-10 max-w-2xl leading-relaxed">
                PHÉNIX GROUP & JF DÉCOR transforme vos rêves architecturaux en réalité. 
                Construction, aménagement et paysagisme d&apos;exception.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4"
            >
              <Link href="/contact">
                <Button variant="gold" size="lg" className="w-full sm:w-auto" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Demander un devis gratuit
                </Button>
              </Link>
              <Link href="/realisations">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-white/30 text-white"
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
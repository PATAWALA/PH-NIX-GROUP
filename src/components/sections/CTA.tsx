'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  ArrowRight, Phone, Mail, Calendar,
  CheckCircle2
} from 'lucide-react'

const benefits = [
  'Devis gratuit et personnalisé',
  'Réponse sous 48h',
  'Accompagnement expert',
  'Suivi de projet dédié',
]

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/backgrundcta.jpg"
          alt="Projet PHÉNIX GROUP"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/95 via-stone-900/85 to-stone-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
              Passez à l&apos;action
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6 font-serif leading-tight">
              Prêt à donner vie à votre projet d&apos;exception ?
            </h2>
            <p className="text-stone-300 text-lg mb-8 leading-relaxed">
              Notre équipe d&apos;experts est prête à vous accompagner dans la réalisation 
              de vos rêves architecturaux et paysagers les plus ambitieux.
            </p>

            {/* Benefits list */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-amber-400 flex-shrink-0" />
                  <span className="text-stone-200 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons – sans bordures */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button 
                  variant="gold" 
                  size="lg"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Demander mon devis gratuit
                </Button>
              </Link>
              <a href="tel:+2250749966009">
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm"
                  leftIcon={<Phone className="h-5 w-5" />}
                >
                  +2250749966009
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Contact cards – sans bordures, avec dégradé subtil */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Phone card */}
            <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 overflow-hidden group transition-all duration-300 hover:bg-white/10">
              {/* Dégradé subtil en fond */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-transparent" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-7 w-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Appelez-nous</h3>
                  <p className="text-stone-300 text-sm">Consultation téléphonique gratuite</p>
                  <a 
                    href="tel:+2250506960582" 
                    className="text-amber-400 font-semibold text-lg hover:text-amber-300 transition-colors"
                  >
                    +2250749966009
                  </a>
                </div>
              </div>
            </div>

            {/* Email card */}
            <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 overflow-hidden group transition-all duration-300 hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-transparent" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-7 w-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Email</h3>
                  <p className="text-stone-300 text-sm">Réponse garantie sous 24h</p>
                  <a 
                    href="mailto:contact@phenixgroup.ci" 
                    className="text-amber-400 font-semibold hover:text-amber-300 transition-colors"
                  >
                    contact@phenixgroup.ci
                  </a>
                </div>
              </div>
            </div>

            {/* Appointment card */}
            <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-6 overflow-hidden group transition-all duration-300 hover:bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-transparent" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-7 w-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Rendez-vous</h3>
                  <p className="text-stone-300 text-sm">Visite technique sur site</p>
                  <Link 
                    href="/contact" 
                    className="text-amber-400 font-semibold hover:text-amber-300 transition-colors inline-flex items-center gap-1"
                  >
                    Prendre rendez-vous
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
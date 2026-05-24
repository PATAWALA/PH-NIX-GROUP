'use client'

import { motion } from 'framer-motion'
import { 
  Building2, Users, Award, ThumbsUp,
  Clock, Shield, PhoneCall
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface StatsProps {
  stats: {
    projects: number
    clients: number
    experience: number
    satisfaction: number
  }
}

const statsList = [
  { 
    key: 'projects' as const, 
    icon: Building2, 
    label: 'Projets d’exception', 
    suffix: '' 
  },
  { 
    key: 'experience' as const, 
    icon: Clock, 
    label: 'Années d’expérience', 
    suffix: '' 
  },
  { 
    key: 'clients' as const, 
    icon: Users, 
    label: 'Clients satisfaits', 
    suffix: '+' 
  },
  { 
    key: 'satisfaction' as const, 
    icon: ThumbsUp, 
    label: 'Satisfaction', 
    suffix: '%' 
  },
]

const values = [
  {
    icon: Shield,
    title: 'Excellence',
    description: 'Un engagement qualité sans compromis sur chaque projet, des matériaux nobles aux finitions.'
  },
  {
    icon: Award,
    title: 'Savoir-faire',
    description: '16 ans d’expérience et une équipe d’artisans passionnés par la beauté du travail bien fait.'
  },
  {
    icon: Users,
    title: 'Confiance',
    description: 'Une relation de transparence avec nos clients, basée sur l’écoute et le respect des engagements.'
  },
]

export function StatsSection({ stats }: StatsProps) {
  return (
    <section className="py-24 bg-stone-900 relative overflow-hidden">
      {/* Fond avec texture */}
      <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-transparent to-stone-900" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Compteurs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {statsList.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-600/20 mb-4">
                <stat.icon className="h-8 w-8 text-amber-400" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white font-serif mb-2">
                {stats[stat.key]}
                <span className="text-amber-400">{stat.suffix}</span>
              </div>
              <div className="text-stone-400 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Valeurs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
            Nos Valeurs
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6 font-serif">
            L&apos;excellence comme standard
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Chaque projet est une œuvre d&apos;art qui reflète notre engagement 
            envers la qualité, l&apos;innovation et la satisfaction client.
          </p>
        </motion.div>

        {/* Cartes valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 via-amber-600/10 to-transparent" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center mb-6">
                  <value.icon className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-serif">
                  {value.title}
                </h3>
                <p className="text-stone-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bouton CTA ajouté */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="tel:+2250506960582">
            <Button 
              variant="gold" 
              size="lg" 
              leftIcon={<PhoneCall className="h-5 w-5" />}
              className="w-full sm:w-auto"
            >
              Faire appel à nous
            </Button>
          </a>
          <Link href="/contact">
            <Button 
              variant="outline" 
              size="lg"
              className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-white transition-colors w-full sm:w-auto"
            >
              Demander un devis gratuit
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
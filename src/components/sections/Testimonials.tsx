'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/client' // ✅
import type { Testimonial } from '@/types/database'

// Témoignages par défaut en attendant le chargement depuis Supabase
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Pierre Martin',
    role: 'Directeur',
    company: 'Hôtel Le Majestic',
    content: 'PHÉNIX GROUP a transformé notre vision en réalité. La construction de notre complexe hôtelier a dépassé toutes nos attentes. Leur souci du détail et leur professionnalisme sont exceptionnels.',
    rating: 5,
    project_type: 'construction',
  },
  {
    id: '2',
    author: 'Sophie Dubois',
    role: 'Propriétaire',
    company: 'Villa Les Oliviers',
    content: 'L\'aménagement de notre jardin avec piscine est tout simplement magnifique. L\'équipe a su créer un espace qui allie élégance et fonctionnalité. Un travail d\'artiste !',
    rating: 5,
    project_type: 'amenagement',
  },
  {
    id: '3',
    author: 'Marc Lefebvre',
    role: 'Architecte',
    company: 'Studio Lefebvre & Associés',
    content: 'La cascade artificielle créée par PHÉNIX GROUP est une véritable œuvre d\'art. Leur maîtrise du paysagisme artistique est impressionnante. Je les recommande vivement.',
    rating: 5,
    project_type: 'paysagisme',
  },
  {
    id: '4',
    author: 'Isabelle Moreau',
    role: 'Gérante',
    company: 'Restaurant La Terrasse',
    content: 'De la conception à la réalisation, PHÉNIX GROUP a fait preuve d\'un professionnalisme remarquable. Notre restaurant est devenu un lieu unique grâce à leur travail.',
    rating: 5,
    project_type: 'construction',
  },
]

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    async function loadTestimonials() {
      const supabase = createClient()
      const { data } = await supabase
        .from('temoignages')
        .select('*')
        .eq('affiche', true)
        .order('created_at', { ascending: false })
      
      if (data && data.length > 0) {
        setTestimonials(data)
      }
    }
    
    loadTestimonials()
  }, [])

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
    }),
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">
            Témoignages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-6 font-serif">
            Ils nous font confiance
          </h2>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de leur expérience avec PHÉNIX GROUP & JF DÉCOR.
          </p>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center rotate-3">
              <Quote className="h-8 w-8 text-amber-600" />
            </div>
          </div>

          <div className="bg-stone-50 rounded-3xl p-8 md:p-12 mt-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-50" />
            
            <div className="relative min-h-[300px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="w-full"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < currentTestimonial.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="text-center">
                    <p className="text-lg md:text-xl text-stone-700 leading-relaxed mb-8 italic font-serif">
                      &ldquo;{currentTestimonial.content}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author */}
                  <div className="text-center">
                    <div className="font-bold text-stone-900 text-lg">
                      {currentTestimonial.author}
                    </div>
                    <div className="text-stone-500">
                      {currentTestimonial.role}
                      {currentTestimonial.company && (
                        <> · {currentTestimonial.company}</>
                      )}
                    </div>
                  </div>

                  {/* Project type badge */}
                  {currentTestimonial.project_type && (
                    <div className="flex justify-center mt-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        {currentTestimonial.project_type === 'construction' && 'Construction'}
                        {currentTestimonial.project_type === 'amenagement' && 'Aménagement'}
                        {currentTestimonial.project_type === 'paysagisme' && 'Paysagisme'}
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-stone-600 hover:text-amber-700 hover:shadow-xl transition-all duration-300"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-stone-600 hover:text-amber-700 hover:shadow-xl transition-all duration-300"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-amber-600 w-8'
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-stone-200">
          {[
            'Plus de 200 clients satisfaits',
            'Projets livrés dans les délais',
            'Garantie décennale',
            'Service après-vente réactif',
          ].map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-stone-600">{text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { 
  Menu, X, Phone, ChevronDown, 
  Building2, Flower2, Palmtree 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navigation = [
  { name: 'Accueil', href: '/' },
  { 
    name: 'Services',
    href: '/services',
    children: [
      { 
        name: 'Construction Bâtiments',
        href: '/services/construction-batiments',
        description: 'Hôtels, restaurants, complexes',
        icon: Building2
      },
      { 
        name: 'Aménagement Extérieur',
        href: '/services/amenagement-exterieur',
        description: 'Jardins, piscines, terrasses',
        icon: Flower2
      },
      { 
        name: 'Paysagisme Artistique',
        href: '/services/paysagisme-artistique',
        description: 'Cascades, grottes, décors',
        icon: Palmtree
      },
    ]
  },
  { name: 'Réalisations', href: '/realisations' },
  { name: 'À propos', href: '/a-propos' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    // Vérifier l'état initial
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        // ✅ TOUJOURS un fond sur les autres pages
        !isHomePage && 'bg-white/95 backdrop-blur-md shadow-lg',
        // ✅ Sur la home : transparent si pas scrollé, blanc si scrollé
        isHomePage && isScrolled && 'bg-white/95 backdrop-blur-md shadow-lg',
        isHomePage && !isScrolled && 'bg-transparent'
      )}
    >
      {/* Top bar - visible seulement sur la home non scrollée */}
      <div className={cn(
        'bg-stone-900 text-white transition-all duration-500 overflow-hidden',
        (!isHomePage || isScrolled) ? 'h-0' : 'h-10'
      )}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              01 23 45 67 89
            </a>
            <span>|</span>
            <span>L&apos;art et sa valeur depuis 1998</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hover:text-amber-400 transition-colors">
              Demander un devis
            </Link>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex flex-col">
              <span className={cn(
                'text-2xl font-bold font-serif tracking-wider transition-colors',
                // ✅ Texte toujours sombre sauf sur la home non scrollée
                (!isHomePage || isScrolled) ? 'text-stone-900' : 'text-white'
              )}>
                PHÉNIX GROUP
              </span>
              <span className={cn(
                'text-xs tracking-[0.2em] uppercase transition-colors',
                (!isHomePage || isScrolled) ? 'text-amber-700' : 'text-amber-400'
              )}>
                & JF DÉCOR
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1',
                      (!isHomePage || isScrolled)
                        ? 'text-stone-700 hover:text-amber-700 hover:bg-amber-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 block',
                      pathname === item.href
                        ? (!isHomePage || isScrolled)
                          ? 'text-amber-700 bg-amber-50'
                          : 'text-white bg-white/10'
                        : (!isHomePage || isScrolled)
                          ? 'text-stone-700 hover:text-amber-700 hover:bg-amber-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-stone-100 overflow-hidden"
                    >
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors group"
                          >
                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 group-hover:bg-amber-200 transition-colors">
                              <child.icon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
                                {child.name}
                              </div>
                              <div className="text-sm text-stone-500 mt-0.5">
                                {child.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA and mobile menu button */}
          <div className="flex items-center gap-4">
            <Link href="/contact" className="hidden lg:block">
              <Button variant="gold" size="sm">
                Devis gratuit
              </Button>
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg transition-colors',
                (!isHomePage || isScrolled)
                  ? 'text-stone-900 hover:bg-stone-100'
                  : 'text-white hover:bg-white/10'
              )}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-stone-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <div className="font-medium text-stone-900 py-2">
                        {item.name}
                      </div>
                      <div className="ml-4 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-3 py-2 text-stone-600 hover:text-amber-700 transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <child.icon className="h-4 w-4" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-2 font-medium transition-colors',
                        pathname === item.href
                          ? 'text-amber-700'
                          : 'text-stone-900 hover:text-amber-700'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/contact"
                className="block mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="gold" fullWidth>
                  Devis gratuit
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
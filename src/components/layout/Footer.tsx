'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Phone, Mail, MapPin, Clock, 
  Building2, Flower2, Palmtree,
  ArrowRight 
} from 'lucide-react'
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram
} from 'react-icons/fa6'
import { Button } from '@/components/ui/Button'

const footerLinks = {
  services: [
    { name: 'Construction Bâtiments', href: '/services/construction-batiments', icon: Building2 },
    { name: 'Aménagement Extérieur', href: '/services/amenagement-exterieur', icon: Flower2 },
    { name: 'Paysagisme Artistique', href: '/services/paysagisme-artistique', icon: Palmtree },
  ],
  entreprise: [
    { name: 'À propos', href: '/a-propos' },
    { name: 'Réalisations', href: '/realisations' },
    { name: 'Contact', href: '/contact' },
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'Politique de confidentialité', href: '/confidentialite' },
  ],
  contact: [
    { icon: Phone, text: '+225 05 06 96 05 82', href: 'tel:+2250506960582' },
    { icon: Phone, text: '+225 42 55 07 79', href: 'tel:+22542550779' },
    { icon: Mail, text: 'contact@phenixgroup.ci', href: 'mailto:contact@phenixgroup.ci' },
    { icon: MapPin, text: 'Abidjan, Côte d\'Ivoire' },
    { icon: Clock, text: 'Lun-Ven: 8h-19h | Sam: 9h-17h' },
  ],
}

const socialLinks = [
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
]

export function Footer() {
  const pathname = usePathname()
  const isContactPage = pathname === '/contact'

  return (
    <footer className="bg-stone-900 text-stone-300">
      {/* CTA Section – masquée sur la page Contact */}
      {!isContactPage && (
        <div className="border-b border-stone-800">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white font-serif mb-3">
                    L’excellence à votre service
                  </h2>
                  <p className="text-amber-100 text-lg max-w-2xl">
                    Un accompagnement sur mesure et un devis gratuit sous 48h pour concrétiser vos ambitions.
                  </p>
                </div>
                <Link href="/contact">
                  <Button variant="secondary" size="lg" className="bg-white text-amber-800 hover:bg-amber-50 whitespace-nowrap">
                    Demander mon devis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company info avec logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="PHÉNIX GROUP & JF DÉCOR"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="w-px h-8 bg-stone-700" />
              <div>
                <h3 className="text-xl font-bold text-white font-serif tracking-wider leading-tight">
                  PHÉNIX GROUP
                </h3>
                <p className="text-amber-500 text-[10px] tracking-[0.2em] uppercase mt-0.5">
                  & JF DÉCOR
                </p>
              </div>
            </div>
            
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              L&apos;art et sa valeur depuis 1998. Experts en construction, aménagement 
              et paysagisme pour des projets d&apos;exception.
            </p>
            
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-amber-700 hover:text-white transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-6">Nos Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-stone-400 hover:text-amber-400 transition-colors group"
                  >
                    <link.icon className="h-4 w-4 group-hover:text-amber-400 transition-colors" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="text-white font-semibold mb-6">Entreprise</h4>
            <ul className="space-y-3">
              {footerLinks.entreprise.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-amber-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              {footerLinks.contact.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <item.icon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-stone-400 hover:text-amber-400 transition-colors text-sm"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-stone-400 text-sm">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
            <p>© {new Date().getFullYear()} PHÉNIX GROUP & JF DÉCOR. Tous droits réservés.</p>
            <p>Développé avec passion pour l&apos;excellence.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
import { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact & Devis | PHÉNIX GROUP & JF DÉCOR',
  description: 'Contactez-nous pour un devis gratuit. Notre équipe vous répond sous 48h pour concrétiser votre projet.',
}

const contactInfo = [
  {
    icon: Phone,
    title: 'Téléphone',
    details: ['+225 05 06 96 05 82', '+225 42 55 07 79'],
    description: 'Appelez-nous directement',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['contact@phenixgroup.ci'],
    description: 'Réponse sous 24h',
  },
  {
    icon: MapPin,
    title: 'Adresse',
    details: ['Abidjan, Côte d\'Ivoire'],
    description: 'Intervention dans toute la Côte d\'Ivoire',
  },
  {
    icon: Clock,
    title: 'Horaires',
    details: ['Lun-Ven: 8h00 - 19h00', 'Sam: 9h00 - 17h00'],
    description: 'Sur rendez-vous',
  },
]

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-amber-700 font-semibold text-sm uppercase tracking-wider">Contact</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 mt-3 mb-6 font-serif">
            Parlons de votre projet
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Notre équipe d&apos;experts est à votre écoute. Remplissez le formulaire ci-dessous
            et nous vous répondrons sous 48h maximum.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-amber-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 font-serif">Demande de devis</h2>
                  <p className="text-stone-600 text-sm">Gratuit et sans engagement</p>
                </div>
              </div>
              <ContactForm />
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-stone-600 text-sm">{detail}</p>
                    ))}
                    <p className="text-xs text-stone-400 mt-2">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Bouton WhatsApp direct */}
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-sm text-green-800 mb-3 font-medium">
                  Ou écrivez-nous directement sur WhatsApp
                </p>
                <a
                  href="https://wa.me/22542550779?text=Bonjour%20PHÉNIX%20GROUP%20%26%20JF%20DÉCOR,%20je%20souhaite%20échanger%20au%20sujet%20d'un%20projet."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Discuter sur WhatsApp
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
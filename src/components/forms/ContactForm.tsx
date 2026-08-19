'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import {
  User, Phone, MapPin,
  CheckCircle2, Send, Loader2
} from 'lucide-react'

// Schéma simplifié - 4 champs maximum
const contactFormSchema = z.object({
  nom: z.string().min(2, 'Votre nom est requis'),
  telephone: z.string().min(8, 'Numéro trop court'),
  localisation: z.string().min(2, 'Votre localisation est requise'),
  description: z.string().min(10, 'Décrivez brièvement votre projet (min 10 caractères)'),
})

type ContactFormData = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  })

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true)

    // Construire le message WhatsApp
    const message = `
✨ *Nouvelle demande de devis* ✨

👤 *Nom* : ${data.nom}
📞 *Téléphone* : ${data.telephone}
📍 *Localisation* : ${data.localisation}
📝 *Description* : ${data.description}
`.trim()

    const encodedMessage = encodeURIComponent(message)
    const waUrl = `https://wa.me/22542550779?text=${encodedMessage}`

    // Ouvrir WhatsApp
    window.open(waUrl, '_blank')

    // Afficher le succès
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-stone-900 mb-3 font-serif">
          Demande envoyée !
        </h3>
        <p className="text-stone-600 mb-6 max-w-md mx-auto">
          Votre demande a été transmise via WhatsApp. Notre équipe vous recontactera rapidement.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Nouvelle demande
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Champ 1 : Nom */}
      <Input
        id="nom"
        label="Nom complet *"
        placeholder="Votre nom"
        icon={<User className="h-4 w-4" />}
        error={errors.nom?.message}
        {...register('nom')}
      />

      {/* Champ 2 : Téléphone */}
      <Input
        id="telephone"
        type="tel"
        label="Téléphone *"
        placeholder="+225 07 00 00 00 00"
        icon={<Phone className="h-4 w-4" />}
        error={errors.telephone?.message}
        {...register('telephone')}
      />

      {/* Champ 3 : Localisation */}
      <Input
        id="localisation"
        label="Localisation *"
        placeholder="Abidjan, Cocody, Bingerville…"
        icon={<MapPin className="h-4 w-4" />}
        error={errors.localisation?.message}
        {...register('localisation')}
      />

      {/* Champ 4 : Description */}
      <Textarea
        id="description"
        label="Décrivez votre projet *"
        placeholder="Ex: Je souhaite aménager mon jardin avec une piscine et des espaces verts…"
        error={errors.description?.message}
        {...register('description')}
      />

      {/* Bouton Envoyer */}
      <Button
        type="submit"
        variant="gold"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        rightIcon={<Send className="h-4 w-4" />}
      >
        Envoyer ma demande
      </Button>

      <p className="text-xs text-stone-400 text-center">
        En envoyant, vous serez redirigé vers WhatsApp pour finaliser votre demande.
      </p>
    </form>
  )
}
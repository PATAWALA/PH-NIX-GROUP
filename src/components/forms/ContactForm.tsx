'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { contactFormSchema, type ContactFormData } from '@/types/schemas'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { StepIndicator } from './StepIndicator'
import {
  User, Mail, Phone, MapPin,
  Home, Calendar,
  CheckCircle2, Send, ArrowRight, ArrowLeft,
  Building2, Flower2, Palmtree, HelpCircle
} from 'lucide-react'

const steps = [
  { id: 1, title: 'Contact', icon: User },
  { id: 2, title: 'Projet', icon: Home },
  { id: 3, title: 'Détails', icon: Calendar },
  { id: 4, title: 'Confirmation', icon: CheckCircle2 },
]

const projectTypes = [
  { value: 'construction', label: 'Construction de bâtiments', icon: Building2 },
  { value: 'amenagement', label: 'Aménagement extérieur', icon: Flower2 },
  { value: 'paysagisme', label: 'Paysagisme artistique', icon: Palmtree },
  { value: 'autre', label: 'Autre projet', icon: HelpCircle },
]

const budgetOptions = [
  { value: 'moins_100k', label: 'Moins de 10 000 000 FCFA' },
  { value: '100k_500k', label: '10 000 000 – 50 000 000 FCFA' },
  { value: '500k_1m', label: '50 000 000 – 100 000 000 FCFA' },
  { value: 'plus_1m', label: 'Plus de 100 000 000 FCFA' },
  { value: 'non_defini', label: 'Budget non défini' },
]

export function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
  })

  const watchAllFields = watch()

  const validateStep = async (step: number) => {
    switch (step) {
      case 1:
        return await trigger(['nom', 'email', 'telephone'])
      case 2:
        return await trigger(['type_projet', 'localisation'])
      case 3:
        return await trigger(['description', 'budget'])
      default:
        return true
    }
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true)

    // Construire le message WhatsApp
    const message = `
✨ *Nouvelle demande de devis* ✨

👤 *Nom* : ${data.nom}
📧 *Email* : ${data.email}
📞 *Téléphone* : ${data.telephone}
🏗️ *Type de projet* : ${projectTypes.find(t => t.value === data.type_projet)?.label}
📍 *Localisation* : ${data.localisation}
💰 *Budget* : ${budgetOptions.find(b => b.value === data.budget)?.label}
📝 *Description* : ${data.description}
${data.delai_souhaite ? `⏱️ *Délai souhaité* : ${data.delai_souhaite}` : ''}
${data.surface_approximative ? `📐 *Surface approx.* : ${data.surface_approximative}` : ''}
`.trim()

    const encodedMessage = encodeURIComponent(message)
    const waUrl = `https://wa.me/22542550779?text=${encodedMessage}`

    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(waUrl, '_blank')

    // Afficher le message de succès
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
  }

  const handleNewRequest = () => {
    setIsSuccess(false)
    setCurrentStep(1)
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
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-stone-900 mb-3 font-serif">
          Demande envoyée avec succès !
        </h3>
        <p className="text-stone-600 mb-6 max-w-md mx-auto">
          Votre demande a été transmise via WhatsApp. Notre équipe vous recontactera dans les plus brefs délais.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleNewRequest} variant="outline">
            Nouvelle demande
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <StepIndicator steps={steps} currentStep={currentStep} />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <AnimatePresence mode="wait">
          {/* Étape 1 : Informations de contact */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">
                Vos informations de contact
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="nom"
                  label="Nom complet *"
                  placeholder="Jean Dupont"
                  icon={<User className="h-4 w-4" />}
                  error={errors.nom?.message}
                  {...register('nom')}
                />
                <Input
                  id="email"
                  type="email"
                  label="Email *"
                  placeholder="jean@exemple.ci"
                  icon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>

              <Input
                id="telephone"
                type="tel"
                label="Téléphone *"
                placeholder="+225 05 06 96 05 82"
                icon={<Phone className="h-4 w-4" />}
                error={errors.telephone?.message}
                {...register('telephone')}
              />
            </motion.div>
          )}

          {/* Étape 2 : Type de projet */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">
                Votre projet
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectTypes.map((type) => {
                  const isSelected = watchAllFields.type_projet === type.value
                  return (
                    <label
                      key={type.value}
                      className={`relative flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 shadow-lg scale-[1.02]'
                          : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50 hover:scale-[1.01]'
                      }`}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        className="sr-only"
                        {...register('type_projet')}
                      />
                      <type.icon className={`h-8 w-8 mb-3 transition-colors duration-300 ${isSelected ? 'text-amber-600' : 'text-stone-400'}`} />
                      <span className={`text-sm font-medium text-center transition-colors duration-300 ${isSelected ? 'text-amber-900' : 'text-stone-700'}`}>
                        {type.label}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center"
                        >
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                    </label>
                  )
                })}
              </div>
              {errors.type_projet && (
                <p className="text-sm text-red-600">{errors.type_projet.message}</p>
              )}

              <Input
                id="localisation"
                label="Localisation du projet *"
                placeholder="Abidjan, Yamoussoukro…"
                icon={<MapPin className="h-4 w-4" />}
                error={errors.localisation?.message}
                {...register('localisation')}
              />
            </motion.div>
          )}

          {/* Étape 3 : Détails du projet */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">
                Détails de votre projet
              </h3>

              <Textarea
                id="description"
                label="Description du projet *"
                placeholder="Décrivez votre projet, vos besoins et vos attentes…"
                error={errors.description?.message}
                {...register('description')}
              />

              <Select
                id="budget"
                label="Budget estimé"
                options={budgetOptions}
                placeholder="Sélectionnez une tranche"
                error={errors.budget?.message}
                value={watchAllFields.budget || ''}
                onChange={(e) => {
                  const event = { target: { name: 'budget', value: e.target.value } }
                  register('budget').onChange(event)
                }}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="delai_souhaite"
                  label="Délai souhaité"
                  placeholder="Ex: 6 mois"
                  icon={<Calendar className="h-4 w-4" />}
                  {...register('delai_souhaite')}
                />
                <Input
                  id="surface_approximative"
                  label="Surface approximative"
                  placeholder="Ex: 150 m²"
                  {...register('surface_approximative')}
                />
              </div>

              <label className="flex items-center gap-3 mt-6 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                  {...register('newsletter')}
                />
                <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                  Je souhaite recevoir les actualités et réalisations de PHÉNIX GROUP
                </span>
              </label>
            </motion.div>
          )}

          {/* Étape 4 : Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">
                Récapitulatif de votre demande
              </h3>

              <div className="bg-stone-50 rounded-xl p-6 space-y-4 border border-stone-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><p className="text-sm text-stone-500">Nom complet</p><p className="font-medium text-stone-900">{watchAllFields.nom}</p></div>
                  <div><p className="text-sm text-stone-500">Email</p><p className="font-medium text-stone-900">{watchAllFields.email}</p></div>
                  <div><p className="text-sm text-stone-500">Téléphone</p><p className="font-medium text-stone-900">{watchAllFields.telephone}</p></div>
                  <div><p className="text-sm text-stone-500">Type de projet</p><p className="font-medium text-stone-900">{projectTypes.find(t => t.value === watchAllFields.type_projet)?.label}</p></div>
                  <div><p className="text-sm text-stone-500">Localisation</p><p className="font-medium text-stone-900">{watchAllFields.localisation}</p></div>
                  <div><p className="text-sm text-stone-500">Budget estimé</p><p className="font-medium text-stone-900">{budgetOptions.find(b => b.value === watchAllFields.budget)?.label}</p></div>
                  {watchAllFields.delai_souhaite && <div><p className="text-sm text-stone-500">Délai souhaité</p><p className="font-medium text-stone-900">{watchAllFields.delai_souhaite}</p></div>}
                  {watchAllFields.surface_approximative && <div><p className="text-sm text-stone-500">Surface approximative</p><p className="font-medium text-stone-900">{watchAllFields.surface_approximative}</p></div>}
                </div>
                <div><p className="text-sm text-stone-500">Description du projet</p><p className="font-medium text-stone-900 mt-1 leading-relaxed">{watchAllFields.description}</p></div>
              </div>

              <p className="text-sm text-stone-500 text-center">
                En cliquant sur &quot;Envoyer ma demande&quot;, vous acceptez d&apos;être recontacté 
                par notre équipe dans le cadre de votre projet.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && currentStep < 4 && (
            <Button type="button" variant="outline" onClick={handlePrevious} leftIcon={<ArrowLeft className="h-4 w-4" />}>
              Précédent
            </Button>
          )}

          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext} className="ml-auto" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Suivant
            </Button>
          ) : (
            <Button type="submit" variant="gold" size="lg" className="ml-auto" isLoading={isSubmitting} rightIcon={<Send className="h-4 w-4" />}>
              Envoyer ma demande
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
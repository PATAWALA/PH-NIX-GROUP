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
  Home, Euro, Calendar, Ruler,
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
  { value: 'moins_100k', label: 'Moins de 100 000 €' },
  { value: '100k_500k', label: '100 000 € - 500 000 €' },
  { value: '500k_1m', label: '500 000 € - 1 M€' },
  { value: 'plus_1m', label: 'Plus de 1 M€' },
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

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Erreur lors de l\'envoi')

      setIsSuccess(true)
    } catch (error) {
      console.error('Erreur:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-stone-900 mb-3 font-serif">
          Demande envoyée avec succès !
        </h3>
        <p className="text-stone-600 mb-6 max-w-md mx-auto">
          Merci de votre confiance. Notre équipe étudie votre projet et vous recontacte 
          dans les 48 heures pour un accompagnement personnalisé.
        </p>
        <Button onClick={() => setIsSuccess(false)} variant="outline">
          Nouvelle demande
        </Button>
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
                  placeholder="jean@exemple.fr"
                  icon={<Mail className="h-4 w-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />
              </div>
              
              <Input
                id="telephone"
                type="tel"
                label="Téléphone *"
                placeholder="06 12 34 56 78"
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
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">
                Votre projet
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {projectTypes.map((type) => {
                  const isSelected = watchAllFields.type_projet === type.value
                  return (
                    <label
                      key={type.value}
                      className={`
                        relative flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-300
                        ${isSelected 
                          ? 'border-amber-500 bg-amber-50 shadow-lg' 
                          : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={type.value}
                        className="sr-only"
                        {...register('type_projet')}
                      />
                      <type.icon className={`h-8 w-8 mb-3 ${isSelected ? 'text-amber-600' : 'text-stone-400'}`} />
                      <span className={`text-sm font-medium text-center ${isSelected ? 'text-amber-900' : 'text-stone-700'}`}>
                        {type.label}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-white" />
                        </div>
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
                placeholder="Ville, département"
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
              className="space-y-4"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">
                Détails de votre projet
              </h3>

              <Textarea
                id="description"
                label="Description du projet *"
                placeholder="Décrivez votre projet, vos besoins et vos attentes..."
                error={errors.description?.message}
                {...register('description')}
              />

              <Select
                id="budget"
                label="Budget estimé"
                options={budgetOptions}
                placeholder="Sélectionnez une tranche de budget"
                icon={<Euro className="h-4 w-4" />}
                error={errors.budget?.message}
                {...register('budget')}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  id="delai_souhaite"
                  label="Délai souhaité"
                  placeholder="Ex: 6 mois, 1 an"
                  icon={<Calendar className="h-4 w-4" />}
                  {...register('delai_souhaite')}
                />
                <Input
                  id="surface_approximative"
                  label="Surface approximative"
                  placeholder="Ex: 150 m²"
                  icon={<Ruler className="h-4 w-4" />}
                  {...register('surface_approximative')}
                />
              </div>

              <label className="flex items-center gap-3 mt-6 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                  {...register('newsletter')}
                />
                <span className="text-sm text-stone-600">
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
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-stone-900 mb-6 font-serif">
                Récapitulatif de votre demande
              </h3>

              <div className="bg-stone-50 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-stone-500">Nom</p>
                    <p className="font-medium text-stone-900">{watchAllFields.nom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Email</p>
                    <p className="font-medium text-stone-900">{watchAllFields.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Téléphone</p>
                    <p className="font-medium text-stone-900">{watchAllFields.telephone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Type de projet</p>
                    <p className="font-medium text-stone-900">
                      {projectTypes.find(t => t.value === watchAllFields.type_projet)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Localisation</p>
                    <p className="font-medium text-stone-900">{watchAllFields.localisation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Budget</p>
                    <p className="font-medium text-stone-900">
                      {budgetOptions.find(b => b.value === watchAllFields.budget)?.label}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-stone-500">Description</p>
                  <p className="font-medium text-stone-900 mt-1">{watchAllFields.description}</p>
                </div>
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
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Précédent
            </Button>
          )}
          
          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="ml-auto"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Suivant
            </Button>
          ) : (
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="ml-auto"
              isLoading={isSubmitting}
              rightIcon={<Send className="h-4 w-4" />}
            >
              Envoyer ma demande
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
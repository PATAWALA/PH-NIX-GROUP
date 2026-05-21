import { z } from 'zod'

export const contactFormSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  telephone: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, 'Téléphone invalide'),
  type_projet: z.enum(['construction', 'amenagement', 'paysagisme', 'autre']),
  localisation: z.string().min(2, 'La localisation est requise'),
  budget: z.enum(['moins_100k', '100k_500k', '500k_1m', 'plus_1m', 'non_defini']),
  description: z.string().min(10, 'Veuillez décrire votre projet (min 10 caractères)'),
  delai_souhaite: z.string().optional(),
  surface_approximative: z.string().optional(),
  newsletter: z.boolean().optional()
})

export type ContactFormData = z.infer<typeof contactFormSchema>
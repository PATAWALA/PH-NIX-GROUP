import { z } from 'zod'

export const contactFormSchema = z.object({
  nom: z.string().min(2, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  telephone: z
    .string()
    .min(8, 'Numéro trop court')
    .regex(/^[+\d\s.-]{8,}$/, 'Format de téléphone invalide'),
  type_projet: z.enum(['amenagement', 'paysagisme', 'entretien', 'autre']),
  localisation: z.string().min(2, 'La localisation est requise'),
  budget: z.enum(['moins_100k', '100k_500k', '500k_1m', 'plus_1m', 'non_defini']),
  description: z.string().min(10, 'Veuillez décrire votre projet (min 10 caractères)'),
  delai_souhaite: z.string().optional(),
  surface_approximative: z.string().optional(),
  newsletter: z.boolean().optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// Schéma pour les services
export const serviceSchema = z.object({
  titre: z.string().min(2, 'Le titre est requis'),
  description: z.string().min(10, 'La description est requise'),
  icone: z.string().min(1, 'L\'icône est requise'),
  categorie: z.enum(['amenagement', 'paysagisme', 'entretien', 'autre']),
  caracteristiques: z.array(z.string()),
  image_url: z.string().nullable().optional(),
  ordre: z.number().nullable().optional(),
  slug: z.string().min(2, 'Le slug est requis'),
})

export type ServiceFormData = z.infer<typeof serviceSchema>
import type { Database } from './supabase'

// Types dérivés automatiquement de Supabase
export type ProjectType = Database['public']['Enums']['type_projet_enum']
export type BudgetEnum = Database['public']['Enums']['budget_enum']
export type StatutDemandeEnum = Database['public']['Enums']['statut_demande_enum']

// Types des tables
export type Realisation = Database['public']['Tables']['realisations']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Temoignage = Database['public']['Tables']['temoignages']['Row']
export type DemandeDevis = Database['public']['Tables']['demandes_de_visis']['Row']

// Types pour les insertions
export type RealisationInsert = Database['public']['Tables']['realisations']['Insert']
export type ServiceInsert = Database['public']['Tables']['services']['Insert']
export type TemoignageInsert = Database['public']['Tables']['temoignages']['Insert']

// Interface Project pour la galerie
export interface Project {
  id: string
  categorie: ProjectType
  images: string[]
  created_at?: string | null
}

// Interface Testimonial pour les témoignages
export interface Testimonial {
  id: string
  author: string
  role?: string
  company?: string
  content: string
  rating: number
  project_type: ProjectType | null
  affiche?: boolean | null
}

// Type pour les statistiques
export interface Stats {
  projects: number
  clients: number
  experience: number
  satisfaction: number
}
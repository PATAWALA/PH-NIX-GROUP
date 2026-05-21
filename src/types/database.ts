export type ProjectType = 'construction' | 'amenagement' | 'paysagisme'

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  category: ProjectType
  features: string[]
  image: string
}

export interface Project {
  id: string
  title: string
  description: string
  category: ProjectType
  images: string[]
  location: string
  year: number
  client?: string
  duration?: string
  featured: boolean
}

export interface Testimonial {
  id: string
  author: string
  role: string
  company?: string
  content: string
  rating: number
  project_type: ProjectType
}

export interface Stat {
  label: string
  value: number
  suffix: string
  icon: string
}
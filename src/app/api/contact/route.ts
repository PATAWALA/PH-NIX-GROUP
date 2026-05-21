import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/admin'
import { headers } from 'next/headers'
import { contactFormSchema } from '@/types/schemas'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validation des données
    const validatedData = contactFormSchema.parse(body)
    
    // ✅ AJOUTER await ICI
    const headersList = await headers()
    const ip_address = headersList.get('x-forwarded-for') || 'unknown'
    const user_agent = headersList.get('user-agent') || 'unknown'
    
    // Insertion dans Supabase
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('demandes_de_visis')
      .insert({
        nom: validatedData.nom,
        email: validatedData.email,
        telephone: validatedData.telephone,
        type_projet: validatedData.type_projet,
        localisation: validatedData.localisation,
        description: validatedData.description,
        budget: validatedData.budget,
        delai_souhaite: validatedData.delai_souhaite,
        surface_approximative: validatedData.surface_approximative,
        newsletter: validatedData.newsletter,
        ip_address,
        user_agent,
        source: 'site_web',
        statut: 'nouveau'
      })
      .select('id')
      .single()
    
    if (error) throw error
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Votre demande a été envoyée avec succès',
        id: data.id 
      },
      { status: 201 }
    )
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Une erreur est survenue' },
      { status: 400 }
    )
  }
}
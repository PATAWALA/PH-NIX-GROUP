import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/admin' // ✅
import { contactFormSchema } from '@/types/schemas'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validation des données
    const validatedData = contactFormSchema.parse(body)
    
    // Récupération des informations du client
    const headersList = headers()
    const ip_address = headersList.get('x-forwarded-for') || 'unknown'
    const user_agent = headersList.get('user-agent') || 'unknown'
    
    // Insertion dans Supabase
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('demandes_de_visis')
      .insert({
        ...validatedData,
        ip_address,
        user_agent,
        source: 'site_web',
        statut: 'nouveau'
      })
      .select('id')
      .single()
    
    if (error) throw error
    
    // Notification par email (optionnel - à configurer)
    // await sendNotificationEmail(validatedData)
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Votre demande a été envoyée avec succès',
        id: data.id 
      },
      { status: 201 }
    )
    
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, message: 'Une erreur est survenue' },
      { status: 500 }
    )
  }
}
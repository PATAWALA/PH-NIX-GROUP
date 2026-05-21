import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email requis' },
        { status: 400 }
      )
    }

    // TODO: Ajouter l'email à Supabase ou service email
    // const supabase = createAdminClient()
    // await supabase.from('newsletter').insert({ email })

    return NextResponse.json(
      { success: true, message: 'Inscription réussie' },
      { status: 200 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      demandes_de_visis: {
        Row: {
          assigne_a: string | null
          budget: Database["public"]["Enums"]["budget_enum"] | null
          created_at: string | null
          delai_souhaite: string | null
          description: string
          email: string
          id: string
          ip_address: unknown
          localisation: string
          newsletter: boolean | null
          nom: string
          notes_internes: string | null
          pieces_jointes: string[] | null
          source: string | null
          statut: Database["public"]["Enums"]["statut_demande_enum"] | null
          surface_approximative: string | null
          telephone: string
          type_projet: Database["public"]["Enums"]["type_projet_enum"]
          updated_at: string | null
          user_agent: string | null
        }
        Insert: {
          assigne_a?: string | null
          budget?: Database["public"]["Enums"]["budget_enum"] | null
          created_at?: string | null
          delai_souhaite?: string | null
          description: string
          email: string
          id?: string
          ip_address?: unknown
          localisation: string
          newsletter?: boolean | null
          nom: string
          notes_internes?: string | null
          pieces_jointes?: string[] | null
          source?: string | null
          statut?: Database["public"]["Enums"]["statut_demande_enum"] | null
          surface_approximative?: string | null
          telephone: string
          type_projet: Database["public"]["Enums"]["type_projet_enum"]
          updated_at?: string | null
          user_agent?: string | null
        }
        Update: {
          assigne_a?: string | null
          budget?: Database["public"]["Enums"]["budget_enum"] | null
          created_at?: string | null
          delai_souhaite?: string | null
          description?: string
          email?: string
          id?: string
          ip_address?: unknown
          localisation?: string
          newsletter?: boolean | null
          nom?: string
          notes_internes?: string | null
          pieces_jointes?: string[] | null
          source?: string | null
          statut?: Database["public"]["Enums"]["statut_demande_enum"] | null
          surface_approximative?: string | null
          telephone?: string
          type_projet?: Database["public"]["Enums"]["type_projet_enum"]
          updated_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      realisations: {
        Row: {
          categorie: Database["public"]["Enums"]["type_projet_enum"]
          created_at: string | null
          id: string
          images: string[]
          updated_at: string | null
        }
        Insert: {
          categorie: Database["public"]["Enums"]["type_projet_enum"]
          created_at?: string | null
          id?: string
          images: string[]
          updated_at?: string | null
        }
        Update: {
          categorie?: Database["public"]["Enums"]["type_projet_enum"]
          created_at?: string | null
          id?: string
          images?: string[]
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          caracteristiques: string[]
          categorie: Database["public"]["Enums"]["type_projet_enum"]
          created_at: string | null
          description: string
          icone: string
          id: string
          image_url: string | null
          ordre: number | null
          slug: string
          titre: string
        }
        Insert: {
          caracteristiques: string[]
          categorie: Database["public"]["Enums"]["type_projet_enum"]
          created_at?: string | null
          description: string
          icone: string
          id?: string
          image_url?: string | null
          ordre?: number | null
          slug: string
          titre: string
        }
        Update: {
          caracteristiques?: string[]
          categorie?: Database["public"]["Enums"]["type_projet_enum"]
          created_at?: string | null
          description?: string
          icone?: string
          id?: string
          image_url?: string | null
          ordre?: number | null
          slug?: string
          titre?: string
        }
        Relationships: []
      }
      temoignages: {
        Row: {
          affiche: boolean | null
          auteur: string
          contenu: string
          created_at: string | null
          id: string
          note: number | null
          role_entreprise: string | null
          type_projet: Database["public"]["Enums"]["type_projet_enum"] | null
        }
        Insert: {
          affiche?: boolean | null
          auteur: string
          contenu: string
          created_at?: string | null
          id?: string
          note?: number | null
          role_entreprise?: string | null
          type_projet?: Database["public"]["Enums"]["type_projet_enum"] | null
        }
        Update: {
          affiche?: boolean | null
          auteur?: string
          contenu?: string
          created_at?: string | null
          id?: string
          note?: number | null
          role_entreprise?: string | null
          type_projet?: Database["public"]["Enums"]["type_projet_enum"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      budget_enum:
        | "moins_100k"
        | "100k_500k"
        | "500k_1m"
        | "plus_1m"
        | "non_defini"
      statut_demande_enum:
        | "nouveau"
        | "contacte"
        | "en_cours"
        | "devis_envoye"
        | "accepte"
        | "refuse"
        | "archive"
      type_projet_enum: "amenagement" | "paysagisme" | "entretien" | "autre"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      budget_enum: [
        "moins_100k",
        "100k_500k",
        "500k_1m",
        "plus_1m",
        "non_defini",
      ],
      statut_demande_enum: [
        "nouveau",
        "contacte",
        "en_cours",
        "devis_envoye",
        "accepte",
        "refuse",
        "archive",
      ],
      type_projet_enum: ["amenagement", "paysagisme", "entretien", "autre"],
    },
  },
} as const

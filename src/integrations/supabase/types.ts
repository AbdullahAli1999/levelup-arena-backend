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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          child_id: number | null
          created_at: string | null
          id: number
          player_id: number | null
          session_id: number
          status: Database["public"]["Enums"]["booking_status"] | null
        }
        Insert: {
          child_id?: number | null
          created_at?: string | null
          id?: number
          player_id?: number | null
          session_id: number
          status?: Database["public"]["Enums"]["booking_status"] | null
        }
        Update: {
          child_id?: number | null
          created_at?: string | null
          id?: number
          player_id?: number | null
          session_id?: number
          status?: Database["public"]["Enums"]["booking_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      child_stats: {
        Row: {
          achievements: string[] | null
          child_id: number
          current_rank: string | null
          id: number
          sessions_completed: number | null
          total_hours: number | null
          updated_at: string | null
        }
        Insert: {
          achievements?: string[] | null
          child_id: number
          current_rank?: string | null
          id?: number
          sessions_completed?: number | null
          total_hours?: number | null
          updated_at?: string | null
        }
        Update: {
          achievements?: string[] | null
          child_id?: number
          current_rank?: string | null
          id?: number
          sessions_completed?: number | null
          total_hours?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "child_stats_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: true
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
        ]
      }
      children: {
        Row: {
          age: number
          created_at: string | null
          gaming_username: string | null
          id: number
          name: string
          parent_id: number
        }
        Insert: {
          age: number
          created_at?: string | null
          gaming_username?: string | null
          id?: number
          name: string
          parent_id: number
        }
        Update: {
          age?: number
          created_at?: string | null
          gaming_username?: string | null
          id?: number
          name?: string
          parent_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "children_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "parents"
            referencedColumns: ["id"]
          },
        ]
      }
      club_offers: {
        Row: {
          applicants: number | null
          benefits: string[]
          club_name: string
          description: string
          game: string
          id: number
          location: string
          logo: string | null
          position: string
          posted: string | null
          requirements: string[]
          salary_max: number
          salary_min: number
          status: Database["public"]["Enums"]["offer_status"] | null
          urgent: boolean | null
        }
        Insert: {
          applicants?: number | null
          benefits: string[]
          club_name: string
          description: string
          game: string
          id?: number
          location: string
          logo?: string | null
          position: string
          posted?: string | null
          requirements: string[]
          salary_max: number
          salary_min: number
          status?: Database["public"]["Enums"]["offer_status"] | null
          urgent?: boolean | null
        }
        Update: {
          applicants?: number | null
          benefits?: string[]
          club_name?: string
          description?: string
          game?: string
          id?: number
          location?: string
          logo?: string | null
          position?: string
          posted?: string | null
          requirements?: string[]
          salary_max?: number
          salary_min?: number
          status?: Database["public"]["Enums"]["offer_status"] | null
          urgent?: boolean | null
        }
        Relationships: []
      }
      contracts: {
        Row: {
          created_at: string | null
          duration: number
          id: number
          moderator_id: string | null
          pro_id: number
          salary: number
          status: Database["public"]["Enums"]["contract_status"] | null
          terms: string
        }
        Insert: {
          created_at?: string | null
          duration: number
          id?: number
          moderator_id?: string | null
          pro_id: number
          salary: number
          status?: Database["public"]["Enums"]["contract_status"] | null
          terms: string
        }
        Update: {
          created_at?: string | null
          duration?: number
          id?: number
          moderator_id?: string | null
          pro_id?: number
          salary?: number
          status?: Database["public"]["Enums"]["contract_status"] | null
          terms?: string
        }
        Relationships: [
          {
            foreignKeyName: "contracts_pro_id_fkey"
            columns: ["pro_id"]
            isOneToOne: false
            referencedRelation: "pros"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          created_at: string | null
          genre: string | null
          id: number
          image_url: string | null
          name: string
          platform: string | null
        }
        Insert: {
          created_at?: string | null
          genre?: string | null
          id?: number
          image_url?: string | null
          name: string
          platform?: string | null
        }
        Update: {
          created_at?: string | null
          genre?: string | null
          id?: number
          image_url?: string | null
          name?: string
          platform?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message: string
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      parents: {
        Row: {
          created_at: string | null
          id: number
          phone_number: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          phone_number?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          phone_number?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          currency: string | null
          id: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          session_id: number | null
          status: Database["public"]["Enums"]["payment_status"] | null
          subscription_id: number | null
          transaction_id: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          currency?: string | null
          id?: number
          payment_method: Database["public"]["Enums"]["payment_method"]
          session_id?: number | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          subscription_id?: number | null
          transaction_id?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          currency?: string | null
          id?: number
          payment_method?: Database["public"]["Enums"]["payment_method"]
          session_id?: number | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          subscription_id?: number | null
          transaction_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      player_stats: {
        Row: {
          achievements: string[] | null
          current_rank: string | null
          id: number
          player_id: number
          sessions_completed: number | null
          total_hours: number | null
          updated_at: string | null
        }
        Insert: {
          achievements?: string[] | null
          current_rank?: string | null
          id?: number
          player_id: number
          sessions_completed?: number | null
          total_hours?: number | null
          updated_at?: string | null
        }
        Update: {
          achievements?: string[] | null
          current_rank?: string | null
          id?: number
          player_id?: number
          sessions_completed?: number | null
          total_hours?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_stats_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          city: string | null
          created_at: string | null
          experience_level: string | null
          gaming_username: string | null
          id: number
          user_id: string
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          experience_level?: string | null
          gaming_username?: string | null
          id?: number
          user_id: string
        }
        Update: {
          city?: string | null
          created_at?: string | null
          experience_level?: string | null
          gaming_username?: string | null
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      pro_stats: {
        Row: {
          average_rating: number | null
          id: number
          pro_id: number
          total_earnings: number | null
          total_sessions: number | null
          updated_at: string | null
        }
        Insert: {
          average_rating?: number | null
          id?: number
          pro_id: number
          total_earnings?: number | null
          total_sessions?: number | null
          updated_at?: string | null
        }
        Update: {
          average_rating?: number | null
          id?: number
          pro_id?: number
          total_earnings?: number | null
          total_sessions?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pro_stats_pro_id_fkey"
            columns: ["pro_id"]
            isOneToOne: true
            referencedRelation: "pros"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      pros: {
        Row: {
          bio: string | null
          created_at: string | null
          cv_url: string | null
          gaming_username: string | null
          hourly_rate: number | null
          id: number
          is_approved: boolean | null
          specialization: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          cv_url?: string | null
          gaming_username?: string | null
          hourly_rate?: number | null
          id?: number
          is_approved?: boolean | null
          specialization?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          cv_url?: string | null
          gaming_username?: string | null
          hourly_rate?: number | null
          id?: number
          is_approved?: boolean | null
          specialization?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          id: number
          rating: number
          reviewer_id: string
          session_id: number
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: number
          rating: number
          reviewer_id: string
          session_id: number
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: number
          rating?: number
          reviewer_id?: string
          session_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string | null
          date: string
          description: string | null
          duration: number
          game_id: number | null
          id: number
          max_participants: number | null
          price: number
          title: string
          trainer_id: number | null
        }
        Insert: {
          created_at?: string | null
          date: string
          description?: string | null
          duration: number
          game_id?: number | null
          id?: number
          max_participants?: number | null
          price: number
          title: string
          trainer_id?: number | null
        }
        Update: {
          created_at?: string | null
          date?: string
          description?: string | null
          duration?: number
          game_id?: number | null
          id?: number
          max_participants?: number | null
          price?: number
          title?: string
          trainer_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_trainer_id_fkey"
            columns: ["trainer_id"]
            isOneToOne: false
            referencedRelation: "trainers"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          child_id: number | null
          created_at: string | null
          end_date: string
          id: number
          is_active: boolean | null
          player_id: number | null
          start_date: string | null
          tier: string
        }
        Insert: {
          child_id?: number | null
          created_at?: string | null
          end_date: string
          id?: number
          is_active?: boolean | null
          player_id?: number | null
          start_date?: string | null
          tier: string
        }
        Update: {
          child_id?: number | null
          created_at?: string | null
          end_date?: string
          id?: number
          is_active?: boolean | null
          player_id?: number | null
          start_date?: string | null
          tier?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_child_id_fkey"
            columns: ["child_id"]
            isOneToOne: false
            referencedRelation: "children"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      trainers: {
        Row: {
          bio: string | null
          created_at: string | null
          hourly_rate: number | null
          id: number
          is_approved: boolean | null
          specialization: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: number
          is_approved?: boolean | null
          specialization?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: number
          is_approved?: boolean | null
          specialization?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "ADMIN" | "MODERATOR" | "PLAYER" | "PRO" | "PARENTS" | "TRAINER"
      booking_status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
      contract_status: "PENDING" | "ACCEPTED" | "REJECTED"
      offer_status: "ACTIVE" | "CLOSED"
      payment_method: "CARD" | "STC_PAY" | "MADA"
      payment_status: "SUCCESS" | "FAILED" | "PENDING"
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
      app_role: ["ADMIN", "MODERATOR", "PLAYER", "PRO", "PARENTS", "TRAINER"],
      booking_status: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
      contract_status: ["PENDING", "ACCEPTED", "REJECTED"],
      offer_status: ["ACTIVE", "CLOSED"],
      payment_method: ["CARD", "STC_PAY", "MADA"],
      payment_status: ["SUCCESS", "FAILED", "PENDING"],
    },
  },
} as const

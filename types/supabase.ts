export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      ecogpt_chats: {
        Row: {
          advanced_settings: Json | null
          created_at: string | null
          id: string
          model: string | null
          owner: string | null
          system_prompt: string | null
          title: string | null
        }
        Insert: {
          advanced_settings?: Json | null
          created_at?: string | null
          id: string
          model?: string | null
          owner?: string | null
          system_prompt?: string | null
          title?: string | null
        }
        Update: {
          advanced_settings?: Json | null
          created_at?: string | null
          id?: string
          model?: string | null
          owner?: string | null
          system_prompt?: string | null
          title?: string | null
        }
      }
      ecogpt_message: {
        Row: {
          chat: string | null
          content: string | null
          created_at: string | null
          id: string
          owner: string | null
          role: string | null
        }
        Insert: {
          chat?: string | null
          content?: string | null
          created_at?: string | null
          id: string
          owner?: string | null
          role?: string | null
        }
        Update: {
          chat?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          owner?: string | null
          role?: string | null
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
      re100run_power: {
        Row: {
          created_at: string
          id: string
          voltage: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          voltage?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          voltage?: string | null
        }
      }
      re100run_run: {
        Row: {
          created_at: string
          distance: number
          duration: number
          end: string
          end_place: string[]
          id: string
          power: number
          profile_id: string
          start: string
          start_place: string[]
        }
        Insert: {
          created_at?: string
          distance: number
          duration: number
          end?: string
          end_place: string[]
          id?: string
          power: number
          profile_id: string
          start?: string
          start_place: string[]
        }
        Update: {
          created_at?: string
          distance?: number
          duration?: number
          end?: string
          end_place?: string[]
          id?: string
          power?: number
          profile_id?: string
          start?: string
          start_place?: string[]
        }
      }
      zero_likes: {
        Row: {
          created_at: string | null
          id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
        }
        Update: {
          created_at?: string | null
          id?: number
        }
      }
      zeroaction: {
        Row: {
          auth_id: string | null
          created: string | null
          id: number
          img: string[] | null
          people: number | null
          updated: string | null
          username: string | null
          zerocategory_id: number
          zeropost: string | null
        }
        Insert: {
          auth_id?: string | null
          created?: string | null
          id?: number
          img?: string[] | null
          people?: number | null
          updated?: string | null
          username?: string | null
          zerocategory_id: number
          zeropost?: string | null
        }
        Update: {
          auth_id?: string | null
          created?: string | null
          id?: number
          img?: string[] | null
          people?: number | null
          updated?: string | null
          username?: string | null
          zerocategory_id?: number
          zeropost?: string | null
        }
      }
      zerocategory: {
        Row: {
          actionTitle: string | null
          effect_co2_reduce: number | null
          effectField: string | null
          effectFieldId: number | null
          effectUnit: string | null
          id: number
        }
        Insert: {
          actionTitle?: string | null
          effect_co2_reduce?: number | null
          effectField?: string | null
          effectFieldId?: number | null
          effectUnit?: string | null
          id: number
        }
        Update: {
          actionTitle?: string | null
          effect_co2_reduce?: number | null
          effectField?: string | null
          effectFieldId?: number | null
          effectUnit?: string | null
          id?: number
        }
      }
      zeroreact: {
        Row: {
          actionId: number
          created: string | null
          id: number
          post: string | null
          updated: string | null
          userId: number | null
        }
        Insert: {
          actionId: number
          created?: string | null
          id: number
          post?: string | null
          updated?: string | null
          userId?: number | null
        }
        Update: {
          actionId?: number
          created?: string | null
          id?: number
          post?: string | null
          updated?: string | null
          userId?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      getrank_zero_periods: {
        Args: {
          starttime: string
          endtime: string
        }
        Returns: {
          z_who: string
          total_co2: number
          ranking: number
        }[]
      }
      stats_zero_periods: {
        Args: {
          starttime: string
          endtime: string
        }
        Returns: {
          total_users: number
          total_action: number
          total_co2: number
        }[]
      }
      stats_zero_personal: {
        Args: {
          session_id: string
        }
        Returns: {
          total_u_action: number
          total_u_co2: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

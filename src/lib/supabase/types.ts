export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          role: string
          username: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          username: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          username?: string
          created_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          name: string
          email: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          user_id?: string
          created_at?: string
        }
      }
      triage_data: {
        Row: {
          id: string
          patient_id: string
          symptoms: Json
          severity: number
          notes: string
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          symptoms: Json
          severity: number
          notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          symptoms?: Json
          severity?: number
          notes?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

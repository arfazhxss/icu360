import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'

type Patient = Database['public']['Tables']['patients']['Row']
type PatientInsert = Database['public']['Tables']['patients']['Insert']
type PatientUpdate = Database['public']['Tables']['patients']['Update']

export const patientOperations = {
  async getPatient(id: string) {
    const supabase = createClient()
    return await supabase
      .from('patients')
      .select('*, users(*)')
      .eq('id', id)
      .single()
  },

  async getAllPatients() {
    const supabase = createClient()
    return await supabase
      .from('patients')
      .select('*, users(*)')
  },

  async createPatient(patientData: PatientInsert) {
    const supabase = createClient()
    return await supabase
      .from('patients')
      .insert(patientData)
      .select()
      .single()
  },

  async updatePatient(id: string, patientData: PatientUpdate) {
    const supabase = createClient()
    return await supabase
      .from('patients')
      .update(patientData)
      .eq('id', id)
      .select()
      .single()
  }
}

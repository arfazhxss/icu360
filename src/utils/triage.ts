import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'

type TriageData = Database['public']['Tables']['triage_data']['Row']
type TriageInsert = Database['public']['Tables']['triage_data']['Insert']
type TriageUpdate = Database['public']['Tables']['triage_data']['Update']

export const triageOperations = {
  async getTriageData(id: string) {
    const supabase = createClient()
    return await supabase
      .from('triage_data')
      .select('*, patients(*)')
      .eq('id', id)
      .single()
  },

  async getPatientTriageData(patientId: string) {
    const supabase = createClient()
    return await supabase
      .from('triage_data')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
  },

  async createTriageData(triageData: TriageInsert) {
    const supabase = createClient()
    return await supabase
      .from('triage_data')
      .insert(triageData)
      .select()
      .single()
  },

  async updateTriageData(id: string, triageData: TriageUpdate) {
    const supabase = createClient()
    return await supabase
      .from('triage_data')
      .update(triageData)
      .eq('id', id)
      .select()
      .single()
  },

  async deleteTriageData(id: string) {
    const supabase = createClient()
    return await supabase
      .from('triage_data')
      .delete()
      .eq('id', id)
  }
}

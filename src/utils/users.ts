import { createClient } from '@/lib/supabase/server'
import { Database } from '@/lib/supabase/types'

type User = Database['public']['Tables']['users']['Row']
type UserInsert = Database['public']['Tables']['users']['Insert']
type UserUpdate = Database['public']['Tables']['users']['Update']

export const userOperations = {
  async getUser(id: string) {
    const supabase = createClient()
    return await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single()
  },

  async getUserByUsername(username: string) {
    const supabase = createClient()
    return await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single()
  },

  async createUser(userData: UserInsert) {
    const supabase = createClient()
    return await supabase
      .from('users')
      .insert(userData)
      .select()
      .single()
  },

  async updateUser(id: string, userData: UserUpdate) {
    const supabase = createClient()
    return await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select()
      .single()
  }
}

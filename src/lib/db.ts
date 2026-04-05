import { createClient } from './supabase/server'

export async function getUserProfile() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return null
  }

  const { data: profile, error: dbError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (dbError) {
    console.error('Error fetching profile:', dbError)
    // Fallback profile if DB record doesn't exist yet (handled by trigger usually)
    return {
      id: user.id,
      email: user.email,
      plan: 'starter'
    }
  }

  return profile
}

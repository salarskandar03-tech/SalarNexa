import { supabase } from './supabase'

export async function getUser(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  console.log('USER DATA:', data)
  console.log('USER ERROR:', error)

  if (error) {
    console.error(error)
    return null
  }

  return data
}

export async function getWithdrawals(userId: string) {
  const { data, error } = await supabase
    .from('withdrawals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  console.log('WITHDRAWALS DATA:', data)
  console.log('WITHDRAWALS ERROR:', error)

  if (error) {
    console.error(error)
    return []
  }

  return data
}
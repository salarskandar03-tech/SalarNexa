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
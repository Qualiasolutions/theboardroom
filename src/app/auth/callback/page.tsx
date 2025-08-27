import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>
}) {
  const { code, error } = await searchParams

  if (error) {
    redirect('/auth/login?error=' + encodeURIComponent(error))
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      redirect('/auth/login?error=' + encodeURIComponent(error.message))
    }
  }

  // Successful authentication, redirect to dashboard
  redirect('/dashboard')
}
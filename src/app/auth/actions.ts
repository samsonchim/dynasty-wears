'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../../../utils/supabase/server'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const cookieStore = cookies()
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const cookieStore = cookies()
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        username: formData.get('username') as string,
      }
    }
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/signup?message=Error creating account: ' + error.message)
  }

  // Check if email confirmation is required
  if (authData.user && !authData.session) {
    // Email confirmation required
    redirect('/signup?message=Please check your email to confirm your account')
  } else if (authData.user && authData.session) {
    // User is automatically logged in (email confirmation disabled)
    revalidatePath('/', 'layout')
    redirect('/dashboard')
  } else {
    // Fallback - redirect to login
    redirect('/login?message=Account created successfully. Please login.')
  }
}

export async function signout() {
  const cookieStore = cookies()
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/login?message=Error signing out')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

'use server'

import { signIn, signOut } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function login(provider: string) {
  await signIn(provider, { redirectTo: '/dashboard' })
  revalidatePath('/')
}

export async function logout() {
  await signOut()
  revalidatePath('/')
}

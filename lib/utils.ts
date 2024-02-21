import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { auth } from './auth'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Remove this outdated function
export const getUserId = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    throw new Error('You must be signed in to use this feature')
  }

  return userId
}

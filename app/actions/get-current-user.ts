'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export default async function getCurrentUser() {
  try {
    const session = await auth()

    if (!session?.user) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
    })

    if (!currentUser) {
      return null
    }

    return currentUser
  } catch (error) {
    return null
  }
}

'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function getUsers() {
  const session = await auth()
  const userId = session?.user?.id

  try {
    const data = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      select: {
        name: true,
        username: true,
        image: true,
      },
    })

    return data
  } catch (error) {
    throw new Error('Failed to get users')
  }
}

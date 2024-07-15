'use server'

import prisma from '@/lib/prisma'

export async function fetchProfile(username: string) {
  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        saved: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    return data
  } catch (error) {
    throw new Error('Failed to fetch profile')
  }
}

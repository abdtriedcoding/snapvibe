'use server'

import prisma from '@/lib/prisma'

// TODO: we can refactor this query using count function of prisma query
export async function fetchSavedPostsByUsername(username: string) {
  try {
    const data = await prisma.savedPost.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        post: {
          include: {
            comments: {
              include: {
                user: true,
              },
            },
            likes: true,
            savedBy: true,
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return data
  } catch (error) {
    throw new Error('Failed to get saved posts')
  }
}

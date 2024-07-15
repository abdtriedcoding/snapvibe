'use server'

import prisma from '@/lib/prisma'

export async function fetchPostById(id: string) {
  try {
    const data = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: true,
        savedBy: true,
        user: true,
      },
    })

    return data
  } catch (error) {
    throw new Error('Failed to get post')
  }
}

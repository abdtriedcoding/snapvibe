'use server'

import prisma from '@/lib/prisma'

export async function getPosts(pageNumber: number) {
  try {
    const data = await prisma.post.findMany({
      include: {
        // TODO: need to check is this entire comments table even required
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: true,
        // TODO: need to check is this entire savedBy table even required
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: (pageNumber - 1) * 5,
      take: 5,
    })

    return data
  } catch (error) {
    throw new Error('Failed to get posts')
  }
}

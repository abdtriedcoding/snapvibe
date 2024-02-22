import prisma from '@/lib/prisma'

export async function fetchPostsByUsername(username: string, postId?: string) {
  try {
    const data = await prisma.post.findMany({
      where: {
        user: {
          username,
        },
        NOT: {
          id: postId,
        },
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
      orderBy: {
        createdAt: 'desc',
      },
    })

    return data
  } catch (error) {
    throw new Error('Failed to get posts')
  }
}

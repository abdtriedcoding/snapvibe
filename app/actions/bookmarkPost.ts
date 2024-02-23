'use server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function bookmarkPost(postId: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Promise.reject({ error: 'User not authenticated' })
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw new Error('Post not found.')
  }

  const bookmark = await prisma.savedPost.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  })

  if (bookmark) {
    try {
      await prisma.savedPost.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      })
    } catch (error) {
      throw new Error('Failed to Unbookmark post')
    }
    revalidatePath('/')
  } else {
    try {
      await prisma.savedPost.create({
        data: {
          postId,
          userId,
        },
      })
    } catch (error) {
      throw new Error('Failed to bookmark post')
    }
    revalidatePath('/')
  }
}

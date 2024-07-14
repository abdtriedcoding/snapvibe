'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function likePost(postId: string) {
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
    throw new Error('Post not found')
  }

  const like = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  })

  if (like) {
    try {
      await prisma.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      })
    } catch (error) {
      throw new Error('Failed to unlike post')
    }
    revalidatePath('/dashboard')
  } else {
    try {
      await prisma.like.create({
        data: {
          postId,
          userId,
        },
      })
    } catch (error) {
      throw new Error('Failed to like post')
    }
    revalidatePath('/dashboard')
  }
}

'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function createComment(postId: string, body: string) {
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

  try {
    await prisma.comment.create({
      data: {
        body,
        postId,
        userId,
      },
    })
  } catch (error) {
    throw new Error('Failed to create comment')
  }
  revalidatePath('/dashboard')
}

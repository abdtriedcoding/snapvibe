'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function deletePost(id: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Promise.reject({ error: 'User not authenticated' })
  }

  const post = await prisma.post.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!post) {
    throw new Error('Post not found')
  }

  try {
    await prisma.post.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    return Promise.reject({ error: 'Failed to delete post' })
  }
  revalidatePath('/dashboard')
}

'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

export async function deleteComment(id: string) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Promise.reject({ error: 'User not authenticated' })
  }

  const comment = await prisma.comment.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!comment) {
    throw new Error('Comment not found')
  }

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    return Promise.reject({ error: 'Failed to create post' })
  }
  revalidatePath('/dashboard')
}

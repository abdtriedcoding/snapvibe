'use server'

import { type z } from 'zod'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { formSchema } from '@/lib/schema'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function updatePost(
  id: string,
  values: z.infer<typeof formSchema>
) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Promise.reject({ error: 'User not authenticated' })
  }

  const validatedFields = formSchema.safeParse(values)

  if (!validatedFields.success) {
    return Promise.reject({ error: 'Missing Fields. Failed to update post' })
  }

  const { fileUrl, caption } = validatedFields.data

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
    await prisma.post.update({
      where: {
        id,
      },
      data: {
        fileUrl,
        caption,
      },
    })
  } catch (error) {
    return Promise.reject({ error: 'Failed to update post' })
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

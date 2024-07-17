'use server'

import { type z } from 'zod'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { formSchema } from '@/lib/schema'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function createPost(values: z.infer<typeof formSchema>) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Promise.reject({ error: 'User not authenticated' })
  }

  const validatedFields = formSchema.safeParse(values)

  if (!validatedFields.success) {
    return Promise.reject({ error: 'Missing Fields. Failed to Create Post.' })
  }

  const { fileUrl, caption } = validatedFields.data

  try {
    await prisma.post.create({
      data: {
        caption,
        fileUrl,
        userId,
      },
    })
  } catch (error) {
    return Promise.reject({ error: 'Failed to create post' })
  }

  revalidatePath('/')
  redirect('/')
}

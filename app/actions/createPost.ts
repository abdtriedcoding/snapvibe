'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

const formSchema = z.object({
  fileUrl: z.string().url(),
  caption: z.string().optional(),
})

export async function createPost(values: z.infer<typeof formSchema>) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return

  const validatedFields = formSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      message: 'Missing Fields. Failed to Create Post.',
    }
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
    return {
      error: 'Failed to create post',
    }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

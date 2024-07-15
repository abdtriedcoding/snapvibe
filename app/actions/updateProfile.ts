'use server'

import { type z } from 'zod'
import prisma from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { UserSchema } from '@/lib/schema'
import { revalidatePath } from 'next/cache'

export async function updateProfile(values: z.infer<typeof UserSchema>) {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) {
    return Promise.reject({ error: 'User not authenticated' })
  }

  const validatedFields = UserSchema.safeParse(values)

  if (!validatedFields.success) {
    return Promise.reject({ error: 'Missing Fields. Failed to Create Post.' })
  }

  const { bio, gender, image, name, username, website } = validatedFields.data

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        name,
        image,
        bio,
        gender,
        website,
      },
    })
  } catch (error) {
    return Promise.reject({ error: 'Failed to update profile' })
  }
  revalidatePath('/dashboard')
}

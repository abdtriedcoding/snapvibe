import { z } from 'zod'

export const formSchema = z.object({
  fileUrl: z
    .string({
      required_error:
        'The URL provided is invalid. Please provide a valid image URL.',
    })
    .url(),
  caption: z.string().optional(),
})

export const CommentSchema = z.object({
  body: z.string().trim().min(1),
})

export const UserSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().max(150).optional(),
  website: z.string().optional(),
  gender: z.string().optional(),
})

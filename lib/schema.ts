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

// TODO: remove all above below schemas
export const PostSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
})

export const CreatePost = PostSchema.omit({ id: true })
export const UpdatePost = PostSchema

// export const CreateComment = CommentSchema.omit({ id: true })

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  name: z.string().optional(),
  image: z.string().optional(),
  bio: z.string().max(150).optional(),
  website: z.string().optional(),
  gender: z.string().optional(),
})

export const UpdateUser = UserSchema

import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  fileUrl: z.string().url(),
  caption: z.string().optional(),
});

export const CreatePost = PostSchema.omit({ id: true });

export const CommentSchema = z.object({
  id: z.string(),
  body: z.string(),
});

export const CreateComment = CommentSchema.omit({ id: true });

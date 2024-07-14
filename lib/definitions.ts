import type { Comment, Like, Post, SavedPost, User } from '@prisma/client'

export type CommentWithUser = Comment & { user: User }

export type PostWithExtras = Post & {
  comments: CommentWithUser[]
  likes: Like[]
  savedBy: SavedPost[]
  user: User
}

export type UserProfile = User & {
  posts: Post[]
  saved: SavedPost[]
}

export type PostOptionProps = {
  postId: string
  postUserId: string
  userId: string | undefined
}

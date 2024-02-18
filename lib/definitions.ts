import type { Comment, Like, Post, SavedPost, User } from "@prisma/client";

export type CommentWithUser = Comment & { user: User };

export type PostWithExtras = Post & {
  comments: CommentWithUser[];
  likes: Like[];
  savedBy: SavedPost[];
  user: User;
};
